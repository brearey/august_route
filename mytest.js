require('dotenv').config()
const axios = require('axios');
const path = require('path')
const { v4 } = require('uuid')

const certsPath = path.resolve(__dirname, './russiantrustedca.pem')
process.env.NODE_EXTRA_CA_CERTS = certsPath
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const qs = require('qs')
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

// Entry point
axios(config)
  .then((response) => {
    console.log(response.data)
    // getModelsList(response.data['access_token'])
    // getTokensCount(response.data['access_token'], 'Привет, как дела?')
    requestToGigachat(response.data['access_token'], 'Привет. Вот список названий мероприятий ежегодного августовского совещания работников образования с общей темой “Развитие единой системы образования”: 01 Региональная стратегическая сессия «Навигация детства в Год семьи в России: приоритеты, направления и технологии деятельности»; 02 Семинар для руководителей муниципальных опорных центров по реализации Целевой модели развития региональной системы дополнительного образования; 03 Методический семинар-практикум "Опыт реализации программы социальной активности обучающихся начальной школы "Орлята России". Если я учитель начальных классов - какое мероприятие мне посетить? Напиши номер мероприятия.')
  })
  .catch((error) => {
    console.log(error)
  });

function getModelsList(accessToken) {
  if (accessToken) {
    axios({
      method: 'get',
      url: 'https://gigachat.devices.sberbank.ru/api/v1/models',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
    })
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      });
  }
}

function getTokensCount(accessToken, input) {
  if (accessToken) {
    axios({
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://gigachat.devices.sberbank.ru/api/v1/tokens/count',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
      data: JSON.stringify({
        "model": "GigaChat",
        "input": input
      })
    })
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      });
  }
}

function requestToGigachat(accessToken, message) {
  if (accessToken) {
    axios({
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://gigachat.devices.sberbank.ru/api/v1/chat/completions',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
      data: JSON.stringify({
        "model": "GigaChat",
        "messages": [
          {
            "role": "user",
            "content": message
          }
        ],
        "n": 1,
        "stream": false,
        "update_interval": 0
      })
    })
      .then((response) => {
        console.log(response.data.choices[0].message)
      })
      .catch((error) => {
        console.log(error)
      });
  }
}
