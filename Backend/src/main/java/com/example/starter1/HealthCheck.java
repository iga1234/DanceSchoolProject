package com.example.starter1;

import io.vertx.core.Vertx;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.healthchecks.HealthCheckHandler;
import io.vertx.ext.healthchecks.Status;
import io.vertx.jdbcclient.JDBCPool;
import io.vertx.sqlclient.Row;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HealthCheck {

  public static final Logger LOGGER = LoggerFactory.getLogger("HealthCheckLogger");

  private HealthCheckHandler healthCheckHandler;

  public HealthCheckHandler getHealthCheckHandler()
  {
    return healthCheckHandler;
  }

  public HealthCheck(Vertx vertx) {

    LOGGER.info("Hello from HealthCheck");
    healthCheckHandler = HealthCheckHandler.create(vertx);

    healthCheckHandler.register("my-logging", promise -> {
      LOGGER.info("logging promise");
      JDBCPool pool = DataBaseVerticle.getPool();
      JsonObject response = new JsonObject();
      JsonArray dances = new JsonArray();
      if (pool != null) {
        LOGGER.info("pool available");
        pool
          .query("SELECT * FROM dance")
          .execute()
          .onFailure(e -> {
            LOGGER.info("db query failure, e: " + e.toString());
            promise.complete(Status.KO());
          })
          .onSuccess(rows -> {
            LOGGER.info("db query success");
            for (Row row : rows) {
              System.out.println(row.getString("type_of_dance"));
              dances.add(row.getString("type_of_dance"));
            }
            response.put("dances", dances);
            LOGGER.info("response: " + response);
            promise.complete(Status.OK(response));
          });

      }
      LOGGER.info("end...");
    });
  }
}
