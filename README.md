# Веб приложение Январского и Августовского совещаний

_Заказчик: ИРОиПК_

_Сроки: 13.07.2024 - 01.08.2024_

### Структура базы данных TODO: будем менять

### ENV

```bash
NODE_ENV=development
SESSION_SECRET=YOUR_SECRET
PORT=80
DATABASE_URL=postgres://YOUR_LOGIN:YOUR_PASSWORD@postgres:35432/YOUR_DB_NAME
POSTGRES_USER=YOUR_LOGIN
POSTGRES_PASSWORD=YOUR_PASSWORD
POSTGRES_DB=YOUR_DB_NAME
```

# Public folder

Create the /public folder on root directory and paste there bootstrap css and js files.

# RUN APP

1. `docker-compose up`
2. in app container run migrations: `npm run migrate up`
3. use: `http://localhost`
