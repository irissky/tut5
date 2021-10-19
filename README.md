# Tutorial 5: Hotel California International Waitlist System

<p align="right">HU YUE(A0224726E)</p>

## Environement needed
#### docker environment needed:

- ubuntu: docker pull ubuntu

- mongodb: refer to this link https://docs.microsoft.com/en-us/windows/wsl/tutorials/wsl-database

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
sudo service mongodb start
```
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
- press `CtrlA + d` to switch back to the console  
#### run the front-end ui [in folder `ui`]
```
cd ../ui
screen npm start
```
- press `CtrlA + d` to switch back to the console   
#### view the app from browser
- open **`localhost:3000`** in your browser and you can play with the app
  
ps: You'd better to follow all the steps above to make sure the app run correctly!