package com.example.starter1;

import io.vertx.core.Handler;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.RoutingContext;
import io.vertx.jdbcclient.JDBCPool;
import io.vertx.sqlclient.Row;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MyClassHandler implements Handler<RoutingContext> {

  public static final Logger LOGGER = LoggerFactory.getLogger("MyClassHandlerLogger");

  public MyClassHandler() {
  }

  @Override
  public void handle(RoutingContext routingContext) {
    LOGGER.info("My Classes");
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
      String queryStr = "SELECT * FROM USERS_CLASSES WHERE username= \'" + usernameStr + "\'";
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
          JsonArray classArray = new JsonArray();
          for (Row row : rows) {
            JsonObject danceClass = new JsonObject();
            var idDanceClass = row.getInteger("id_class");
            var typeOfDance = row.getString("type_of_dance");
            var classDate = row.getLocalDate("class_date").toString();
            var startTime = row.getLocalTime("start_time").toString();
            var endTime = row.getLocalTime("end_time").toString();
            var danceLevel = row.getString("dance_level");
            var namePersonalData = row.getString("namee");
            var surnamePersonalData = row.getString("surname");
            var idTypeOfClasses = row.getInteger("id_type_of_classes");
            danceClass.put("id_class", idDanceClass);
            danceClass.put("type_of_dance", typeOfDance);
            danceClass.put("class_date", classDate);
            danceClass.put("start_time", startTime);
            danceClass.put("end_time", endTime);
            danceClass.put("dance_level", danceLevel);
            danceClass.put("name", namePersonalData);
            danceClass.put("surname", surnamePersonalData);
            danceClass.put("id_type_of_classes", idTypeOfClasses);
            classArray.add(danceClass);
          }
          response.put("classes", classArray);
          routingContext.response().putHeader("content-type", "application/json");
          routingContext.response().end(response.toString());
        });
    }
  }
}
