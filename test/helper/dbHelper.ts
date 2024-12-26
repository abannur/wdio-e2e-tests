import sql from "mssql/msnodesqlv8.js";
import reporter from "../helper/reporter.ts";

/**
 * Executes given query
 * @param testid 
 * @param config 
 * @param query 
 * @returns db result object
 */
async function executeQuery(testid: string, config, query: string) {
  //truthy value check
  if (!query) throw Error(`Given query is invalid : ${query}`);
  reporter.addStep(this.testid, "info", "executing the DB query");
  const pool = new sql.ConnectionPool(config);
  // automatically remove the pool from the cache if `pool.close()` is called
  const poolConnect = pool.connect();
  pool.on("error", (err) => {
    throw err;
  });
  await poolConnect; // ensures that the pool has been created
  try {
    const request = pool.request(); // or: new sql.Request(pool1)
    const result = await request.query(query);
    return result;
  } catch (err) {
    throw err;
  }
}

export default {executeQuery};
