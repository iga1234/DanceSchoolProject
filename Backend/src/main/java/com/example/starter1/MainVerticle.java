package com.example.starter1;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.http.HttpMethod;

import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.BodyHandler;
import io.vertx.ext.web.handler.CorsHandler;
import org.apache.log4j.BasicConfigurator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MainVerticle extends AbstractVerticle {

  public static final Logger LOGGER = LoggerFactory.getLogger("MainLogger");

  @Override
  public void start() throws Exception {

    // TODO(iga) setup configuration file
    BasicConfigurator.configure();

    // Spawn other verticles
    vertx.deployVerticle("com.example.starter1.DataBaseVerticle");

    LOGGER.info("Hello from MainVerticle");

    // Setting up routing
    Router router = Router.router(vertx);

    router.route().handler(CorsHandler.create("*")
      .allowedMethod(HttpMethod.GET)
      .allowedMethod(HttpMethod.POST)
      .allowedMethod(HttpMethod.PUT)
      .allowedMethod(HttpMethod.HEAD)
      .allowedMethod(HttpMethod.DELETE)
      .allowedHeader("Access-Control-Allow-Method")
      .allowedHeader("Access-Control-Allow-Origin")
      .allowedHeader("Access-Control-Allow-Credentials")
      .allowedHeader("Content-Type"));

    router.route().handler(BodyHandler.create());

    HealthCheck healthCheck = new HealthCheck(vertx);
    router.get("/health").handler(healthCheck.getHealthCheckHandler());

    DanceClassHandler danceClassHandler = new DanceClassHandler();
    router.post("/schedule").handler(danceClassHandler);

    MyClassHandler myClassHandler = new MyClassHandler();
    router.post("/myclasses").handler(myClassHandler);

    LoginHandler loginHandler = new LoginHandler();
    router.post("/login").handler(loginHandler);
    router.post("/logout").handler(loginHandler);

    RegisterHandler registerHandler = new RegisterHandler();
    router.post("/register").handler(registerHandler);

    AdminClassHandler adminClassHandler = new AdminClassHandler();
    router.put("/adminclass").handler(adminClassHandler);
    router.post("/adminclass").handler(adminClassHandler);
    router.delete("/adminclass").handler(adminClassHandler);

    InstructorHandler instructorHandler = new InstructorHandler();
    router.post("/instructors").handler(instructorHandler);

    DanceHandler danceHandler = new DanceHandler();
    router.post("/dances").handler(danceHandler);

    SignUpHandler signUpHandler = new SignUpHandler();
    router.post("/signup").handler(signUpHandler);

    AttendanceHandler attendanceHandler = new AttendanceHandler();
    router.post("/attendance").handler(attendanceHandler);

    SignOffHandler signOffHandler = new SignOffHandler();
    router.delete("/signoff").handler(signOffHandler);


    vertx.createHttpServer()
      .requestHandler(router)
      .listen(8888)
      .onSuccess(server ->
        System.out.println(
          "HTTP server started on port " + server.actualPort()
        )
      );
  }
}

