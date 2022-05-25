'use strict';

const aws = require('aws-sdk');
const dynamo = new aws.DynamoDB.DocumentClient()

const playersTable = process.env.PLAYERS_TABLE;

/*
    Gets an array of players in the golf tournament
    Structure:
    [
      {
        name: {first and last name of player},
        position: {position of player},
        score: {score to par of player}
      },
      ...
    ]
*/
const getPlayers = async () => {
  let scanResult = await dynamo.scan({
    TableName: playersTable
  }).promise();
  return scanResult.Items;
}

module.exports = {
  getPlayers
};