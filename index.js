const api = require('./api');
const dragonFactory = require('./dragon-factory');

/**
 * Count how many games won and print results to console
 * @param results
 * @param numberOfGames
 */
const countResults = (results, numberOfGames) => {
  const victories = results.filter(battle => battle.status === 'Victory').length;
  const percentage = Math.round((victories / numberOfGames) * 100);
  console.log(`Results ${victories}/${numberOfGames} (${percentage}%) games won!`);
};

/**
 * Start single game
 */
const startNewGame = () => api.newGame()
  .then(game => api.getWeather(game.gameId)
    .then((weather) => {
      const weatherCode = weather.report.code;
      const dragon = dragonFactory.createAdjustedDragon(game.knight, weatherCode);
      return api.solveGame(game.gameId, dragon);
    }));

/**
 * Start multiple games
 * @param numberOfGames
 */
const playGames = (numberOfGames) => {
  if (!Number.isInteger(numberOfGames) || numberOfGames < 1) {
    throw new Error(`Provided incorrect number of games value ${numberOfGames}.`);
  }
  const games = Array.from(new Array(numberOfGames), () => startNewGame());
  return Promise.all(games);
};

const NUMBER_OF_GAMES = 100;

// Here we go !
playGames(NUMBER_OF_GAMES)
  .then(results => countResults(results, NUMBER_OF_GAMES))
  .catch(error => console.warn(error));
