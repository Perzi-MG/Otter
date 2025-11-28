export const calculateIMC = (weightKg: number, heightCm: number): number => {
    if (heightCm <= 0) return 0;
    const heightM = heightCm / 100;
    return parseFloat((weightKg / (heightM * heightM)).toFixed(2));
};

export const getIMCClassification = (imc: number): string => {
    if (imc < 18.5) return 'Bajo peso';
    if (imc < 24.9) return 'Peso normal';
    if (imc < 29.9) return 'Sobrepeso';
    return 'Obesidad';
};

export interface MacroDistribution {
    carbsPercentage: number;
    proteinPercentage: number;
    fatPercentage: number;
}

export interface MacroNutrientData {
    calories: number;
    grams: number;
}

export interface DietosyntheticResult {
    carbs: MacroNutrientData;
    protein: MacroNutrientData;
    fat: MacroNutrientData;
    totalCalories: number;
}

export const calculateDietosynthetic = (
    totalCalories: number,
    distribution: MacroDistribution
): DietosyntheticResult => {
    const { carbsPercentage, proteinPercentage, fatPercentage } = distribution;

    // Calculate calories for each macro
    const carbsCalories = (totalCalories * carbsPercentage) / 100;
    const proteinCalories = (totalCalories * proteinPercentage) / 100;
    const fatCalories = (totalCalories * fatPercentage) / 100;

    // Standard conversion factors: Carbs 4kcal/g, Protein 4kcal/g, Fat 9kcal/g
    const carbsGrams = carbsCalories / 4;
    const proteinGrams = proteinCalories / 4;
    const fatGrams = fatCalories / 9;

    return {
        carbs: {
            calories: parseFloat(carbsCalories.toFixed(2)),
            grams: parseFloat(carbsGrams.toFixed(2)),
        },
        protein: {
            calories: parseFloat(proteinCalories.toFixed(2)),
            grams: parseFloat(proteinGrams.toFixed(2)),
        },
        fat: {
            calories: parseFloat(fatCalories.toFixed(2)),
            grams: parseFloat(fatGrams.toFixed(2)),
        },
        totalCalories,
    };
};

export const calculateTDEE = (
    weightKg: number,
    heightCm: number,
    age: number,
    gender: 'Hombre' | 'Mujer',
    activityLevel: string
): number => {
    // Mifflin-St Jeor Equation
    let bmr = 10 * weightKg + 6.25 * heightCm - 5 * age;
    if (gender === 'Hombre') {
        bmr += 5;
    } else {
        bmr -= 161;
    }

    // Activity Multipliers
    const activityMultipliers: { [key: string]: number } = {
        'Sedentario': 1.2,
        'Ligero': 1.375,
        'Moderado': 1.55,
        'Activo': 1.725,
        'Muy Activo': 1.9,
    };

    // Default to Sedentario if not found or partial match
    const multiplier = activityMultipliers[activityLevel] || 1.2;

    return Math.round(bmr * multiplier);
};
