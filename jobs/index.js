// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    │
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)

const scheduled = require("node-schedule");
const fetch = require("node-fetch");
const { config } = require("../config/environment");

class Jobs {
  constructor() {
    console.log("init...");
  }

  getAllAgentsFromMySql() {
    const jobs = scheduled.scheduleJob("/1 * * * * *", async () => {
      const options = {};
      options.method = "GET";
      options.headers = {
        "Content-Type": "application/json"
      };
      try {
        const URL = `http://localhost:${config.PORT}/${config.API_BASE}/${config.API_VERSION}/agents`;
        console.log(URL);
        const result = await fetch(URL, options);
        const data = await result.json();
        console.log(data);
        console.log(new Date());
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    });
  }
}

module.exports = Jobs;
