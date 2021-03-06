# RS Tasktracker

RS Tasktracker - это приложение для организации задач и управления проектами небольших групп.

1. Deploy: https://rsclone-rstasktracker.netlify.app/
3. Back-end repo: https://github.com/johnneon/rsclone-backend
4. Review: https://youtu.be/GeYg37AtWUc

##  Установка
### Клиентская часть
```
$ gh repo clone johnneon/rsclone
```

Далее в папке прокта нужно установить все зависимости
```
$ npm install
```
Для запуска приложения локально используется команда
```
$ npm run start
```
Что бы запустить сборку приложения используется команда
```
$ npm run build
```

### Серверная часть
Для корректной работы приложения так же необходимо установить серверную часть приложения
```
$ gh repo clone johnneon/rsclone-backend
```
Далее в папке прокта нужно установить все зависимости
```
$ npm install
```
Далее для запуска сервера нужно создать базу данных. В приложении используется MongoDB.
База данных подключается не локально. Для ее использования нужно зарегистрироваться на оффициальном сайте 
[MongoDB](https://account.mongodb.com/account/register?signedOut=true).
<br>
[Краткий гайд по созданию базы данных на MongoDB Atlas](https://jinv.ru/MongoDB-and-Mongoose/sozdanie-bazy-dannyh-v-oblachnom-servise-mongodb-atlas/)
<br>
После создания базы, вы получите URI, который выгляжит примерно так:
```
mongodb+srv://asdasd:<password>@cluster0.aecr0.mongodb.net/<dbname>?retryWrites=true&w=majority
```
Вместо `<password>` и `<dbname>`, подставляется пароль и имя от базы. Далее в файлах `.env` и `app.ts` подставляете свою ссылку.
<br>
Для запуска сервера локально используется команда
```
$ npm run dev
```
Что бы запустить сборку приложения используется команда
```
$ npm run build
```

В случае если клиентская и серверная части запускаются локально одновременно, следует заменить порт на серверной части.
В файлах `.env` и `bin/www.ts` поменять порт с 3000 на 8080. А так же в клиентской части заменить URL запросов на `http://localhost:8080`.
