# Tutorial 5: Hotel California International Waitlist System

<p align="right">HU YUE(A0224726E)</p>

## Environment needed
### docker environment needed:

- **ubuntu**: `docker pull ubuntu`:

- **run the container with port 3000 and port 5000 open for use**
    ```
    docker run -p 3000:3000 -p 5000:5000 -dit ubuntu
    ```

- **install nvm and npm**:
    ```
    apt update
    apt install curl
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash 
    ```
    - restart the container and do the following
    ```
    nvm install 10
    npm install -g npm@6
    ```
- **mongodb**: refer to the following commands to install mongodb.
    ```
    apt install gnupg
    apt install curl

    curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add -

    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list 
    apt update
    apt install mongodb-org
    apt install screen
    screen mongod
    ```
    - If mongod screen exits instantly, then you have a problem. Do the following: `mkdir -p /data/db`, redo the `screen mongod` and **press Ctrl+a followed by d to return to terminal**. You are ready to run mongo CLI using $mongo.

- **git**: install git and clone my tutorial
    ```
    apt install git
    git clone https://github.com/irissky/tut5.git 
    ```

## Commands for running tutorial 5
### install the dependencies
```
cd api
npm install
cd ../ui
npm install
cd ..
```
### start the mongodb
```
screen mongod
```
- Press Ctrl+a followed by d to return to terminal
- ps: if you have already started it when installing, you do not need to start it again here. You can test with `mongo` to see whether you have started mongo already.
### test the mongodb with CRUD operations [in folder "api"]
```
cd api
node scripts/trymongo.js
```
### initialize the database and run the back-end api [in folder "api"]
```
mongo issuetracker scripts/init.mongo.js
screen npm start
```
- Press Ctrl+a followed by d to return to terminal
### run the front-end ui [in folder "ui"]
```
cd ../ui
screen npm start
```
- Press Ctrl+a followed by d to return to terminal   
### view the app from browser
- open **`localhost:3000`** in your browser and you can play with the app
  
ps: You'd better to follow all the steps above to make sure the app run correctly!
