const serverPort = 3000;
const adminCreds = {
  email: "abebe@gmail.com",
  password: "1234",
};

const disableSS = true;

const siteAppPathv2 = "../../tesfa-webapp";
const siteAppPathv3 = "../../tesfa-webapp-v3";
const siteAdminPath = "../../tesfa-admin";
const receiptsPath = "../../tesfa-receipts";
const siteLandingPath = "../../tesfa-landing";
const videosPath = "../../tesfa-videos/";

const siteAppRoutev2 = "/shIpg42OJ2";
const siteAppRoutev3 = "/shIpg42OJ5";
const siteAdminRoute = "/lu4f2zI5pu";

// const mongoString = 'mongodb://127.0.0.1:27017/'
// const mongoString = 'mongodb+srv://tesfa-travel-admin1:jRt3h24150P8mN6Q@private-db-mongodb-nyc3-06784-bd006b0f.mongo.ondigitalocean.com/tesfa-travel1'

const mongoString =
  "mongodb+srv://euellemma:iq2iDgX5CEE6M1CN@serverlessinstance0.gteimzt.mongodb.net/";
// const mongoString = 'mongodb://tesfa-travel-admin:theTesfacome*1@localhost:27017/tesfa-travel'
// const mongoString = 'mongodb+srv://tesfa-travel-admin1:jRt3h24150P8mN6Q@private-db-mongodb-nyc3-06784-bd006b0f.mongo.ondigitalocean.com/tesfa-travel1?tls=true&authSource=admin&replicaSet=db-mongodb-nyc3-06784'

// mongodb+srv://<username>:<password>@<your-cluster-url>/sample_airbnb?retryWrites=true&w=majority
//
// username = tesfa-travel-admin1
// password = <replace-with-your-password>
// host = mongodb+srv://private-db-mongodb-nyc3-06784-bd006b0f.mongo.ondigitalocean.com
// database = tesfa-travel1

module.exports = {
  adminCreds,
  mongoString,
  siteAppPathv2,
  siteAppPathv3,
  siteAdminPath,
  videosPath,
  receiptsPath,
  siteAppRoutev2,
  siteAppRoutev3,
  siteAdminRoute,
  siteLandingPath,
  disableSS,
  serverPort,
};
