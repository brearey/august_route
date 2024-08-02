const request = require('request');
let options = {
  'method': 'POST',
  'url': 'https://ngw.devices.sberbank.ru:9443/api/v2/oauth',
  'headers': {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json',
    'Authorization': ''
  }
};
request(options, (error, response) => {
  if (error) throw new Error(error);
  console.log(response.body);
});