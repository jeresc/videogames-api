import "dotenv/config"

const config = {
  port: process.env.PORT,
  dbUrl: process.env.DB_URL,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbPort: process.env.DB_PORT,
  dbHost: process.env.DB_HOST,
}

export default config
