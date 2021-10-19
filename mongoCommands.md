# MongoDB shell commands

This is a list of all the mongo shell commands used in the book. It includes
commands used to try out things or change things manually.

## Chapter 6: MongoDB

### MongoDB Basics

```
show databases
db
show collections
use issuetracker
show collections

db.customers.insertOne({ id: 1, name: 'John Wilson', phone: '12345678', time: new Date("Sep 20,2021 9:35:12").toISOString()})
db.customers.find()
db.customers.find().pretty()

db.customers.insertOne({id: 2, name: 'Edward Adam Davis', phone: '32345678', time: new Date("Sep 20,2021 12:44:33").toISOString()})

let result = db.customers.find().toArray()
result.forEach((e) => printjson(e.name))
```

### MongoDB CRUD Operations
```
db.customers.insertOne({
    id: 3, 
    name: 'Clarie Bono', 
    phone: '65234256', 
    time: new Date("Sep 20,2021 17:56:04").toISOString()
})

db.customers.drop()

db.customers.insertOne({
  id: 1,
  name: { first: 'John', last: 'Doe' },
  phone: 48563265
})

db.customers.insertOne({
  id: 2,
  name: { first: 'Jane', last: 'Doe'} ,
  phone: 16879965
})

db.customers.insertMany([
  { id: 3, name: { first: 'Alice', last: 'A' }, phone: 32895655 },
  { id: 4, name: { first: 'Bob', last: 'B' }, phone: 64778899 },
])

db.customers.findOne({ id: 1 })
db.customers.find({ 'name.last': 'Doe'  })

db.customers.createIndex({ phone: 1 })
db.customers.createIndex({ id: 1 }, { unique: true })

db.customers.find({}, { 'name.first': 1, phone: 1 })
db.customers.find({}, { _id: 0, 'name.first': 1, phone: 1 })

db.customers.updateOne({ id: 2 }, { $set: {phone: 23789996 } })
db.customers.find()

db.customers.updateMany({}, { $set: { organization: 'MyCompany' } })

db.customers.replaceOne({ id: 4 }, {
  id: 4,
  name : { first : "Bobby" },
  phone : 66145556
});

db.customers.find({ id: 4 })

db.customers.deleteOne({ id: 4 })
db.customers.count()



db.customers.insertOne({
  id: 4,
  name: { first: 'Bob', last: 'B' },
  phone: 64565665,
  organization: 'OtherCompany'
})

db.customers.find()

```

