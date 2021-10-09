A scraper for website BigBasket made using Node.js Puppeteer Library.
It fetches data from BigBasket and stores it in a google spreadsheet using Sheets API.

## Sample SpreadSheet

https://docs.google.com/spreadsheets/d/1WU_n_up8DpO_SwttQJ1looSC_YploY7lmPzcfYPvJbo/edit#gid=0
## To run on local machine

1. Clone the repo using `git clone`
2. Run `npm install` to install all the dependencies
3. Make a <strong>client_secret.json</strong> file in root folder with your credentials.
4. Change the Spreadsheet ID in index.js file.
4. Run `node index.js` to start the script

# IMPORTANT
 1. DO make a file named cient_secret.json in root with your credentials before running this script.

 2. Make sure to give editor access to you service email before running the script.
