const assert = require('assert');
const { WEATHER_CODES, createAdjustedDragon, createDragon, generateDragon } = require('../dragon-factory');

const createKnight = (attack = 0, armor = 0, agility = 0, endurance = 0) =>
  Object.assign({}, {
    attack, armor, agility, endurance,
  });

describe('Dragons Factory', () => {
  describe('#Create base dragon', () => {
    it('Should return dragon with 0 points spread', () => {
      const pointSum = Object
        .values(createDragon())
        .reduce((sum, value) => sum + value);

      assert.equal(pointSum, 0, 'Base dragon should not contain points');
    });

    it('Should return dragon with property names', () => {
      const requiredProperties = ['clawSharpness', 'scaleThickness', 'wingStrength', 'fireBreath'];
      const dragonKeys = Object.keys(createDragon());
      assert.deepEqual(requiredProperties, dragonKeys, 'Dragon does not cointain required properties');
    });
  });

  describe('#Create dragon based on weather', () => {
    it('Should explode on random weather codes', () => {
      assert.throws(() => {
        const randomWeather = Math.random().toString(36).substring(4);
        createAdjustedDragon(createKnight(), randomWeather);
      }, Error, 'Dragon exploded while adjusting it based on random weather code');
    });

    it('Should return dragon based on weather', () => {
      assert.deepEqual(
        createAdjustedDragon(createKnight(), WEATHER_CODES.WEATHER_LONG_DAY),
        createDragon(5, 5, 5, 5),
        'Dragon is not zen out ',
      );
      assert.deepEqual(
        createAdjustedDragon(createKnight(), WEATHER_CODES.WEATHER_FOG),
        createDragon(1, 1, 9, 9),
        'Dragon is not suited for the foggy battle',
      );

      assert.deepEqual(
        createAdjustedDragon(createKnight(), WEATHER_CODES.WEATHER_STORM),
        undefined,
        'Dragon is not suited for the foggy battle',
      );

      assert.deepEqual(
        createAdjustedDragon(createKnight(), WEATHER_CODES.WEATHER_FLOOD),
        createDragon(10, 10, 0, 0),
        'Dragon is not suited for the watery battle',
      );

      const knight = createKnight(4, 5, 5, 6);
      assert.deepEqual(
        createAdjustedDragon(knight, WEATHER_CODES.WEATHER_NORMAL),
        generateDragon(knight),
        'Dragon is not suited for the normal battle',
      );
    });
  });
});
