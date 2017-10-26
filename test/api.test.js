const assert = require('assert');
const api = require('../api');
const { WEATHER_CODES } = require('../dragon-factory');

describe('Dragons of Mugloar API', () => {
  describe('#Request a new game', () => {
    it('Should return game id and knight', (done) => {
      api
        .newGame()
        .then((game) => {
          const { gameId, knight } = game;
          assert(gameId !== undefined, 'Returned game id is undefined');
          assert(knight !== undefined, 'Returned knight object is undefined');

          assert.deepEqual(
            Object.keys(knight),
            ['name', 'attack', 'armor', 'agility', 'endurance'],
            'Returned knight object has unknown properties',
          );

          const knightPointSum = knight.attack + knight.armor + knight.agility + knight.endurance;
          assert.equal(knightPointSum, 20, `Returned knight object has less than 20 (${knightPointSum})`);
          done();
        });
    });
  });
  describe('#Request weather forecast based on game id', () => {
    it('Should return weather forecast report code', (done) => {
      api
        .newGame()
        .then(game => api.getWeather(game.gameId)
          .then((forecast) => {
            const weatherCode = forecast.report.code;
            assert(
              weatherCode !== undefined,
              `Returned weather forecast report code is undefined for game id ${game.gameId}`,
            );
            assert(
              Object.values(WEATHER_CODES).indexOf(weatherCode) !== -1,
              'Provided weather code ${} does not exist.',
            );
            done();
          }));
    });
  });
});
