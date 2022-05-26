'use strict';

const aws = require('aws-sdk');
const s3 = new aws.S3();

const bucket = process.env.PLAYERS_BUCKET || 'jimstick-golf-pool-players-bucket';
const key = 'players.json';

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
const readPlayers = async () => {
  let getObjectResponse = await s3.getObject({
    Bucket: bucket,
    Key: key
  }).promise();
  return JSON.parse(getObjectResponse.Body);
};

const writePlayers = async (players) => {
  await s3.putObject({
    Bucket: bucket,
    Key: key,
    Body: JSON.stringify(players)
  }).promise();
}

module.exports = {
  readPlayers,
  writePlayers
};