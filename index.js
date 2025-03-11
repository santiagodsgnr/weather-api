import app from './app.js'
import { connectRedis } from './clients/redis.client.js'

const PORT = process.env.PORT || 3000

app.listen(PORT, async () => {
    await connectRedis()
    console.log(`🟢 Server running in ${PORT}`)
})