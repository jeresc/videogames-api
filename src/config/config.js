import "dotenv/config"

const env = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  dbUrl: process.env.DB_URL,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbPort: process.env.DB_PORT,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  apiKey: process.env.API_KEY,
  apiUrl: process.env.API_URL,
  jwtSecret: process.env.JWT_SECRET,
  bcryptSecret: process.env.BCRYPT_SECRET
}

export default env 
