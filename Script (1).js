use mini
db.createCollection("employee")
db.employee.insertOne({name:"madan",id:1,address:"mysore"})
db.employee.find({})
db.employee.insertMany([{name:"bullet",id:2,address:"mandya"},{name:"prakash",id:3,address:"hasan"}])
db.employee.updateOne({name:"bullet"},{$set:{id:3}})
db.employee.updateMany({id:3},{$set:{address:"kote"}})
db.employee.deleteOne({id:2})
db.employee.deleteMany({id:3})