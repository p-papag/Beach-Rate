var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    flash       = require("connect-flash"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Beach  = require("./models/beach"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    //seed the database
    seedDB      = require("./seeds")
    
//requring routes
var commentRoutes    = require("./routes/comments"),
    beachRoutes = require("./routes/beaches"),
    indexRoutes      = require("./routes/index")
    
//mongodb://localhost/yelp_camp_v6 local database
//mongodb://<dbuser>:<dbpassword>@ds159187.mlab.com:59187/project_z  using the mongolab online database
var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp_v6";
mongoose.connect(url);

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB(); seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "This beach is awesome dude!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/", indexRoutes);
app.use("/beaches", beachRoutes);
app.use("/beaches/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The BeachRate Server Has Started!");
});