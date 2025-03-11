import { getWeatherByCity } from "../models/weather.model.js"
import { sendErrorResponse, sendWeatherResponse } from "../views/weather.views.js";

export const getWeather = async (req, res) => {
    const { city } = await req.query
    if (!city) return res.status(400).json({
        error: "City parameter is required. Please provide a valid city name in the query parameters.",
        code: "MISSING_CITY_PARAMETER"
    });

    try {
        const response = await getWeatherByCity(city);

        if (response.error) {
            return sendErrorResponse(res, 404, response.error)
        }

        return sendWeatherResponse(res, response);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}