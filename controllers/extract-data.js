/**
 *
 * main() will be run when you invoke this action
 *
 * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
 *
 * @return The output of this action, which must be a JSON object.
 *
 */
const { Pool, Client } = require("pg");
const fs = require("fs");
const XLSX = require("xlsx");
const ibm = require("ibm-cos-sdk");
const util = require("util");

const config = {
  endpoint: "s3.direct.eu-de.cloud-object-storage.appdomain.cloud",
  apiKeyId: "k4QSacC44XzE4Ex5fCrdrw8tTtZXQv1IvaNrbcDPxd9R",
  serviceInstanceId: "cos-dev-sun-serviceid",
};

const cos = new ibm.S3(config);

function doCreateObject(filename, file) {
  console.log("=== Creating object ===");
  return cos
    .putObject({
      Bucket: "sun-bucket",
      Key: filename,
      Body: file,
    })
    .promise();
}

async function getDataFromTable(params) {
  const pool = new Pool(params.credentials);
  try {
    const resp = await pool.query(params.query);
    console.log("QUERY ==> ", params.query);
    console.log("=== CONNECTED to database ===");

    const data = resp.rows;
    const worksheet = XLSX.utils.json_to_sheet(data);
    const csv = XLSX.utils.sheet_to_csv(worksheet);

    const cos = await doCreateObject(
      `file_name_${new Date().toISOString()}.csv`,
      csv
    );
    console.log("=== COS ===");
    return { response: "Data extracted successfully" };
  } catch (err) {
    console.log("ERROR ==> ", err);
    return { response: "Error while extracting data", error: err };
  } finally {
    await pool.end();
  }
}

function main(params) {
  return getDataFromTable(params);
}
exports.main = main;
