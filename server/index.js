// require('dotenv').config()
// const express = require('express')
// const cors = require('cors')
// const cookieParser = require('cookie-parser')
// const authRouter = require('./routes/authRoutes')
// const connectDb = require('./config/db')
// const cartRouter = require('./routes/cartRoutes')
// const app = express()
// const port = 3000




// connectDb()

// app.use(express.json())
// app.use(cors({
//     origin:process.env.ORIGIN,
//     credentials:true
// }))
// app.use(cookieParser())

// app.use("/api/auth",authRouter)
// app.use("/api/cart",cartRouter)



// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`)
// })

// backend/index.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRoutes');
const cartRouter = require('./routes/cartRoutes');
const connectDb = require('./config/db');

const app = express();
const port = 3000;

connectDb();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: process.env.ORIGIN,
  credentials: true
}));

app.use("/api/auth", authRouter);
app.use("/api/cart", cartRouter);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});
