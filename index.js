const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const userRoute = require('./routes/users');
const categoryRoute = require('./routes/categories');
const cookieParser = require('cookie-parser');

//middlewares
app.use(cookieParser())
app.use(express.json());
dotenv.config();

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log("connected to mongodb"))
    .catch((err) => console.log(err));


app.use("/auth", authRoute);
app.use("/post", postRoute);
app.use("/user", userRoute);
app.use("/categories", categoryRoute);

app.listen(process.env.PORT || 5000, () => {
    console.log('Server running on port 5000');
});