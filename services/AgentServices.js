// const db = require("../config/mysql/mysqlConnection");
const db = require("../config/mysql/mysqlConnection");

module.exports = {
  getAgents: () => {
    console.log("Entre....");
    return new Promise((resolve, reject) => {
      try {
        db.query(
          "SELECT * FROM sql10318391.agents LIMIT 0, 1000",
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
  }
};
