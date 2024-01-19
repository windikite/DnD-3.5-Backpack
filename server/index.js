//imports
const express = require(`express`);
const logger = require(`morgan`);
const app = express();
const path = require(`path`);
const connectToMongoDB = require(`./db/mongodb`);
const methodOverride = require(`method-override`);

//login session modules
require(`dotenv`).config();
const cookieParser = require(`cookie-parser`);
const sessions = require(`express-session`);

//middleware
//set the view engine to ejs
app.set(`view engine`, `ejs`);
//set theview engine to look at the views folder
app.set(`views`, path.join(__dirname, `views`));
//use the public folder to read static files like CSS
app.use(express.static(path.join(__dirname, `public`)));
//read incoming requests
app.use(express.urlencoded({extended: false}));
app.use(express.json());
//use html methods with back-end methods smoothly
app.use(methodOverride(`_method`));

//cookie parser middleware
app.use(cookieParser(process.env.COOKIE_SECRET));

//login session
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: process.env.COOKIE_SECRET,
    saveUninitialized: false,
    cookie: { maxAge: oneDay},
    resave: false
}))
app.use(function(req, res, next){
    res.locals.user = req.session.user;
    res.locals.isAuth = req.session.isAuth;
    next();
});

//routing
const viewRouter = require(`./routes/client/viewRouter`);
app.use(`/`, viewRouter);
const itemRouter = require(`./routes/api/itemRouter`);
app.use(`/api/items`, itemRouter);
const shopRouter = require(`./routes/api/shopRouter`);
app.use(`/api/shops`, shopRouter);
const userRouter = require(`./routes/api/userRouter`);
app.use(`/api/users`, userRouter);
const characterRouter = require(`./routes/api/characterRouter`);
app.use(`/api/characters`, characterRouter);

//server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
    connectToMongoDB();
})