## Guidelines for running tutorial 5

#### pre-installed environment needed:

- ubuntu: docker pull ubuntu

- mongodb: refer to this link https://docs.microsoft.com/en-us/windows/wsl/tutorials/wsl-database

- git: apt install git

- screen: apt install screen

- open port 3000 and port 8000 for use

#### test and initialize the mongodb

cd api

sudo service mongodb start

mongo issuetracker --eval "db.customers.remove({})"

node scripts/trymongo.js

mongo issuetracker scripts/init.mongo.js

cd ..
#### run the back-end api

cd api

screen npm start

`CtrlA + d`  

cd ..

#### run the front-end ui

cd ui

screen npm start

`CtrlA + d`  

#### view the app from browser

open **`localhost:8000`** in your browser and you can play with the app