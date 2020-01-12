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
    const URL = `http://localhost:${config.PORT}/${config.API_BASE}/${config.API_VERSION}/data`;
    const jobs = scheduled.scheduleJob("/1 * * * * *", async () => {
      const options = {};
      options.method = "GET";
      options.headers = {
        "Content-Type": "application/json"
      };
      try {
        console.log(URL);
        const result = await fetch(URL, options);
        const data = await result.json();
        if (data) {
          this.insertIntoDataWarehouse(data);
        }
        console.log(new Date());
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    });
  }

  insertIntoDataWarehouse(data) {
    data.forEach(element => {
      try {
        const agent = {
          agentCode: element.AGENT_CODE,
          agentName: element.AGENt_NAME,
          agentPhone: element.PHONO_NO,
          workingArea: element.WORKING_AREA,
          commisions: element.COMMISSION,
          country: ""
        };
        this.pushAgent(agent);
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    });
  }

  async pushAgent(agent) {
    console.log(agent);
    const URL = `http://localhost:${config.PORT}/${config.API_BASE}/${config.API_VERSION}/agent`;
    const options = {};
    options.method = "POST";
    options.body = JSON.stringify(agent);
    options.headers = {
      "Content-Type": "application/json"
    };

    const result = await fetch(URL, options);
    const data = await result.json();
    console.log(data);
    if (data) {
      this.updateAgentMySql(data);
    }
  }

  updateAgentMySql(data) {
    const params = JSON.stringify(data);

    // data.forEach(element => {
    //   (params.agent_code = element.agent.agentCode),
    //     (params.reference_id = element._id),
    //     (params.create_date = element.agent.createDate);
    // });

    console.log(params.data);
    // const options = {};
    // options.method = "PUT";
    // options.body = JSON.stringify(agent);
    // options.headers = {
    //   "Content-Type": "application/json"
    // };

    // const result = await fetch(URL, options);
    // const data = await result.json();
  }
}

module.exports = Jobs;
