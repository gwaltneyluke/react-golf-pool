const chromium = require('chrome-aws-lambda');

const cbsUrl = process.env.CBS_URL || 
  'https://www.cbssports.com/golf/leaderboard/';

const scrapePlayers = async () => {
  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    ignoreHTTPSErrors: true,
  })
  const page = await browser.newPage();
  await page.goto(cbsUrl);

  const playerScores = await page.evaluate(() => {
    let players = [];
    const tableBodies = document.querySelectorAll('table.TableBase-table.GolfLeaderboard-gameModeIngame');
    tableBodies.forEach(tbody => {
      const playerRows = tbody.querySelectorAll('tr.TableBase-bodyTr.GolfLeaderboard-bodyTr.GolfLeaderboard-toggleScorecard--open');
      playerRows.forEach(row => {
        const position = row.querySelectorAll('td.TableBase-bodyTd')[1]?.innerHTML;
        const name = row.querySelector('span.CellPlayerName--long > a')?.innerHTML;
        const score = row.querySelector('td.TableBase-bodyTd.TableBase-bodyTd--number.GolfLeaderboardTable-bodyTd--toPar')?.innerHTML;
        const todayScore = row.querySelector('td.TableBase-bodyTd.TableBase-bodyTd--number.GolfLeaderboardTable-bodyTd--today')?.innerHTML;
        players.push({
          position,
          name,
          score,
          todayScore
        });
      });
    });
    return players;
  });

  console.log(playerScores);
  browser.close();
  return playerScores;
}

module.exports = {
  scrapePlayers
}