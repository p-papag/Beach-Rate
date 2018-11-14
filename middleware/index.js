//all the middleware goes here
var middlewareObj = {};
var Beach = require("../models/beach.js");
var Comment = require("../models/comment.js");


middlewareObj.checkBeachOwnership = function (req, res, next) { 
    if(req.isAuthenticated()){
        Beach.findById(req.params.id, function(err, foundBeach){
         if(err || !foundBeach) {
                req.flash("error","Beach not found!");
                res.redirect("back");
            } else {
                //does user own the beach?
                if(foundBeach.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that!");
                    res.redirect("back");
                }
                
            } 
    });
    } else {
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function (req, res, next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
         if(err) {
            res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error","You don't have permission to do that!");
                    res.redirect("back");
                }
                
            } 
    });
    } else {
        req.flash("error","You need to be logged in!");
        res.redirect("back");
    }
}


middlewareObj.isLoggedIn = function (req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please login first!")
    res.redirect("/login");
}

module.exports = middlewareObj;