var express = require("express");
var router  = express.Router();
var Beach = require("../models/beach");
var middleware = require("../middleware");

//INDEX - show all beaches
router.get("/", function(req, res){
    var perPage = 8;
    var pageQuery = parseInt(req.query.page);
    var pageNumber = pageQuery ? pageQuery : 1;
    Beach.find({}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allBeaches) {
        Beach.count().exec(function (err, count) {
            if (err) {
                console.log(err);
            } else {
                res.render("beaches/index", {
                    beaches: allBeaches,
                    current: pageNumber,
                    pages: Math.ceil(count / perPage)
                });
            }
        });
    });
});

//CREATE - add new beach to DB
router.post("/",middleware.isLoggedIn, function(req, res){
    // get data from form and add to beaches array
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var desc = req.body.description;
    var newBeach = {name: name,price: price, image: image, description: desc, author:author}
    
    // Create a new beach and save to DB
    Beach.create(newBeach, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to beaches page
            res.redirect("/beaches");
        }
    });
});

//NEW - show form to create new beach
router.get("/new",middleware.isLoggedIn, function(req, res){
   res.render("beaches/new"); 
});

// SHOW - shows more info about one beach
router.get("/:id", function(req, res){
    //find the beach with provided ID
    Beach.findById(req.params.id).populate("comments").exec(function(err, foundBeach){
        if(err || !foundBeach){
            req.flash("error", "Beach not found!");
            res.redirect("back");
        } else {
            console.log(foundBeach)
            //render show template with that beach
            res.render("beaches/show", {beach: foundBeach});
        }
    });
});

//EDIT BEACH ROUTE
router.get("/:id/edit",middleware.checkBeachOwnership, function(req, res) {
    Beach.findById(req.params.id, function(err, foundBeach){
    res.render("beaches/edit", {beach: foundBeach});
         
    });
});

//UPDATE BEACH ROUTE
router.put("/:id",middleware.checkBeachOwnership, function (req, res){
    //find and update the correct beach
    
    Beach.findByIdAndUpdate(req.params.id, req.body.beach, function(err, updatedBeach){
        if(err){
            res.redirect("/beaches");
            } else {
            res.redirect("/beaches/" + req.params.id);
        }
    });
    //redirect to the show page
});


//DESTROY BEACH ROUTE
router.delete("/:id",middleware.checkBeachOwnership, function(req, res){
    Beach.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            res.redirect("/beaches");
        } else
        res.redirect("/beaches");
    });
});

module.exports = router;

