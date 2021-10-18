## Guidelines for running tutorial 5
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
