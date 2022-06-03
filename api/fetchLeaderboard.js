'use strict';

const { getOrderedLeaderboard } = require('./service/orderLeaderboard');

module.exports.handler = async () => {
  console.log(`fetchLeaderboard.handler - start`);
  const orderedLeaderboard = await getOrderedLeaderboard();
  console.log(`fetchLeaderboard.handler - end: ${orderedLeaderboard}`);
  return {
    statusCode: 200,
    body: JSON.stringify(orderedLeaderboard),
  };
};