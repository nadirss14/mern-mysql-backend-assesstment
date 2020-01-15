const db = require("../../config/mysql/mysqlConnection");

module.exports = {
  getAllAgents: () => {
    return new Promise((resolve, reject) => {
      try {
        db.query(
          "SELECT * FROM sql10318391.agents WHERE (REFERENCE_ID = '' or REFERENCE_ID = null)  LIMIT 0, 5;",
          (error, results) => {
            if (error) {
              reject(error);
            }
            resolve(results);
          }
        );
      } catch (error) {
        console.log(`Error in getAgente: ${error.message}`);
      }
    });
  },
  updateAgent: agent => {
    let updateAgent = `UPDATE sql10318391.agents 
                        SET CREATE_DATE = '${agent.create_date}', 
                        REFERENCE_ID = '${agent.reference_id}' 
                        WHERE (AGENT_CODE = '${agent.agent_code}'); `;
    console.log(updateAgent);
    return new Promise((resolve, reject) => {
      db.query(updateAgent, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  },
  clearData: () => {
    let clearDataMysql = `update agents set REFERENCE_ID = '',create_date=null ;`;
    console.log(updateAgent);
    return new Promise((resolve, reject) => {
      db.query(clearDataMysql, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  }
};
