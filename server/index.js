require('dotenv').config();
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const adminRouter = require('./routers/adminRouter')
const managerRouter = require('./routers/managerRouter')
const responsablRouter = require('./routers/responsablRouter')
const chauffeurRouter = require('./routers/chauffeurRouter')
const Provider = require('./routers/providerRoute')
const cookieParser = require('cookie-parser')
const logger = require('./logger/logger')
const cors = require('cors')


app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT']
}));

// set up server
app.listen(process.env.APP_PORT, () => logger.info(`started on port ', ${process.env.APP_PORT}`));

app.use(express.json())
app.use(cookieParser())

// connect mongoose
mongoose.connect(process.env.MDB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) return console.error(err)
        console.log('connected to mongoose')
    });

app.use('/admin', adminRouter)
app.use('/manager', managerRouter)
app.use('/responsable', responsablRouter)
app.use('/chauffeur', chauffeurRouter)
app.use('/loggedin', Provider)