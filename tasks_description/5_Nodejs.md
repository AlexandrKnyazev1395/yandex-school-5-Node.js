# Задание №5 - Node.js.

## 1. Создание express-приложения

Подключены два линтера - один для js - eslint, другой для css - strylelint.

Для создания приложения использовался [генератор express-приложений](./client/README.md) https://expressjs.com/en/starter/generator.html.

Созданное базовое приложение было переписано под требования eslint, также добавлена возможность запуска в режиме разработки, используя webpack-dev-middleware.

## 2. Работа над приложением my-git

Приложение работает на основе rest-запросов. Есть несколько роутов, которые отдают пользователю различные страницы ([cliTools/git](../routes) :
  - / - пользователю отдается список веток
  - /commits?:branch='someBranch' -пользователю отдается список комитов ветки.
  - /sources/:branch?commit='somehash'?path='somepath' - пользователю отдается список файлов и попак в ветке/комите по определенному пути.
  - /file/:destination?path='somepath' -пользователю отдается содержимое файла по указанному пути.

Из роутов вызываются функции из [cliTools/git](../cliTools/git)   для работы с git с помощью модуля child-process.


## 3. Запуск. 

Запуск в окружении операционной системы осуществляется по команде npm start. Для успешной работы приложения в таком случае в файле [config.js](../config.js) нужно указать абсолютный путь относительно операционной системы (например `/home/alex/repo`) к папке, в которой содержится какой-либо git-репозиторий. Также можно оставить пустую строку, тогда будет запущен анализ репозитория данного приложения.

Запуск с помощью docker-контейнера требует указания в config.js строки `` В Dockerfile указано, с какой ссылки будет клонирован репозиторий, который будет разворачиваться в корневую папку приложения (по умолчанию работает развертка репозитория данного приожения). 

### todo: Нужно добавить в парсер коммитов дату и получать возможность изменятьеее формат
