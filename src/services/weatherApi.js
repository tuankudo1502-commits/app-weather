/**
 * Weather API Service
 * Wraps OpenWeatherMap REST API calls
 */

const API_KEY = 'bca9afe5f7c634a68ef169c57cd4982f' // free demo key – replace with your own
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

/**
 * Fetch current weather for a city name
 * @param {string} city
 * @returns {Promise<Object>} OWM current weather response
 */
export async function getCurrentWeather(city) {
  const res = await fetch(
    `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=vi`
  )

  if (!res.ok) {
    if (res.status === 404)
      throw new Error(`Không tìm thấy thành phố "${city}". Vui lòng kiểm tra lại!`)
    throw new Error('Không thể kết nối đến máy chủ thời tiết. Thử lại sau nhé!')
  }

  return res.json()
}

/**
 * Fetch 5-day / 3-hour forecast for a city name
 * @param {string} city
 * @returns {Promise<Object>} OWM forecast response
 */
export async function getForecast(city) {
  const res = await fetch(
    `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=vi`
  )

  if (!res.ok) {
    throw new Error('Không thể tải dữ liệu dự báo. Thử lại sau nhé!')
  }

  return res.json()
}
