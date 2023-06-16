const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgres://bvwkfpsi:B-GfAxhsSWr6aDYnfwCwv0a70GvotF9t@silly.db.elephantsql.com/bvwkfpsi',
});

module.exports = pool;
