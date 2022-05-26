const { writePlayers } = require("./repository/playersRepo");
const { scrapePlayers } = require("./service/scrapePlayers");

const handler = async () => {
  try {
    const players = await scrapePlayers();
    await writePlayers(players);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = {
  handler
};