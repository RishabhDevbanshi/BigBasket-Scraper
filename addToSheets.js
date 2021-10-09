const { google } = require("googleapis");
// const creds = require('./client_secret.json');

const authentication = async () => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: "client_secret.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    const client = await auth.getClient();

    const sheets = google.sheets({
      version: "v4",
      auth: client,
    });

    return { sheets };
  } catch (err) {
    console.log(err.message);
  }
};

const id = "1WU_n_up8DpO_SwttQJ1looSC_YploY7lmPzcfYPvJbo";

const getSheets = async () => {
  try {
    const { sheets } = await authentication();

    // console.log(sheets);

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: id,
      range: "Sheet1",
    });

    console.log(response.data);
  } catch (err) {
    console.log(err.message);
  }
};

const writeSheets = async (productInfo) => {
  try {
    const { sheets } = await authentication();

    // console.log(sheets);

    const writeReq = await sheets.spreadsheets.values.append({
      spreadsheetId: id,
      range: "Sheet1",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [
          [
            productInfo[0],
            productInfo[1],
            productInfo[2],
            productInfo[3],
            productInfo[4],
            productInfo[5],
            productInfo[6],
            productInfo[7],
            productInfo[8],
            productInfo[9],
            productInfo[11],
            productInfo[10],
          ],
        ],
      },
    });

    if (writeReq.status === 200) console.log("Operation Successful");
    else console.log("Whoops !");
  } catch (err) {
    console.log(err.message);
  }
};

// writeSheets();
// getSheets();

module.exports = writeSheets;
