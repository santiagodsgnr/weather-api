export const sendWeatherResponse = async (res, data) => {
    res.status(200).json(data)
}

export const sendErrorResponse = async (res, statusCode, error,) => {
    res.status(Number(statusCode)).json({
        error: error
    })
}
