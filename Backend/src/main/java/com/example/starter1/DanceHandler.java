package com.example.starter1;

import io.vertx.core.Handler;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.RoutingContext;
import io.vertx.jdbcclient.JDBCPool;
import io.vertx.sqlclient.Row;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DanceHandler implements Handler<RoutingContext>{
  public static final Logger LOGGER = LoggerFactory.getLogger("DanceHandlerLogger");

  public DanceHandler() {
  }

  @Override
  public void handle(RoutingContext routingContext) {
    LOGGER.info("Dances");
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
      String queryStr = "SELECT * FROM WHICH_TYPE";
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
          JsonArray danceArray = new JsonArray();
          for (Row row : rows) {
            JsonObject dance = new JsonObject();
            var idDance = row.getInteger("id_dance");
            var typeOfDance = row.getString("type_of_dance");
            var typeOfClass = row.getString("name_type_of_classes");
            LOGGER.info(typeOfDance, typeOfClass, idDance);
            dance.put("idDance", idDance);
            dance.put("typeOfDance", typeOfDance);
            dance.put("typeOfClass", typeOfClass);
            danceArray.add(dance);
          }
          response.put("dances", danceArray);
          LOGGER.info(danceArray.toString());
          routingContext.response().putHeader("content-type", "application/json");
          routingContext.response().end(response.toString());
        });
    }
  }
}
