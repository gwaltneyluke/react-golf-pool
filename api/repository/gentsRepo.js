'use strict';

const aws = require('aws-sdk');
const dynamo = new aws.DynamoDB.DocumentClient();

const gentsTable = process.env.GENTS_TABLE;

/*
    Gets an array of gents in the golf pool
    Structure:
    [
      {
        name: {first and last name of gent},
        picks: [
          {
            name: {first and last name of player},
            chips: {number of chips on this pick}
          },
          ...
        ]
      },
      ...
    ]
*/
const getGents = async () => {
  let scanResult = await dynamo.scan({
    TableName: gentsTable
  }).promise();
  return scanResult.Items;
}

module.exports = {
  getGents
};