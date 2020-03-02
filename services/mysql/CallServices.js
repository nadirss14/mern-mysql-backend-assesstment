const db = require('../../config/mysql/mysqlConnection');

module.exports = {
	getAllCalls: () => {
		return new Promise((resolve, reject) => {
			try {
				db.query(
					`select 
            Date_format(calldate,'%Y-%m-%d %h:%i:%s') as callDate,
            count(uniqueid) as Quantity 
            from asteriskcdrdb.cdr
            where calldate between DATE_ADD(now(),INTERVAL -1 HOUR) and now()
            group by UNIX_TIMESTAMP(Date_format(calldate,'%Y-%m-%d %h:%i'))
            order by calldate asc;`,
					(error, results) => {
						if (error) {
							reject(error);
						}
						resolve(results);
					},
				);
			} catch (error) {
				console.log(`Error in getAllCalls: ${error.message}`);
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
		let clearDataMysql = `update sql10318391.agents set REFERENCE_ID = '',create_date=null;`;
		console.log(clearDataMysql);
		return new Promise((resolve, reject) => {
			db.query(clearDataMysql, (error, result) => {
				if (error) {
					reject(error);
				}
				console.log('Exito');
				resolve(result);
			});
		});
	},
};
