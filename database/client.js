import { Sequelize } from "sequelize";


try {
  process.loadEnvFile();
  console.log("env file loaded");
} catch (e) {
  console.log("unable to find .env file");
  process.exit(1);
}

const DB_CONFIG = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  hostname: process.env.DB_HOSTNAME,
  port: process.env.DB_PORT,
  name: process.env.DB_NAME,
};
console.log("db config", DB_CONFIG);
export const dbClient = new Sequelize(
  `postgres://${DB_CONFIG.username}:${DB_CONFIG.password}@${DB_CONFIG.hostname}:${DB_CONFIG.port}/${DB_CONFIG.name}`,
);
