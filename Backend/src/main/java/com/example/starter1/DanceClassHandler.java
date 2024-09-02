package com.example.starter1;

import io.vertx.core.Handler;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.RoutingContext;
import io.vertx.jdbcclient.JDBCPool;
import io.vertx.sqlclient.Row;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class DanceClassHandler implements Handler<RoutingContext> {

  public static final Logger LOGGER = LoggerFactory.getLogger("DanceClassHandlerLogger");

  public DanceClassHandler() {
  }

  @Override
  public void handle(RoutingContext routingContext){
    JsonObject body = routingContext.body().asJsonObject();
    String idClassStr = body.getString("idClass");
    if(idClassStr != null) {
      danceClassHandle(routingContext, idClassStr);
    }
    else{
      allClassesHandle(routingContext);
    }
  }

  public void allClassesHandle(RoutingContext routingContext) {
    LOGGER.info("Dances");
    JDBCPool pool = DataBaseVerticle.getPool();
    JsonObject response = new JsonObject();
    if (pool != null) {
      LOGGER.info("pool available");
      pool
        .query("SELECT * FROM ALL_CLASSES;")
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
            var idDance = row.getInteger("id_dance");
            var typeOfDance = row.getString("type_of_dance");
            var classDate = row.getLocalDate("class_date").toString();
            var startTime = row.getLocalTime("start_time").toString();
            var endTime = row.getLocalTime("end_time").toString();
            var danceLevel = row.getString("dance_level");
            var price = row.getDouble("price");
            var namePersonalData = row.getString("namee");
            var surnamePersonalData = row.getString("surname");
            var idTypeOfClasses = row.getInteger("id_type_of_classes");
            danceClass.put("id_class", idDanceClass);
            danceClass.put("id_dance", idDance);
            danceClass.put("type_of_dance", typeOfDance);
            danceClass.put("class_date", classDate);
            danceClass.put("start_time", startTime);
            danceClass.put("end_time", endTime);
            danceClass.put("dance_level", danceLevel);
            danceClass.put("name", namePersonalData);
            danceClass.put("surname", surnamePersonalData);
            danceClass.put("id_type_of_classes", idTypeOfClasses);
            if(price != null) {
              danceClass.put("price", price);
            }
            else{
              danceClass.put("price", 0.0);
            }
            classArray.add(danceClass);
          }
          response.put("classes", classArray);
          routingContext.response().putHeader("content-type", "application/json");
          routingContext.response().end(response.toString());
        });
    }
  }
  public void danceClassHandle(RoutingContext routingContext, String idClassStr) {
    LOGGER.info("Dance class");
    JDBCPool pool = DataBaseVerticle.getPool();
    JsonObject response = new JsonObject();

    if (pool != null) {
      LOGGER.info("pool available");
      pool
        .query("SELECT * FROM ALL_CLASSES WHERE id_class= \'" + idClassStr + "\'")
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
            var idDance = row.getInteger("id_dance");
            var idInstructor = row.getInteger("id_instructor");
            var typeOfDance = row.getString("type_of_dance");
            var classDate = row.getLocalDate("class_date").toString();
            var startTime = row.getLocalTime("start_time").toString();
            var endTime = row.getLocalTime("end_time").toString();
            var danceLevel = row.getString("dance_level");
            var price = row.getDouble("price");
            var namePersonalData = row.getString("namee");
            var surnamePersonalData = row.getString("surname");
            var idTypeOfClasses = row.getInteger("id_type_of_classes");
            danceClass.put("id_class", idDanceClass);
            danceClass.put("id_dance", idDance);
            danceClass.put("id_instructor", idInstructor);
            danceClass.put("type_of_dance", typeOfDance);
            danceClass.put("class_date", classDate);
            danceClass.put("start_time", startTime);
            danceClass.put("end_time", endTime);
            danceClass.put("dance_level", danceLevel);
            danceClass.put("name", namePersonalData);
            danceClass.put("surname", surnamePersonalData);
            danceClass.put("id_type_of_classes", idTypeOfClasses);
            if(price != null) {
              danceClass.put("price", price);
            }
            else{
              danceClass.put("price", 0.0);
            }
            classArray.add(danceClass);
          }
          response.put("classes", classArray);
          routingContext.response().putHeader("content-type", "application/json");
          routingContext.response().end(response.toString());
        });
    }
  }
}
