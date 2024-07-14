# Веб приложение Январского и Августовского совещаний

_Заказчик: ИРОиПК_

_Сроки: 13.07.2024 - 01.08.2024_

### Структура базы данных TODO: будем менять

### ENV

```bash
SESSION_SECRET=brearey
PORT=80
DATABASE_URL=postgres://user:pass@postgres:35432/db
```

# RUN APP

1. `docker-compose up`
2. in app container run migrations: `npm run migrate up`
3. use: `http://localhost`
