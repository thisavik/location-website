const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utilis/geocode");

const app = express();
const port = process.env.PORT || 3000             // env(enviroment variable) port provided by heroku

// defines path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and customise views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static assets directiory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Location",
    name: "Abhishek Kumar",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me :)",
    name: "Abhishek Kumar",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Abhishek Kumar",
  });
});

// weather rendering
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must have to provide address",
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    res.send({
      latitude,
      longitude,
      location
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must have to provide search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

// should be in last of mention url
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    messege: "Help article not found.",
    name: "Abhishek Kumar",
  });
});

// no match url (always be in last of all get call)
// '*' called as wild card character
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    messege: "Page not Found",
    name: "Abhishek Kumar",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
