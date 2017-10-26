/**
 * Possible weather report codes. Values taken from weather API
 * @type {string}
 */
const WEATHER_NORMAL = 'NMR';
const WEATHER_FLOOD = 'HVA';
const WEATHER_FOG = 'FUNDEFINEDG';
const WEATHER_STORM = 'SRO';
const WEATHER_LONG_DAY = 'T E';
/**
 * Creates base dragon object
 * @param clawSharpness
 * @param scaleThickness
 * @param wingStrength
 * @param fireBreath
 */
const createDragon = (clawSharpness = 0, scaleThickness = 0, wingStrength = 0, fireBreath = 0) => ({
  clawSharpness, scaleThickness, wingStrength, fireBreath,
});

/**
 * Generates dragon based on knight points
 * @param knight
 */
const generateDragon = (knight) => {
  const dragon = createDragon();
  // eslint-disable-next-line
  const { attack, armor, agility, endurance } = knight;

  if (attack + armor > agility + endurance) {
    dragon.clawSharpness = armor - 2;
    dragon.scaleThickness = attack - 1;
    dragon.wingStrength = (agility > 0) ? agility - 1 : agility;
    dragon.fireBreath = (agility === 0) ? endurance - 1 : endurance;
    if (attack === Math.max(attack, armor)) {
      dragon.clawSharpness = armor - 1;
      dragon.scaleThickness = attack + 2;
    }
  } else {
    dragon.clawSharpness = (attack === 0) ? armor - 1 : armor;
    dragon.scaleThickness = (attack > 0) ? attack - 1 : attack;
    dragon.wingStrength = agility - 1;
    dragon.fireBreath = endurance + 2;
    if (agility === Math.max(agility, endurance)) {
      dragon.wingStrength = agility + 2;
      dragon.fireBreath = endurance - 1;
    }
  }

  return dragon;
};

/**
 * Creates dragon based on weather and knight points (if needed)
 * @param knight
 * @param weatherCode
 */
const createAdjustedDragon = (knight, weatherCode) => {
  // Possible weather codes as keys, dragons as values.
  // SRO weather is undefined, since everyone dies anyways...
  const weatherBasedDragons = {};
  weatherBasedDragons[WEATHER_NORMAL] = generateDragon(knight);
  weatherBasedDragons[WEATHER_FLOOD] = createDragon(10, 10, 0, 0);
  weatherBasedDragons[WEATHER_FOG] = createDragon(1, 1, 9, 9);
  weatherBasedDragons[WEATHER_STORM] = undefined;
  weatherBasedDragons[WEATHER_LONG_DAY] = createDragon(5, 5, 5, 5);

  if (Object.keys(weatherBasedDragons).indexOf(weatherCode) === -1) {
    throw new Error(`Provided weather code ${weatherCode} does not exist.`);
  }

  return weatherBasedDragons[weatherCode];
};

exports.WEATHER_CODES = {
  WEATHER_FLOOD, WEATHER_FOG, WEATHER_LONG_DAY, WEATHER_STORM, WEATHER_NORMAL,
};
exports.createDragon = createDragon;
exports.generateDragon = generateDragon;
exports.createAdjustedDragon = createAdjustedDragon;

