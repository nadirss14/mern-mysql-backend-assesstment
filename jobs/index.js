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
    const URL = `${config.URL}${config.API_BASE}/${config.API_VERSION}/data`;
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
        console.log("Exito getAllAgentsFromMySql");
      } catch (error) {
        console.log(`Error getAllAgentsFromMySql: ${error}`);
      }
    });
  }

  insertIntoDataWarehouse(data) {
    data.forEach(element => {
      try {
        const agent = {
          agentCode: element.AGENT_CODE,
          agentName: element.AGENT_NAME,
          agentPhone: element.PHONE_NO,
          workingArea: element.WORKING_AREA,
          commisions: element.COMMISSION,
          country: element.COUNTRY
        };
        this.pushAgent(agent);
        console.log("insertIntoDataWarehouse");
      } catch (error) {
        console.log(`Error insertIntoDataWarehouse: ${error}`);
      }
    });
  }

  async pushAgent(agent) {
    const URL = `${config.URL}${config.API_BASE}/${config.API_VERSION}/agent`;
    try {
      const options = {};
      options.method = "POST";
      options.body = JSON.stringify(agent);
      options.headers = {
        "Content-Type": "application/json"
      };

      const result = await fetch(URL, options);
      const data = await result.json();
      if (data) {
        this.updateAgentMySql(data);
      }
    } catch (error) {
      console.log(`Error pushAgent: ${error}`);
    }
  }

  async updateAgentMySql(data) {
    const URL = `${config.URL}${config.API_BASE}/${config.API_VERSION}/data`;
    try {
      const JsonData = JSON.stringify(data);
      console.log(JsonData);
      const result = JSON.parse(JsonData, (k, v) => v);

      const params = {
        agent_code: result.agent.agentCode,
        reference_id: result._id,
        create_date: result.agent.createDate
      };
      console.log(JSON.stringify(params));
      const options = {};
      options.method = "PUT";
      options.body = JSON.stringify(params);
      options.headers = {
        "Content-Type": "application/json"
      };

      const response = await fetch(URL, options);
      const value = await response.json();
    } catch (error) {
      console.log(`Error updateAgentMySql: ${error}`);
    }
  }
}

module.exports = Jobs;
