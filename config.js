const requestEventName = "newReq";

const serverConfig = {
  port: process.env.PORT || 81,
  hostname: process.env.HOST || "127.0.0.1",
  eventName: requestEventName,
};

const routerConfig = {
  eventName: requestEventName,
};

const dbConfig = {
  user: 'postgres',
  database: 'db1',
  password: '123123',
  host: '127.0.0.1',
  port: '5432',
  max: 20,
  idleTimeoutMillis: 2
};

const appsDirectoriesPath = "apps";

module.exports = {
  serverConfig,
  routerConfig,
  appsDirectoriesPath,
};
