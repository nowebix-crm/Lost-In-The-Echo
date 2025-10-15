# Lost in the Echo - Docker Setup

## Быстрый старт

### Разработка
```bash
# Запуск только базы данных для разработки
npm run docker:dev

# Установка зависимостей и запуск приложения локально
npm install
npm run dev
```

### Продакшн
```bash
# Сборка и запуск всего стека
npm run docker:prod

# Просмотр логов
npm run docker:logs

# Остановка
npm run docker:prod:down
```

## Структура Docker

### Сервисы:
- **postgres**: PostgreSQL 15 база данных
- **app**: Node.js приложение
- **migrate**: Автоматические миграции
- **redis**: Redis для кеширования (только dev)

### Порты:
- **3001**: Приложение
- **5432**: PostgreSQL (prod)
- **5433**: PostgreSQL (dev)
- **6379**: Redis (dev)

### Переменные окружения:
- `DB_NAME`: Имя базы данных
- `DB_USER`: Пользователь БД
- `DB_PASSWORD`: Пароль БД
- `DB_HOST`: Хост БД
- `DB_PORT`: Порт БД

## Команды

```bash
# Сборка образа
npm run docker:build

# Запуск контейнера
npm run docker:run

# Разработка (только БД)
npm run docker:dev

# Продакшн (полный стек)
npm run docker:prod

# Логи
npm run docker:logs

# Остановка
npm run docker:dev:down    # dev
npm run docker:prod:down   # prod
```

## Миграции

Миграции запускаются автоматически при старте продакшн контейнера.

Для ручного запуска:
```bash
# Внутри контейнера
docker exec -it lost-in-the-echo-app npm run migrate:up
```
