
import { calculateWaterRisk } from "./waterRisk.js";

const result = calculateWaterRisk({
  groundwaterLevel: 4,
  rainfall: 400,
  waterBodyCondition: "Poor"
});

console.log(result);
