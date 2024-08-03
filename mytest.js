require('dotenv').config()
const axios = require('axios');
const path = require('path')
const { v4 } = require('uuid')

const certsPath = path.resolve(__dirname, './russiantrustedca.pem')
process.env.NODE_EXTRA_CA_CERTS = certsPath
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const qs = require('qs');
let data = qs.stringify({
  'scope': 'GIGACHAT_API_PERS'
});
let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://ngw.devices.sberbank.ru:9443/api/v2/oauth',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json',
    'RqUID': v4(),
    'Authorization': 'Basic ' + process.env.GIGACHAT_AUTH_DATA
  },
  data: data
};

axios(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });