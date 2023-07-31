import config from '#config';
import { sequelize } from '#helpers';
import app from './app.js';

app.listen(config.port, async () => {
  console.log(`[sv] Listening on port ${config.port}`);
  await sequelize.authenticate();
  console.log('[db] Connection established succesfully.');
  await sequelize.sync({ force: true })
});
