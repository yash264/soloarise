const express=require('express')
const DB=require('./db')
const cors = require("cors");

const app=express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

const corsOptions ={
    origin: "https://soloarise-meta.vercel.app",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
}; 

app.use(cors(corsOptions));

const port = process.env.port || 4000;
const server = app.listen(port,()=>{
    console.log("App started on PORT 4000");
})

DB();

const authRouter = require('./Routes/authRoute');
const questRouter = require('./Routes/questRoute');
const userRouter = require('./Routes/userRoute');

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/quest', questRouter);

app.get('/healthcheck', (req, res) => {
    console.log('I am alive!!!');
    res.status(200).send('Backend is alive!!!');
});

// to start the server for production
app.get('/startServer', (req, res) => {
    res.status(200).send("Started the Server");
});


