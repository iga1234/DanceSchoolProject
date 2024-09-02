package com.example.starter1;

import io.vertx.core.Handler;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.healthchecks.Status;
import io.vertx.ext.web.RoutingContext;
import io.vertx.jdbcclient.JDBCPool;
import io.vertx.sqlclient.Row;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RegisterHandler implements Handler<RoutingContext> {

  public static final Logger LOGGER = LoggerFactory.getLogger("RegisterHandlerLogger");

  public RegisterHandler() {
  }

  @Override
  public void handle(RoutingContext routingContext) {
    LOGGER.info("Register");
    JDBCPool pool = DataBaseVerticle.getPool();
    JsonObject body = routingContext.body().asJsonObject();
    String usernameStr = body.getString("username");
    String emailStr = body.getString("email");
    String nameStr = body.getString("name");
    String surnameStr = body.getString("surname");
    String phoneStr = body.getString("phone");
    String passwordStr = body.getString("password");

    LOGGER.info("username: " + usernameStr);
    LOGGER.info("password: " + passwordStr);
    if (pool != null) {
      LOGGER.info("pool available");
      String queryStr = "SELECT username FROM users where username= \'" + usernameStr + "\'";
      LOGGER.info("queryStr: " + queryStr);
      pool
        .query(queryStr)
        .execute()
        .onFailure(e -> {
          LOGGER.info("db query failure, e: " + e.toString());
          routingContext.response().setStatusCode(400);
          routingContext.response().end();
        })
        .onSuccess(rows1 -> {
            LOGGER.info("db query success");
            if (rows1.size() == 0) {
              String queryStr2 = "INSERT INTO personal_data (namee, surname, phone_num, email) VALUES ( \'" + nameStr + "\', \'" + surnameStr + "\', \'" + phoneStr + "\', \'" + emailStr + "\');";
              String queryStr3 = "INSERT INTO users (username, user_password, ID_PERSONAL_DATA, ID_DANCE_CARD) VALUES ( \'" + usernameStr + "\', \'" + passwordStr + "\', (select max(id_personal_data) from personal_data), null);";
              String queryStr4 = "INSERT INTO user_and_role(id_role, username) VALUES (2, \'" + usernameStr + "\')";
              LOGGER.info(queryStr2 + queryStr3 + queryStr4);
              pool
                .query(queryStr2 + queryStr3 + queryStr4)
                .execute()
                .onFailure(e -> {
                  LOGGER.info("db query failure, e: " + e.toString());
                  routingContext.response().setStatusCode(400);
                  routingContext.response().end();
                })
                .onSuccess(rows2 -> {
                  LOGGER.info("db query success2");
                  routingContext.response().setStatusCode(200);
                  routingContext.response().end();
                });
            } else {
              LOGGER.info("user already exist");
              routingContext.response().setStatusCode(400);
              routingContext.response().end();
            }
          });
    }
  }
}
