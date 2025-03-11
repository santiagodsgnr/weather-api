import axios from "axios";
import { redisClient } from "../clients/redis.client.js";

const API_KEY = process.env.API_KEY_VISUAL_CROSSING;
const BASE_URL = process.env.BASE_URL;

export const getWeatherByCity = async (city) => {
    try {
        const cachedData = await redisClient.get(city);
        if (cachedData) {
            console.log(`Data for ${city} retrieved from cache.`);
            return JSON.parse(cachedData);
        }

        const response = await axios.get(`${BASE_URL}/${city}?key=${API_KEY}&unitGroup=metric&contentType=json`);

        if (!response.data || response.data.error) {
            return { error: response.data.error };
        }

        await redisClient.set(city, JSON.stringify(response.data), 'EX', 3600);
        console.log(`Data for ${city} saved to cache.`);

        return response.data;
    } catch (error) {
        return { error: error.message };
    }
};
