export const calculateWaterRisk = ({
    groundwaterLevel,
    rainfall,
    waterBodyCondition
}) => {
    let score = 0;

    if (groundwaterLevel < 5) {
        score += 40;
    } else if (groundwaterLevel < 10) {
        score += 25;
    } else {
        score += 10;
    }

    if (rainfall < 500) {
        score += 30;
    } else if (rainfall < 1000) {
        score += 20;
    } else {
        score += 10;
    }

    if (waterBodyCondition === "Poor") {
        score += 30;
    } else if (waterBodyCondition === "Moderate") {
        score += 20;
    } else if (waterBodyCondition === "Good") {
        score += 10;
    } else {
        throw new Error("Invalid water body condition");
    }

    const riskLevel =
        score >= 70 ? "High" :
        score >= 40 ? "Medium" :
        "Low";

    return { score, riskLevel };
};