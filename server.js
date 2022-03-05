const express = require("express")
const mongoose = require("mongoose")

const userModel = require("./user.model")
const promise = require("express/lib/application");
const app = express()

mongoose.connect("mongodb://localhost/node-pagination", {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on("error" , (error) => console.log("errr", error))
db.once("open", async () => {
   if (await userModel.countDocuments().exec() > 0) return
    promise.all([
        userModel. create({ name: 'User 1' }),
        userModel. create({ name: 'User 2' }),
        userModel. create({ name: 'User 3' }),
        userModel. create({ name: 'User 4' }),
        userModel. create({ name: 'User 5' }),
        userModel. create({ name: 'User 6' }),
        userModel. create({ name: 'User 7' }),
        userModel. create({ name: 'User 6' }),
        userModel. create({ name: 'User 8' }),
        userModel. create({ name: 'User 9' }),
        userModel. create({ name: 'User 10' }),
        userModel. create({ name: 'User 11' }),
        userModel. create({ name: 'User 12' }),
        userModel. create({ name: 'User 13' }),
    ]).then(() => console.log("Added user"))
})

const users = [
    {id: 1, name: "user 1"},
    {id: 2, name: "user 2"},
    {id: 3, name: "user 3"},
    {id: 4, name: "user 4"},
    {id: 5, name: "user 5"},
    {id: 6, name: "user 6"},
    {id: 7, name: "user 7"},
    {id: 8, name: "user 8"},
    {id: 9, name: "user 9"},
    {id: 10, name: "user 10"},
    {id: 11, name: "user 11"},
    {id: 12, name: "user 12"},
    {id: 13, name: "user 13"},
]

app.get("/users", getPaginationData(userModel), (req, res) => {
    res.json(res.paginationResults)
})

function getPaginationData(model) {
    console.log("model ", model)
    return async (req, res, next) => {
        const results = {}
        const page = +req.query.page
        const limit = +req.query.limit

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        // if (endIndex < model.length) {
        if (endIndex < await model.countDocuments().exec()) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }

        // results.users = model.slice(startIndex, endIndex)
        try {
            results.results = await model.find().limit(limit).skip(startIndex).exec()
            res.paginationResults = results
            next()
        } catch (err) {
            res.status(500).json({ message: err.message })
        }

        // res.paginationResults = results
        // next()
    }

}

app.listen(8001, () => {
    console.log("server running on ")
})

