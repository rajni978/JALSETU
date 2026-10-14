
export const getRainfallData = async (req, res) => {
  try {
    const { latitude, longitude, start, end } = req.query;

    // 1. Validate query parameters
    if (!latitude || !longitude || !start || !end) {
      return res.status(400).json({
        success: false,
        message:
          "latitude, longitude, start and end are required"
      });
    }

    const lat = Number(latitude);
    const lon = Number(longitude);

    if (
      !Number.isFinite(lat) ||
      !Number.isFinite(lon) ||
      lat < -90 || lat > 90 ||
      lon < -180 || lon > 180
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid latitude or longitude"
      });
    }

    // Dates must be YYYYMMDD
    const validDate = (value) =>
      /^\d{8}$/.test(value) &&
      !Number.isNaN(
        Date.parse(
          `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}T00:00:00Z`
        )
      ) &&
      new Date(
        `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}T00:00:00Z`
      ).toISOString().slice(0, 10) ===
        `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`;

    if (!validDate(start) || !validDate(end) || start > end) {
      return res.status(400).json({
        success: false,
        message: "Use valid dates in YYYYMMDD format; start must be before or equal to end"
      });
    }

    // 2. Build NASA POWER API URL
    const apiUrl = new URL(
      "https://power.larc.nasa.gov/api/temporal/daily/point"
    );

    apiUrl.search = new URLSearchParams({
      parameters: "PRECTOTCORR",
      community: "AG",
      longitude: String(lon),
      latitude: String(lat),
      start,
      end,
      format: "JSON"
    }).toString();

    // 3. Fetch real environmental data
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`NASA POWER returned HTTP ${response.status}`);
    }

    const data = await response.json();

    const dailyRainfall =
      data.properties?.parameter?.PRECTOTCORR;

    if (!dailyRainfall) {
      throw new Error("Rainfall data was not found in NASA response");
    }

    // NASA's daily precipitation parameter is reported in mm/day.
    const dailyValues = Object.entries(dailyRainfall).map(
      ([date, rainfallMm]) => ({
        date,
        rainfallMm
      })
    );

    const totalRainfallMm = dailyValues.reduce(
      (total, day) => total + day.rainfallMm,
      0
    );

    // 4. Send response to frontend/Postman
    return res.status(200).json({
      success: true,
      source: "NASA POWER",
      parameter: "PRECTOTCORR",
      unit: "mm/day",
      location: {
        latitude: lat,
        longitude: lon
      },
      period: { start, end },
      daysReturned: dailyValues.length,
      totalRainfallMm,
      dailyRainfall: dailyValues
    });

  } catch (error) {
    console.error("Rainfall API error:", error.message);

    return res.status(502).json({
      success: false,
      message: "Unable to fetch rainfall data",
      error: error.message
    });
  }
};
