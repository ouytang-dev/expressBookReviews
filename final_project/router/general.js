const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


// Register a new user
app.post("/register", (req, res) => { 
    const username = req.body.username;
    const password = req.body.password;

    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!doesExist(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
	// Send JSON response with formatted friends data
    res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
      res.send(books[req.params.isbn])//This line is to be replaced with actual return value;
});

// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  let allAuthors = [];
  for (let key in books) {
    if (books[key].author.toLowerCase() === req.params.author.toLowerCase()) {
      allAuthors.push(books[key]);
    }
  }
  if (allAuthors.length > 0) {
    res.send(allAuthors);
  } else {
    return res.status(404).json({message: "Book not found"});
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  let allTitles = [];
  for (let key in books) {
    if (books[key].title.toLowerCase() === req.params.title.toLowerCase()) {
      allTitles.push(books[key]);
    }
  }
  if (allTitles.length > 0) {
    res.send(allTitles);
  } else {
    return res.status(404).json({message: "Book not found"});
  }   
}); 

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  if (books[req.params.isbn] && books[req.params.isbn].reviews) {
    if (books[req.params.isbn].reviews.length > 0) {
      res.send(books[req.params.isbn].reviews);
    } else {
      return res.status(404).json({message: "This book has no reviews"});
    }
  } else {
    return res.status(404).json({message: "Reviews not found"});
  }
});

module.exports.general = public_users;
