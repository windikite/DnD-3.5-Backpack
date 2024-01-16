//imports
const express = require(`express`);
const logger = require(`morgan`);
const app = express();
const path = require(`path`);
const connectToMongoDB = require(`./db/mongodb`);
const methodOverride = require(`method-override`);

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

//routing
const viewRouter = require(`./routes/client/viewRouter`);
app.use(`/`, viewRouter);
const itemRouter = require(`./routes/api/itemRouter`);
app.use(`/api/items`, itemRouter);
const shopRouter = require(`./routes/api/shopRouter`);
app.use(`/api/shops`, shopRouter);

//server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
    connectToMongoDB();
})