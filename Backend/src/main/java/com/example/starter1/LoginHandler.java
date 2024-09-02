package com.example.starter1;

import io.vertx.core.Handler;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.RoutingContext;
import io.vertx.jdbcclient.JDBCPool;
import io.vertx.sqlclient.Row;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.URI;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class LoginHandler implements Handler<RoutingContext> {

  public static final Logger LOGGER = LoggerFactory.getLogger("LoginHandlerLogger");

  public static String getToken() {
    return  String.valueOf(System.currentTimeMillis()).substring(8, 13) + UUID.randomUUID().toString().substring(1,10);
  }

  private static String bytesToHex(byte[] hash) {
    StringBuilder hexString = new StringBuilder(2 * hash.length);
    for (int i = 0; i < hash.length; i++) {
      String hex = Integer.toHexString(0xff & hash[i]);
      if(hex.length() == 1) {
        hexString.append('0');
      }
      hexString.append(hex);
    }
    return hexString.toString();
  }

  private static String generateSessionKey() {
    try {
      String token = getToken();
      MessageDigest digest = MessageDigest.getInstance("SHA-256");
      byte[] encodedhash = digest.digest(token.getBytes(StandardCharsets.UTF_8));
      return bytesToHex(encodedhash);
    }
    catch (NoSuchAlgorithmException ex)
    {
      LOGGER.info(ex.toString());
    }
    return "";
  }

  private static HashMap<String, String> SessionKeys = new HashMap<>();

  public static HashMap<String, String> getSessionKeys()
  {
    return SessionKeys;
  }

  public LoginHandler() {
  }

  public void handleLogin(RoutingContext routingContext)
  {
    LOGGER.info("Login");
    JDBCPool pool = DataBaseVerticle.getPool();
    JsonObject body = routingContext.body().asJsonObject();
    String usernameStr = body.getString("username");
    String passwordStr = body.getString("password");
    JsonObject response = new JsonObject();
    if (pool != null) {
      LOGGER.info("pool available");
      String queryStr = "SELECT * FROM ROLE_OF_USER WHERE username = \'" + usernameStr + "\'";
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
              String dbPassword = row.getString("user_password");
              int idRole = row.getInteger("id_role");
              if (dbPassword.equals(passwordStr)) {
                LOGGER.info("correct password");
                String sessionKey = "";
                if (!SessionKeys.containsKey(usernameStr))
                {
                  sessionKey = generateSessionKey();
                  SessionKeys.put(usernameStr, sessionKey);
                }
                else
                {
                  sessionKey = SessionKeys.get(usernameStr);
                }
                response.put("sessionKey", sessionKey);
                response.put("idRole", idRole);
                routingContext.response().setStatusCode(200);
              } else {
                routingContext.response().setStatusCode(400);
                LOGGER.info("wrong password");
              }
              routingContext.response().putHeader("content-type", "application/json");
              break;
            }
          } else {
            LOGGER.info("user doesn't exist");
            routingContext.response().putHeader("content-type", "application/json");
            routingContext.response().setStatusCode(400);
          }
          routingContext.response().end(response.toString());
        });
    }
  }

  public void handleLogout(RoutingContext routingContext)
  {
    LOGGER.info("Logout");
    JsonObject body = routingContext.body().asJsonObject();
    String usernameStr = body.getString("username");
    String sessionKeyStr = body.getString("sessionKey");
    LOGGER.info("username: " + usernameStr);
    LOGGER.info("sessionKeyStr: " + sessionKeyStr);

    routingContext.response().putHeader("content-type", "application/json");
    if (SessionKeys.containsKey(usernameStr) && SessionKeys.get(usernameStr).equals(sessionKeyStr)) {
      SessionKeys.remove(usernameStr);
      LOGGER.info("User is correctly logged-out");
      routingContext.response().setStatusCode(200);
    }
    else {
      LOGGER.info("Logout failed");
      routingContext.response().setStatusCode(400);
    }
    routingContext.response().end();
  }

  @Override
  public void handle(RoutingContext routingContext) {
    try {
      URI uri = new URI(routingContext.request().uri());
      String path = uri.getPath();
      if (path.equals("/login"))
      {
        handleLogin(routingContext);
      }
      else if (path.equals("/logout"))
      {
        handleLogout(routingContext);
      }
    } catch (URISyntaxException e) {
      LOGGER.info("Invalid URI: " + e);
    }
  }
}
