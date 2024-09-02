package com.example.starter1;

import io.vertx.core.Handler;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.RoutingContext;
import io.vertx.jdbcclient.JDBCPool;
import io.vertx.sqlclient.Row;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class AdminClassHandler implements Handler<RoutingContext> {

  public static final Logger LOGGER = LoggerFactory.getLogger("AdminClassHandlerLogger");

  public AdminClassHandler() {
  }

  public void handleDeleteClass(RoutingContext routingContext) {
    LOGGER.info("Delete class");
    JDBCPool pool = DataBaseVerticle.getPool();
    JsonObject body = routingContext.body().asJsonObject();
    String idClassStr = body.getString("idClass");

    if (pool != null) {
      LOGGER.info("pool available");
      String queryStr = "DELETE FROM CLASS WHERE ID_CLASS = \'" + idClassStr + "\'";
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

  public void handleUpdateClass(RoutingContext routingContext) {
    LOGGER.info("Update class");
    JDBCPool pool = DataBaseVerticle.getPool();
    JsonObject body = routingContext.body().asJsonObject();
    String idClassStr = body.getString("idClass");
    String classDateStr = body.getString("classDate");
    String startTime = body.getString("startTime");
    String endTimeStr = body.getString("endTime");
    String danceLevelStr = body.getString("danceLevel");
    String priceStr = body.getString("price");
    String idDanceStr = body.getString("idDance");
    String idInstructorStr = body.getString("idInstructor");

    String classDateColumn = " CLASS_DATE = \'" + classDateStr + "\'";
    String startTimeColumn = ", START_TIME = \'" + startTime + "\'";
    String endTimeColumn = ", END_TIME = \'" + endTimeStr + "\'";
    String danceLevelColumn = ", DANCE_LEVEL = \'" + danceLevelStr + "\'";
    String priceColumn = ", PRICE = \'" + priceStr + "\'";
    String idDanceColumn = ", ID_DANCE = \'" + idDanceStr + "\'";
    String idInstructorColumn = ", ID_INSTRUCTOR = \'" + idInstructorStr + "\'";

    if (pool != null) {
      LOGGER.info("pool available");
      String queryStr = "UPDATE CLASS SET" + classDateColumn + startTimeColumn + endTimeColumn + danceLevelColumn + priceColumn + idDanceColumn + idInstructorColumn + " WHERE id_class = \'" + idClassStr + "\'";
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
        LOGGER.info("db query success2");
        routingContext.response().setStatusCode(200);
        routingContext.response().end();
      });
    }
  }

  public void handleCreateClass(RoutingContext routingContext) {
    LOGGER.info("Create class");
    JDBCPool pool = DataBaseVerticle.getPool();
    JsonObject body = routingContext.body().asJsonObject();
    String classDateStr = body.getString("classDate");
    String startTime = body.getString("startTime");
    String endTimeStr = body.getString("endTime");
    String danceLevelStr = body.getString("danceLevel");
    String priceStr = body.getString("price");
    String idDanceStr = body.getString("idDance");
    String idInstructorStr = body.getString("idInstructor");

    if (pool != null) {
      LOGGER.info("pool available");
      String queryStr = "INSERT INTO CLASS(CLASS_DATE, START_TIME, END_TIME, DANCE_LEVEL, PRICE, ID_DANCE, ID_INSTRUCTOR) VALUES ( \'"
        + classDateStr + "\', \'" + startTime + "\', \'" + endTimeStr + "\', \'" + danceLevelStr + "\', \'" + priceStr + "\', \'"
        + idDanceStr + "\', \'" + idInstructorStr + "\');";
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
          LOGGER.info("db query success2");
          routingContext.response().setStatusCode(200);
          routingContext.response().end();
        });
    }
  }

  @Override
  public void handle(RoutingContext routingContext) {
    LOGGER.info("AdminClass");
    JDBCPool pool = DataBaseVerticle.getPool();
    JsonObject body = routingContext.body().asJsonObject();
    String usernameStr = body.getString("username");
    String sessionKeyStr = body.getString("sessionKey");
    var sessionKeys = LoginHandler.getSessionKeys();
    JsonObject response = new JsonObject();
    if (pool != null) {
      LOGGER.info("pool available");
      if (sessionKeys.containsKey(usernameStr) && sessionKeys.get(usernameStr).equals(sessionKeyStr)) {
        String queryStr = "SELECT id_role FROM USER_AND_ROLE WHERE username = \'" + usernameStr + "\'";
        pool
          .query(queryStr)
          .execute()
          .onFailure(e -> {
            LOGGER.info("db query failure, e: " + e.toString());
            routingContext.response().putHeader("content-type", "application/json");
            routingContext.response().setStatusCode(400);
            routingContext.response().end(response.toString());
          })
          .onSuccess(rows -> {
            LOGGER.info("db query success");
            if (rows.size() != 0) {
              for (Row row : rows) {
                int idRole = row.getInteger("id_role");
                if (idRole == 1) {
                  LOGGER.info("User is an admin");
                  switch (routingContext.request().method().name()) {
                    case "PUT": {
                      handleUpdateClass(routingContext);
                      break;
                    }
                    case "POST": {
                      handleCreateClass(routingContext);
                      break;
                    }
                    case "DELETE": {
                      handleDeleteClass(routingContext);
                      break;
                    }
                  }
                }
              }
            }
          });
      } else {
        LOGGER.info("User is not logged in");
        routingContext.response().setStatusCode(400);
      }

    }

  }
}


