import config from "#config"
import app from "./app.js"

app.listen(config.port, () => {
  console.log(`[sv] Listening on port ${config.port}`);
});
