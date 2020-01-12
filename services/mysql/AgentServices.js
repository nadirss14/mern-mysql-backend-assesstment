// const db = require("../config/mysql/mysqlConnection");
const db = require("../../config/mysql/mysqlConnection");

module.exports = {
  getAllAgents: () => {
    return new Promise((resolve, reject) => {
      try {
        db.query(
          "SELECT * FROM sql10318391.agents LIMIT 0, 2",
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
    let createAgent = `CALL sp_updateAgent ('${agent.agentCode}',
                                          '${agent._id}', 
                                          '${agent.createDate}');
                                      `;
    return new Promise((resolve, reject) => {
      db.query(createAgent, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  }
};
