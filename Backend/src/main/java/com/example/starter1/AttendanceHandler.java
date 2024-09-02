package com.example.starter1;

import io.vertx.core.Handler;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.RoutingContext;
import io.vertx.jdbcclient.JDBCPool;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class AttendanceHandler implements Handler<RoutingContext> {
  public static final Logger LOGGER = LoggerFactory.getLogger("AttendanceHandlerLogger");

  public AttendanceHandler() {
  }

  @Override
  public void handle(RoutingContext routingContext) {
    LOGGER.info("Attendance");
    JDBCPool pool = DataBaseVerticle.getPool();
    JsonObject body = routingContext.body().asJsonObject();
    String usernameStr = body.getString("username");
    String sessionKeyStr = body.getString("sessionKey");
    String idClassStr = body.getString("idClass");
    var sessionKeys = LoginHandler.getSessionKeys();
    if (!sessionKeys.containsKey(usernameStr) || !sessionKeys.get(usernameStr).equals(sessionKeyStr))
    {
      routingContext.response().setStatusCode(404);
      routingContext.response().end();
      return;
    }
    if (pool != null) {
      LOGGER.info("pool available");
      String queryStr = "SELECT * FROM SIGN_UP WHERE ID_CLASS=\'" + idClassStr + "\' AND USERNAME=\'" + usernameStr + "\'" ;
      JsonObject attendance = new JsonObject();
      pool
        .query(queryStr)
        .execute()
        .onFailure(e -> {
          LOGGER.info("db query failure, e: " + e.toString());
          routingContext.response().putHeader("content-type", "application/json");
          routingContext.response().setStatusCode(400);
          routingContext.response().end();
        })
        .onSuccess(rows -> {
          LOGGER.info("db query success");
          if (rows.size() == 0) {
            LOGGER.info("db query success2");
            attendance.put("attendance", false);
          }
          else {
            LOGGER.info("user already is sign up at this class");
            attendance.put("attendance", true);
          }
          routingContext.response().setStatusCode(200);
          routingContext.response().putHeader("content-type", "application/json");
          routingContext.response().end(attendance.toString());

        });
    }
  }
}
