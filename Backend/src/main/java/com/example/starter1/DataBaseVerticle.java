package com.example.starter1;

import io.vertx.core.AbstractVerticle;
import io.vertx.jdbcclient.JDBCConnectOptions;
import io.vertx.jdbcclient.JDBCPool;
import io.vertx.sqlclient.PoolOptions;
import io.vertx.sqlclient.Row;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class DataBaseVerticle extends AbstractVerticle {

  public static final Logger LOGGER = LoggerFactory.getLogger("DatabaseLogger");

  public static JDBCPool POOL = null;

  public static JDBCPool getPool()
  {
    return POOL;
  }

  @Override
  public void start() throws Exception {

    LOGGER.info("Hello from DataBaseVerticle");

    POOL = JDBCPool.pool(
      vertx,
      // configure the connection
      new JDBCConnectOptions()
        // H2 connection string
        .setJdbcUrl("jdbc:postgresql://localhost:5433/postgres")
        // username
        .setUser("postgres")
        // password
        .setPassword("password"),
      // configure the pool
      new PoolOptions()
        .setMaxSize(16)
        .setName("my-pool")
    );
  }
}

