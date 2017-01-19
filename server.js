//Section 5, Lecture 1
// const express = require('express');
//
// var app = express();
//
// app.get('/', (req, res) => {
//   // res.send('Hello Express!');
//   // res.send('<h1>Hello Express!</h1>');
//   res.send({
//     name: 'Andrew',
//     likes: [
//       'Biking',
//       'Cities'
//     ]
//   });
// });
//
// //go to about page
// app.get('/about', (req, res) => {
//   res.send('About Page');
// });
//
// //bad - send back json with errorMessage
// app.get('/bad', (req, res) => {
//   // res.send('Not able to route to that page!');
//     res.send({
//       errorMessage: 'Unable to handle request'
//     });
// });
// app.listen(3000);

//Section 5, Lecture 2
//
// const express = require('express');
// const hbs = require('hbs');
//
// var app = express();
// app.set('view engine', 'hbs');
// app.use(express.static(__dirname + '/public'));
//
// // app.get('/', (req, res) => {
// //   // res.send('Hello Express!');
// //   // res.send('<h1>Hello Express!</h1>');
// //   res.send({
// //     name: 'Andrew',
// //     likes: [
// //       'Biking',
// //       'Cities'
// //     ]
// //   });
// // });
//
// app.get('/', (req, res) => {
//   res.render('home.hbs', {
//     pageTitle: 'Home Page',
//     welcomeMessage: 'Welcome to my Homepage',
//     currentYear: new Date().getFullYear()
//   });
// });
//
// //go to about page
// app.get('/about', (req, res) => {
//   res.render('about.hbs', {
//     pageTitle: 'About Page',
//     currentYear: new Date().getFullYear()
//   });
// });
//
// //bad - send back json with errorMessage
// app.get('/bad', (req, res) => {
//   // res.send('Not able to route to that page!');
//     res.send({
//       errorMessage: 'Unable to handle request'
//     });
// });
// app.listen(3000, () => {
//   console.log('Server is up on port 3000');
// });


////Sect 5, Lecture 3
// const express = require('express');
// const hbs = require('hbs');
// //register partials to use common header and footer
// hbs.registerPartials(__dirname + '/views/partials');
// var app = express();
// app.set('view engine', 'hbs');
// app.use(express.static(__dirname + '/public'));
//
// //Eliminate duplicate code using helper
// hbs.registerHelper('getCurrentYear', () => {
//   return new Date().getFullYear();
// });
//
// //Get Dynamic text
// hbs.registerHelper('screamIt', (text) => {
//   return text.toUpperCase();
// });
//
// app.get('/', (req, res) => {
//   res.render('home.hbs', {
//     pageTitle: 'Home Page',
//     welcomeMessage: 'Welcome to my Homepage',
//   });
// });
//
// //go to about page
// app.get('/about', (req, res) => {
//   res.render('about.hbs', {
//     pageTitle: 'About Page',
//   });
// });
//
// //bad - send back json with errorMessage
// app.get('/bad', (req, res) => {
//   // res.send('Not able to route to that page!');
//     res.send({
//       errorMessage: 'Unable to handle request'
//     });
// });
// app.listen(3000, () => {
//   console.log('Server is up on port 3000');
// });


//Section, Lecture 45
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

//register partials to use common header and footer
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


//middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

//Eliminate duplicate code using helper
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

//Get Dynamic text
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my Homepage',
  });
});

//go to about page
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

//go to project page
app.get('/project', (req, res) => {
  res.render('project.hbs', {
    pageTitle: 'Project Page',
  });
});

//bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  // res.send('Not able to route to that page!');
    res.send({
      errorMessage: 'Unable to handle request'
    });
});
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
