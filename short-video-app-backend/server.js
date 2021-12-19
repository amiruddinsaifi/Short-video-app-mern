import express from 'express'
import mongoose from 'mongoose'
import Videos from './dbModel.js'
import Cors from 'cors'
//App Config
const app = express()
const port = process.env.PORT || 9000
const connection_url = "mongodb+srv://aamirsaifi017:@Mongodb017@cluster0.ju4up.mongodb.net/shortvideoappmern?retryWrites=true&w=majority"
//Middleware
app.use(express.json())
app.use(Cors())
//DB Config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
//API Endpoints
app.get("/", (req, res) => res.status(200).send("Hello TheWebDev"))
app.post('/v2/posts', (req, res) => {
    const dbVideos = req.body
    Videos.create(dbVideos, (err, data) => {
        if(err)
            res.status(500).send(err)
        else
            res.status(201).send(data)
    })
})
app.get('/v2/posts', (req, res) => {
    Videos.find((err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})
//Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`))