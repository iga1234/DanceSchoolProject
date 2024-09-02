package com.example.starter1;

import io.vertx.core.Handler;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.RoutingContext;
import io.vertx.jdbcclient.JDBCPool;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SignOffHandler implements Handler<RoutingContext> {
  public static final Logger LOGGER = LoggerFactory.getLogger("SignOffLogger");

  public SignOffHandler() {
  }

  @Override
  public void handle(RoutingContext routingContext) {
    LOGGER.info("Sign off");
    JDBCPool pool = DataBaseVerticle.getPool();
    JsonObject body = routingContext.body().asJsonObject();
    String sessionKeyStr = body.getString("sessionKey");
    String idClassStr = body.getString("idClass");
    String usernameStr = body.getString("username");
    var sessionKeys = LoginHandler.getSessionKeys();
    if (!sessionKeys.containsKey(usernameStr) || !sessionKeys.get(usernameStr).equals(sessionKeyStr))
    {
      routingContext.response().setStatusCode(404);
      routingContext.response().end();
      return;
    }
    if (pool != null) {
      LOGGER.info("pool available");
      String queryStr = "DELETE FROM SIGN_UP WHERE ID_CLASS=\'" + idClassStr + "\' AND USERNAME=\'" + usernameStr + "\'" ;
      LOGGER.info("queryStr: " + queryStr);
      pool
        .query(queryStr)
        .execute()
        .onFailure(e -> {
          LOGGER.info("db query failure, e: " + e.toString());
          routingContext.response().setStatusCode(400);
          routingContext.response().end();
        })
        .onSuccess(rows -> {
          LOGGER.info("db query success");
          routingContext.response().setStatusCode(200);
          routingContext.response().end();
        });
    }
  }
}
