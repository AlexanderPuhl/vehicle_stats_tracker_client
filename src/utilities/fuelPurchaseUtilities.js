export const calculateMPG = (lastTwoFuelPurchases) => {
	let calculatedMPG;
	calculatedMPG = 'Needs more data';

	const milesBetweenLastTwo = lastTwoFuelPurchases.map(fuelPurchase => fuelPurchase.odometer);
	const differenceOfMiles = milesBetweenLastTwo[0] - milesBetweenLastTwo[1];
	const amountOfLastTwo = lastTwoFuelPurchases.map(fuelPurchase => fuelPurchase.amount);

	if (differenceOfMiles && amountOfLastTwo[1]) {
		calculatedMPG = (differenceOfMiles / amountOfLastTwo[0]).toFixed(2);
	}
	return calculatedMPG;
}

export const calculateMilesPerDollar = (lastTwoFuelPurchases) => {
	let calculateMilerPerDollar;

	const milesBetweenLastTwo = lastTwoFuelPurchases.map(fuelPurchase => fuelPurchase.odometer);
	const differenceOfMiles = milesBetweenLastTwo[0] - milesBetweenLastTwo[1];
	const amountOfLastTwo = lastTwoFuelPurchases.map(fuelPurchase => fuelPurchase.amount);
	const costOfLastTwo = lastTwoFuelPurchases.map(
		fuelPurchase => fuelPurchase.price * fuelPurchase.amount,
	);

	if (differenceOfMiles && amountOfLastTwo[1]) {
		calculateMilerPerDollar = (differenceOfMiles / costOfLastTwo[0]).toFixed(2);
	}
	return calculateMilerPerDollar;
}

export const calculateCostPerMile = (lastTwoFuelPurchases) => {
	let costPerMiles;

	const milesBetweenLastTwo = lastTwoFuelPurchases.map(fuelPurchase => fuelPurchase.odometer);
	const differenceOfMiles = milesBetweenLastTwo[0] - milesBetweenLastTwo[1];
	const amountOfLastTwo = lastTwoFuelPurchases.map(fuelPurchase => fuelPurchase.amount);
	const costOfLastTwo = lastTwoFuelPurchases.map(
		fuelPurchase => fuelPurchase.price * fuelPurchase.amount,
	);

	if (differenceOfMiles && amountOfLastTwo[1]) {
		costPerMiles = '$' + (costOfLastTwo[0] / differenceOfMiles).toFixed(2);
	}
	return costPerMiles;
}