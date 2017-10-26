const fetch = require('node-fetch');
const parser = require('xml2json');

const BASE_URL = 'http://www.dragonsofmugloar.com';

/**
 * Fetches weather forecast based on game ID
 * @param gameId
 */
exports.getWeather = gameId =>
  fetch(`${BASE_URL}/weather/api/report/${gameId}`)
    .then(r => r.text()) // Response is in xml
    .then(parser.toJson) // Convert to json string
    .then(JSON.parse);

/**
 * Starts new game
 */
exports.newGame = () =>
  fetch(`${BASE_URL}/api/game`)
    .then(r => r.json());

/**
 * Sends solution (dragon) to game api
 * @param gameId
 * @param dragon
 */
exports.solveGame = (gameId, dragon) =>
  fetch(`${BASE_URL}/api/game/${gameId}/solution`, {
    method: 'PUT',
    body: JSON.stringify({ dragon }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(r => r.json());
