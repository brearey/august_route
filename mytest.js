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
    const messages = [
      {
        "role": "system",
        "content": `
          Вот список названий и времен (ЧЧ.ММ-ЧЧ.ММ, начало и конец) мероприятий ежегодного августовского совещания работников образования с общей темой “Развитие единой системы образования”:
          1 09.00-10.00 Региональная стратегическая сессия «Навигация детства в Год семьи в России: приоритеты, направления и технологии деятельности»;
          2 10.00-11.00 Интерактивная сессия «Методическая команда Вилюйского макрорегиона»;
          3 11.00-12.00 Мастер-класс по развитию и сохранению родных языков в условиях коррекционной школы-интерната (на примере инклюзивного проекта фольклорных ансамблей "Тигинэт" и "Алаас") .
          4 09.00-10.00 Семинар "Разработка рабочих программ в соответствии с ФАОП и обновленных ФГОС."
          5 10.00-11.00 Семинар для руководителей муниципальных опорных центров по реализации Целевой модели развития региональной системы дополнительного образования;
          6 11.00-12.00 Методический семинар-практикум "Опыт реализации программы социальной активности обучающихся начальной школы "Орлята России".
          `
      },
      {
        "role": "user",
        "content": `Если я директор сельской школы - какие мероприятия мне посетить? Напиши только номера мероприятий через запятую, которые лучше подходят мне. Учитывай время мероприятия. Например если в 09.00-10.00 мероприятие 1, а в 09.00-10.00 мероприятие 2, то я смогу посетить только одно. Если не уверен подходит ли мероприятие, то лучше его выбрать.`
      }
    ]
    // getModelsList(response.data['access_token'])
    // getTokensCount(response.data['access_token'], message)
    requestToGigachat(response.data['access_token'], messages)
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

function requestToGigachat(accessToken, messages) {
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
        "messages": messages,
        "n": 1,
        "top_p": 0.1,
        "stream": false,
        "update_interval": 0
      })
    })
      .then((response) => {
        console.log('Usage tokens: ' + response.data.usage.total_tokens)
        console.log(response.data.choices[0].message)
      })
      .catch((error) => {
        console.log(error)
      });
  }
}
