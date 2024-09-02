package com.example.starter1;

import io.vertx.core.Handler;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.RoutingContext;
import io.vertx.jdbcclient.JDBCPool;
import io.vertx.sqlclient.Row;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class InstructorHandler implements Handler<RoutingContext>{
  public static final Logger LOGGER = LoggerFactory.getLogger("InstructorHandlerLogger");

  public InstructorHandler() {
  }

  @Override
  public void handle(RoutingContext routingContext) {
    LOGGER.info("Instructors");
    JDBCPool pool = DataBaseVerticle.getPool();
    JsonObject body = routingContext.body().asJsonObject();
    String usernameStr = body.getString("username");
    String sessionKeyStr = body.getString("sessionKey");
    var sessionKeys = LoginHandler.getSessionKeys();
    if (!sessionKeys.containsKey(usernameStr) || !sessionKeys.get(usernameStr).equals(sessionKeyStr))
    {
      routingContext.response().setStatusCode(404);
      routingContext.response().end();
      return;
    }
    JsonObject response = new JsonObject();
    if (pool != null) {
      LOGGER.info("pool available");
      String queryStr = "SELECT * FROM DATA_INSTRUCTOR";
      pool
        .query(queryStr)
        .execute()
        .onFailure(e -> {
          LOGGER.info("db query failure, e: " + e.toString());
          routingContext.response().putHeader("content-type", "application/json");
          routingContext.response().end(response.toString());
        })
        .onSuccess(rows -> {
          LOGGER.info("db query success");
          JsonArray instructorArray = new JsonArray();
          for (Row row : rows) {
            JsonObject instructor = new JsonObject();
            var idInstructor = row.getInteger("id_instructor");
            var namePersonalData = row.getString("namee");
            var surnamePersonalData = row.getString("surname");
            LOGGER.info(surnamePersonalData, namePersonalData, idInstructor);
            instructor.put("idInstructor", idInstructor);
            instructor.put("name", namePersonalData);
            instructor.put("surname", surnamePersonalData);
            instructorArray.add(instructor);
          }
          response.put("instructors", instructorArray);
          LOGGER.info(instructorArray.toString());
          routingContext.response().putHeader("content-type", "application/json");
          routingContext.response().end(response.toString());
        });
    }
  }
}

