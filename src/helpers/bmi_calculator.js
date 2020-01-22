const bmiCalculation = (weight, height, method) => {
  parseFloat(weight);
  parseFloat(height);
  let bmi;

  weight = isNaN(weight) ? 0 : weight;
  height = isNaN(height) ? 0 : height;

  if (method === "metric") {
    bmi = weight / (height / 100 * height / 100);
  } else {
    bmi = (weight * 703) / (height * height)
  };

  let finalBMI = parseFloat(bmi.toFixed(2));
  let BMIClass = setBMIClass(finalBMI);

  return {
    bmi: finalBMI,
    class: BMIClass
  }
};

const setBMIClass = (finalBMI) => {
  if (finalBMI < 18.5) {
    return "under";
  } else if (finalBMI >= 18.5 && finalBMI < 24.99) {
    return "normal";
  } else if (finalBMI >= 24.99 && finalBMI < 29.99) {
    return "over";
  } else if (finalBMI >= 30) {
    return "obese";
  }
};

export default bmiCalculation;