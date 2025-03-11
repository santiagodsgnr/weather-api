import express from "express"
import rateLimit from "express-rate-limit"
import weatherRoutes from "./routes/weather.routes.js"

const app = express()

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { error: "Too many requests, please try again later." },
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(limiter)
app.use(express.json())
app.use('/api/v1', weatherRoutes)

export default app