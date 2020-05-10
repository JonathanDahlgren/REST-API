const express = require('express');
const app = express()

app.use(express.json());

let idIndex = 3

const users = [
    {
      "id": 1,
      "firstname": "Jonathan",
      "lastname": "Dahlgren",
      "age": 26      
    },
    {
      "id": 2,
      "firstname": "Fredrik",
      "lastname": "Thelin",
      "age": 38      
    },
    {
      "id": 3,
      "firstname": "Simon",
      "lastname": "Beijer",
      "age": 29      
    }
]

//GET
app.get('/api/users', (req, res) => {
    if (!users) res.status(404).send("Can not find data")
    res.send(users)
})

//POST
app.post("/api/users", (req, res) => {    
    const user = {
        id: ++idIndex,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age
    }
    users.push(user)
    res.send(user)
})

//PUT
app.put("/api/users/:id", (req, res) => {

    const user = users.find((user) => user.id === parseInt(req.params.id))
    if (!user) {
        res.status(404).send("Can not find user")
    } else {
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.age = req.body.age;
        res.send(user)
    }   
})

//DELETE
app.delete("/api/users/:id", (req, res) => {
    const user = users.find((user) => user.id === parseInt(req.params.id))
    if (!user) res.status(404).send("Can not find user")
    const index = users.indexOf(user)

    users.splice(index, 1)

    res.send(user)
})
//"node-dev server.js" to start
app.listen(3000, () => console.log("Server is running"))