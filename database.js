const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgres://akhjkclr:LabigLkP3q2TftCn0O6_T6IIidTwSJI7@babar.db.elephantsql.com/akhjkclr',
});

module.exports = pool;
