#BeachRate

##Steps taken for the whole project.
====================================
First make sure you install Node.js from here : nodejs.org .
Then, from the package.json, check the dependecies and install them.
====================================
##Initial Setup
* Add Landing Page
* Add Beaches Page that lists all Beaches

Each beach has:
   * Name
   * Image

##Layout and Basic Styling
* Create our header and footer partials
* Add in Bootstrap

##Creating New Beaches
* Setup new beach POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

##Style the Beaches page
* Add a better header/title
* Make Beaches display in a grid

##Style the Navbar and Form
* Add a navbar to all templates
* Style the new beach form

##Add Mongoose
* Install and configure Mongoose
* Setup beach model
* Use beach model inside of our routes

##Show Page
* Review the RESTful routes we've seen so far
* Add description to our beach model
* Show db.collection.drop()
* Add a show route/template

##Refactor Mongoose Code
* Create a models directory
* Use module.exports
* Require everything correctly!

##Add Seeds File
* Add a seeds.js file
* Run the seeds file every time the server starts

##Add the Comment model!
* Make our errors go away!
* Display comments on beach show page

##Comment New/Create
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form

##Style Show Page
* Add sidebar to show page
* Display comments nicely

##Finish Styling Show Page
* Add public directory
* Add custom stylesheet

##Auth Pt. 1 - Add User Model
* Install all packages needed for auth
* Define User model 

##Auth Pt. 2 - Register
* Configure Passport
* Add register routes
* Add register template

##Auth Pt. 3 - Login
* Add login routes
* Add login template

##Auth Pt. 4 - Logout/Navbar
* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar

##Auth Pt. 5 - Show/Hide Links
* Show/hide auth links in navbar 

##Refactor The Routes
* Use Express router to reoragnize all routes







RESTFUL ROUTES

name      url      verb    desc.
===============================================
INDEX   /beaches
NEW     /beaches/new
CREATE  /beaches
SHOW    /beaches/:id

NEW     beaches/:id/comments/new    GET
CREATE  beaches/:id/comments      POST