import { getGents, getMockGents } from "./gentService";
import { getPlayers, getMockPlayers } from "./playerService";

const getLeaderboard = async () => {
  const gents = await _getGents();
  const players = await _getPlayers();

  const leaderboard = gents.map(gent => {
    const gentPicks = gent.picks.map(pick => {
      const pickPlayer = players.find(player => player.name === pick.playerName);

      return {
        ...pick,
        playerScore: pickPlayer ? pickPlayer.score : '-',
        playerPosition: pickPlayer ? pickPlayer.position : '-'
      }
    });

    const gentScore = gentPicks.reduce(_getGentScoreReducer, 0);

    return {
      ...gent,
      picks: gentPicks.sort((a, b) => a.playerPosition - b.playerPosition),
      score: gentScore
    }
  });

  return _orderLeaderboard(leaderboard);
}

const _getGents = () => {
  const isLocal = process.env.IS_LOCAL === 'true';
  return isLocal ? getMockGents() : getGents();
}

const _getGentScoreReducer = (prevScore, currPick) => {
  if (currPick.playerPosition <= 3) {
    return prevScore + currPick.chips;
  }
  return prevScore;
}

const _getPlayers = () => {
  const isLocal = process.env.IS_LOCAL === 'true';
  return isLocal ? getMockPlayers() : getPlayers();
}

const _orderLeaderboard = (leaderboard) => {
  let orderedLeaderboard = leaderboard.sort((a, b) => b.score - a.score);
  
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

export {
  getLeaderboard
};