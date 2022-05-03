import { getMockGents } from "./gentService";
import { getMockPlayers } from "./playerService";

const getLeaderboard = () => {
  const gents = getMockGents();
  const players = getMockPlayers();

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

const _getGentScoreReducer = (prevScore, currPick) => {
  if (currPick.playerPosition <= 3) {
    return prevScore + currPick.chips;
  }
  return prevScore;
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