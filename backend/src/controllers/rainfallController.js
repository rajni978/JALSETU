
// export const getRainfallData = async (req, res) => {
//   try {
//     const { latitude, longitude, start, end } = req.query;

//     // 1. Validate query parameters
//     if (!latitude || !longitude || !start || !end) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "latitude, longitude, start and end are required"
//       });
//     }

//     const lat = Number(latitude);
//     const lon = Number(longitude);

//     if (
//       !Number.isFinite(lat) ||
//       !Number.isFinite(lon) ||
//       lat < -90 || lat > 90 ||
//       lon < -180 || lon > 180
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid latitude or longitude"
//       });
//     }

//     // Dates must be YYYYMMDD
//     const validDate = (value) =>
//       /^\d{8}$/.test(value) &&
//       !Number.isNaN(
//         Date.parse(
//           `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}T00:00:00Z`
//         )
//       ) &&
//       new Date(
//         `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}T00:00:00Z`
//       ).toISOString().slice(0, 10) ===
//         `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`;

//     if (!validDate(start) || !validDate(end) || start > end) {
//       return res.status(400).json({
//         success: false,
//         message: "Use valid dates in YYYYMMDD format; start must be before or equal to end"
//       });
//     }

//     // 2. Build NASA POWER API URL
//     const apiUrl = new URL(
//       "https://power.larc.nasa.gov/api/temporal/daily/point"
//     );

//     apiUrl.search = new URLSearchParams({
//       parameters: "PRECTOTCORR",
//       community: "AG",
//       longitude: String(lon),
//       latitude: String(lat),
//       start,
//       end,
//       format: "JSON"
//     }).toString();

//     // 3. Fetch real environmental data
//     const response = await fetch(apiUrl);

//     if (!response.ok) {
//       throw new Error(`NASA POWER returned HTTP ${response.status}`);
//     }

//     const data = await response.json();

//     const dailyRainfall =
//       data.properties?.parameter?.PRECTOTCORR;

//     if (!dailyRainfall) {
//       throw new Error("Rainfall data was not found in NASA response");
//     }

//     // NASA's daily precipitation parameter is reported in mm/day.
//     const dailyValues = Object.entries(dailyRainfall).map(
//       ([date, rainfallMm]) => ({
//         date,
//         rainfallMm
//       })
//     );

//     const totalRainfallMm = dailyValues.reduce(
//       (total, day) => total + day.rainfallMm,
//       0
//     );

//     // 4. Send response to frontend/Postman
//     return res.status(200).json({
//       success: true,
//       source: "NASA POWER",
//       parameter: "PRECTOTCORR",
//       unit: "mm/day",
//       location: {
//         latitude: lat,
//         longitude: lon
//       },
//       period: { start, end },
//       daysReturned: dailyValues.length,
//       totalRainfallMm,
//       dailyRainfall: dailyValues
//     });

//   } catch (error) {
//     console.error("Rainfall API error:", error.message);

//     return res.status(502).json({
//       success: false,
//       message: "Unable to fetch rainfall data",
//       error: error.message
//     });
//   }
// };
const NASA_URL = "https://power.larc.nasa.gov/api/temporal/daily/point";
const LAG_DAYS = 7; // NASA data arrives a few days late

const toDate = (v) => new Date(`${v.slice(0, 4)}-${v.slice(4, 6)}-${v.slice(6, 8)}T00:00:00Z`);
const isValidYmd = (v) =>
  /^\d{8}$/.test(v) &&
  !Number.isNaN(toDate(v).getTime()) &&
  toDate(v).toISOString().slice(0, 10) === `${v.slice(0, 4)}-${v.slice(4, 6)}-${v.slice(6, 8)}`;
const toYmd = (d) => d.toISOString().slice(0, 10).replace(/-/g, "");

export const getRainfallData = async (req, res) => {
  try {
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;
    const start = String(req.query.start ?? "");
    const end = String(req.query.end ?? "");

    // 1. Validate query parameters
    if (!latitude || !longitude || !start || !end) {
      return res.status(400).json({
        success: false,
        message: "latitude, longitude, start and end are required"
      });
    }

    const lat = Number(latitude);
    const lon = Number(longitude);

    if (!Number.isFinite(lat) || !Number.isFinite(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      return res.status(400).json({ success: false, message: "Invalid latitude or longitude" });
    }

    if (!isValidYmd(start) || !isValidYmd(end) || start > end) {
      return res.status(400).json({
        success: false,
        message: "Use valid dates in YYYYMMDD format; start must be before or equal to end"
      });
    }

    // FIX 1: NASA has no data for the last few days. Asking for "today" makes NASA reject the request,
    // so we cut the end date to the latest day NASA can serve.
    const latest = new Date();
    latest.setUTCDate(latest.getUTCDate() - LAG_DAYS);
    const latestYmd = toYmd(latest);
    const endUsed = end > latestYmd ? latestYmd : end;

    if (start > endUsed) {
      return res.status(400).json({
        success: false,
        message: `NASA data is available only up to ${latestYmd}. Choose a start date on or before it.`
      });
    }

    // 2. Build NASA POWER API URL
    const apiUrl = new URL(NASA_URL);
    apiUrl.search = new URLSearchParams({
      parameters: "PRECTOTCORR",
      community: "AG",
      longitude: String(lon),
      latitude: String(lat),
      start,
      end: endUsed,
      format: "JSON"
    }).toString();

    // 3. Fetch (FIX 2: timeout, and show NASA's own error message)
    const response = await fetch(apiUrl, { signal: AbortSignal.timeout(20000) });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      throw new Error(`NASA POWER returned HTTP ${response.status}: ${body.slice(0, 200)}`);
    }

    const data = await response.json();
    const dailyRainfall = data.properties?.parameter?.PRECTOTCORR;

    if (!dailyRainfall) {
      throw new Error("Rainfall data was not found in NASA response");
    }

    // FIX 3: NASA uses -999 for "no data". Adding it made the total hugely negative, so we skip those days.
    const dailyValues = Object.entries(dailyRainfall)
      .filter(([, mm]) => typeof mm === "number" && mm >= 0)
      .map(([date, rainfallMm]) => ({ date, rainfallMm }));

    const missingDays = Object.keys(dailyRainfall).length - dailyValues.length;
    const totalRainfallMm =
      Math.round(dailyValues.reduce((total, day) => total + day.rainfallMm, 0) * 10) / 10;

    // 4. Send response
    return res.status(200).json({
      success: true,
      source: "NASA POWER",
      parameter: "PRECTOTCORR",
      unit: "mm/day",
      location: { latitude: lat, longitude: lon },
      period: { start, end: endUsed, requestedEnd: end },
      daysReturned: dailyValues.length,
      missingDays,
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