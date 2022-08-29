const { Pool } = require('pg')

class DB {
  #instance = null;
  constructor(config) {
    if (!DB.#instance) {
      DB.#instance = new Pool(config);
    }
    return this.#instance;
  }
}


module.exports = DB;