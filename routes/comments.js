var express = require("express");
var router  = express.Router({mergeParams: true});
var Beach = require("../models/beach");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//COMMENT NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    // find beach by id
    console.log(req.params.id);
    Beach.findById(req.params.id, function(err, beach){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {beach: beach});
        }
    })
});

//COMMENT CREATE
router.post("/",middleware.isLoggedIn,function(req, res){
   //lookup beach using ID
   Beach.findById(req.params.id, function(err, beach){
       if(err){
           console.log(err);
           res.redirect("/beaches");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               req.flash("error","Something went wrong!")
               console.log(err);
           } else {
               //add username and id to comments
               comment.author.id = req.user.id;
               comment.author.username = req.user.username;
               //save comments
               comment.save();
               beach.comments.push(comment);
               beach.save();
               req.flash("success","Succesfully created comment!");
               res.redirect('/beaches/' + beach._id);
           }
        });
       }
   });
});

//COMMENT EDIT ROUTE
router.get("/:comment_id/edit",middleware.checkCommentOwnership, function (req, res){
    Beach.findById(req.params.id, function (err, foundBeach){
      if (err || foundBeach) {  
    req.flash("error","No beach found");
    return res.redirect("back");
    }
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {beach_id: req.params.id, comment: foundComment});
        }
        
    });
    })
    
    
});

//COMMENT UPDATE
router.put("/:comment_id",middleware.checkCommentOwnership, function (req, res){
    Comment.findByIdAndUpdate(req.params.comments_id, req.body.comment, function(err, updatedComment){
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/beaches/" + req.params.id)
        }
    });
});


//COMMENT DESTROY ROUTE
router.delete("/:comment_id",middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err) {
            res.redirect("back");
        } else {
            req.flash("success","Comment deleted!")
            res.redirect("/beaches/" + req.params.id);
        }
    });
});

module.exports = router;