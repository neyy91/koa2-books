const mysql = require('mysql');
const configData = require('./config')
const ConfigData = configData.config

class MySQL {

    constructor() {}

    connect() {
        return new Promise((resolve, reject) => {
            try {
                this.pool = mysql.createPoolCluster();
                this.pool.add('MASTER', ConfigData);
                this.pool.getConnection('MASTER', (err, conn) => {

                    if (err) return reject(err);
                    else {
                        console.log(`Master ${ConfigData.host} success connected`);
                        conn.release();
                    }

                });

                resolve();
            } catch (e) {
                reject(e)
            }
        });
    }

    queryToMaster(query, params) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection('MASTER', (err, conn) => {
                if (err) reject(err);
                conn.query(query, params, (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                });
                conn.release();
            });
        });
    }

}




exports.mysql = MySQL;