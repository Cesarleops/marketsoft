import { app } from "./app.js";
import { dbClient } from "./database/client.js";

try {
  process.loadEnvFile();
  console.log("env file loaded");
} catch (e) {
  console.log("unable to find .env file");
  process.exit(1);
}

app.listen(process.env.PORT, async () => {
  console.log("listening on ", process.env.PORT);
  try {
    console.log("Checking db connection health");
    await dbClient.authenticate();
    console.log("Database connected");
  } catch (e) {
    console.log("unable to connect to the database");
    console.log(e.message);
    console.log("stopping server");
    process.exit(1);
  }
});
