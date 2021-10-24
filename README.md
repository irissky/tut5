# Tutorial 5: Hotel California International Waitlist System

<p align="right">HU YUE(A0224726E)</p>

## Environment needed
#### docker environment needed:

- ubuntu: docker pull ubuntu

- mongodb: refer to professor's guidelines on Teams to install mongodb.
    ```
    apt install gnupg
    apt install curl

    curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add -

    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list 
    apt update
    apt install mongodb-org
    apt install screen
    screen mongod [Press Ctrl+a followed by d to return to terminal]
    ```
    If mongod screen exits instantly, then you have a problem. Do the following: mkdir -p /data/db

- git: apt install git

- screen: apt install screen

- open port 3000 and port 5000 for use

#### install the dependencies
```
cd api
npm install
cd ../ui
npm install
cd ..
```
## Commands for running tutorial 5
#### start the mongodb
```
screen mongod
```
- Press Ctrl+a followed by d to return to terminal
#### test the mongodb with CRUD operations [in folder `api`]
```
cd api
node scripts/trymongo.js
```
#### initialize the database and run the back-end api [in folder `api`]
```
mongo issuetracker scripts/init.mongo.js
screen npm start
```
- Press Ctrl+a followed by d to return to terminal
#### run the front-end ui [in folder `ui`]
```
cd ../ui
screen npm start
```
- Press Ctrl+a followed by d to return to terminal   
#### view the app from browser
- open **`localhost:3000`** in your browser and you can play with the app
  
ps: You'd better to follow all the steps above to make sure the app run correctly!