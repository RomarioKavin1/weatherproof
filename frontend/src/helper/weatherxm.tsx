interface WeatherData {
  timestamp: string;
  temperature: number;
  humidity: number;
  wind_speed: number;
  wind_gust: number;
  wind_direction: number;
  solar_irradiance: number;
  uv_index: number;
  precipitation: number;
  pressure: number;
  icon: string;
  precipitation_accumulated: number;
  dew_point: number;
  feels_like: number;
}

interface DeviceWeatherData {
  id: string;
  cellIndex: string;
  name: string;
  profile: string;
  timezone: string;
  isActive: boolean;
  lastWeatherStationActivity: string;
  current_weather: WeatherData;
}

export async function fetchWeatherData(
  latitude: number,
  longitude: number
): Promise<string> {
  const bearerToken = "";

  try {
    // Fetch weather cells
    const response = await fetch("https://api.weatherxm.com/api/v1/cells", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    const weatherCells: {
      [x: string]: any;
      polygon: { lat: number; lon: number }[];
    }[] = await response.json();

    // Find the closest device
    let closestDeviceIndex = 0;
    let minDistance = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < weatherCells.length; i++) {
      const cell = weatherCells[i];
      const center = cell.polygon[0]; // Assuming the first point is the center
      const distance = Math.sqrt(
        (latitude - center.lat) ** 2 + (longitude - center.lon) ** 2
      );
      if (distance < minDistance) {
        minDistance = distance;
        closestDeviceIndex = i;
      }
    }

    // Fetch weather data for the closest device
    const closestCellIndex = weatherCells[closestDeviceIndex].index;
    const deviceResponse = await fetch(
      `https://api.weatherxm.com/api/v1/cells/${closestCellIndex}/devices`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    );
    const devices: DeviceWeatherData[] = await deviceResponse.json();

    // Get weather data from the closest device
    const weatherData = devices[0].current_weather;
    const weatherString = JSON.stringify(weatherData);

    return weatherString;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error("Error fetching weather data");
  }
}

// Example usage:
