'use strict';

const { getGents } = require('../repository/gentsRepo');
const { getPlayers } = require('../repository/playersRepo');

const scoringPosition = process.env.SCORING_POSITION || 3;

const getOrderedLeaderboard = async () => {
  console.log(`orderLeaderboard.getOrderedLeaderboard - start`);
  const gents = await getGents();
  const players = await getPlayers();

  console.log(`orderLeaderboard.getOrderedLeaderboard - gents: ${JSON.stringify(gents)}`);
  console.log(`orderLeaderboard.getOrderedLeaderboard - players: ${JSON.stringify(players)}`);
  const mappedGents = _mapGents(gents, players);
  console.log(`orderLeaderboard.getOrderedLeaderboard - mapped gents: ${JSON.stringify(mappedGents)}`);
  return _orderLeaderboard(mappedGents);
};

module.exports = {
  getOrderedLeaderboard
}

const _getGentScore = (gentsPicks) => {
  return gentsPicks.reduce((score, currentPick) => {
    if (currentPick.position <= scoringPosition) {
      return score + currentPick.chips;
    }
    return score;
  }, 0);
}

const _mapGents = (gents, players) => {
  return gents.map(gent => {
    const gentsPicks = gent.picks.map(pick => {
      const pickPlayer = players.find(player => player.name == pick.name);

      return {
        ...pick,
        score: pickPlayer ? pickPlayer.score : '-',
        position: pickPlayer ? pickPlayer.position: '-' 
      };
    });

    const gentScore = _getGentScore(gentsPicks);

    return {
      ...gent,
      picks: gentsPicks.sort((a, b) => a.position - b.position),
      score: gentScore
    }
  })
};

const _orderLeaderboard = (mappedGents) => {
  let orderedLeaderboard = mappedGents.sort((a, b) => b.score - a.score);
  
  for (let i = 0; i < orderedLeaderboard.length; i++) {
    if (i > 0 && orderedLeaderboard[i-1].score === orderedLeaderboard[i].score) {
      orderedLeaderboard[i].position = orderedLeaderboard[i-1].position;
    } else if (i < orderedLeaderboard.length-1 && orderedLeaderboard[i+1].score === orderedLeaderboard[i].score) {
      orderedLeaderboard[i].position = `T${i+1}`;
    } else {
      orderedLeaderboard[i].position = i+1;
    }
  }

  return orderedLeaderboard;
}