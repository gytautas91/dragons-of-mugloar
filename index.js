const api = require('./api');
const dragonFactory = require('./dragon-factory');

const NUMBER_OF_GAMES = 100;
/**
 * If game result status is victory, game is considered won
 * @type {string}
 */
const STATUS_VICTORY = 'Victory';

/**
 * Count how many games won and print results to console
 * @param results
 * @param numberOfGames
 */
const countResults = (results, numberOfGames) => {
  const victories = results.filter(battle => battle.status === STATUS_VICTORY).length;
  const percentage = Math.round((victories / numberOfGames) * 100);
  console.log(`Results ${victories}/${numberOfGames} (${percentage}%) games won!`);
};

/**
 * Start single game
 */
const startNewGame = () => api.newGame()
  .then(game => api.getWeather(game.gameId)
    .then((weather) => {
      const dragon = dragonFactory.createAdjustedDragon(game.knight, weather.report.code);
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

// Here we go !
playGames(NUMBER_OF_GAMES)
  .then(results => countResults(results, NUMBER_OF_GAMES))
  .catch(error => console.warn(error));
