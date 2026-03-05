const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
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
    if (books[key].title === req.params.title) {
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
  res.send(books[req.params.isbn].reviews)
});

module.exports.general = public_users;
