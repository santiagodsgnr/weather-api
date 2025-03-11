import express from "express"
import weatherRoutes from "./routes/weather.routes.js"

const app = express()

app.use(express.json())
app.use('/api/v1', weatherRoutes)

export default app