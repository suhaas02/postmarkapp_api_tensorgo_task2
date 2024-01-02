// const express = require('express');
// const session = require("express-session")
// const passport = require('passport');
// const postmark = require('./postmark');
// const bodyParser = require('body-parser');
// require('./passport')
// const app = express();
// const port = 3000;
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));


// app.use(session({secret: "cats"}));
// app.use(passport.initialize());
// app.use(passport.session());
// app.set('view engine', 'ejs');

// function isLoggedIn(req, res, next)
// {
//     req.user ? next() : res.sendStatus(401);
// }
// app.get('/', (req, res) => {
//     res.render('login.ejs');
// });

// app.get('/auth', 
//     passport.authenticate('google', {scope: ['email', 'profile']})
// )

// app.get('/auth/callback', 
//     passport.authenticate('google', {
//         successRedirect: '/protected',
//         failureRedirect: 'auth/failure',
//     })
// );

// app.get('/auth/failure', (req,res) => {
//     res.send("Something went wrong");
// })

// app.get('/protected', isLoggedIn, (req, res) => {
//     res.send(`hello ${req.user.displayName}`);
// })

// app.get('/logout', (req, res) => {
//     req.logout();
//     req.session.destroy();
//     res.send("good bye");
// })

// // app.post('/emailId', async(req, res) => {
// //     try{
// //         console.log(req.body);
// //         const {to, HtmlBody, Subject} = req.body;
// //         const result = await postmark.sendEmail(to, HtmlBody, Subject);
        
// //         return res.send(result);
// //     }
// //     catch(err){
// //         console.log(err);

// //         return res.send(err);
// //     }

// // })

// app.listen(port,() => {
//     console.log(`Server is running in port ${port}`);
// })

// const express = require('express');
// const session = require("express-session")
// const passport = require('passport');
// const postmark = require('./postmark');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const Email = require('./models/data');
// const fetch = require('node-fetch@2');
// require('./passport')
import express from 'express';
import session from 'express-session';
import passport from 'passport';
// import postmark from './postmark.js';
import { sendEmail } from './postmark.js';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import {Email} from './models/data.js';
// import fetch from 'node-fetch@2';
import fetch from 'node-fetch'
import communicationRoutes from './routes/communication.js'
import './passport.js';
import { isLoggedIn } from './utils.js';
// import { composeEmail } from './controllers/communication.js';
const app = express();
dotenv.config();
const port = 3000;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(process.env.DB_URI,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(session({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.render('login.ejs');
});

app.get('/auth',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get('/auth/callback',
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: 'auth/failure',
  })
);

app.get('/auth/failure', (req, res) => {
  res.send("Something went wrong");
});

app.get('/protected', isLoggedIn, (req, res) => {
    // res.send(`
    //     <h1>hello ${req.user.displayName} </h1>
    //     <a href="/communication-history">View Communication History</a>
    //     <a href="/communication/compose-email">Write an email</a>
    // `);
    res.render('homepage.ejs', {userName: req.user.displayName});
});

app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("good bye");
});

// Modified route for sending emails
app.post('/send-email', isLoggedIn, async (req, res) => {
  try {
    const { to, HtmlBody, Subject, useTemplate, templateId } = req.body;

    if (useTemplate && templateId) {
      // If the user chooses to use a template and has selected one
      const result = await sendEmailWithTemplate(to, templateId, Subject);
      return res.send(result);
    } else {
      // If the user chooses not to use a template or hasn't selected one
      const result = await sendEmail(to, HtmlBody, Subject);
      return res.send(result);
    }
  } catch (err) {
    console.error('Error sending email:', err);
    return res.status(500).json({ error: 'Error sending email' });
  }
});

// const communicationRoutes = require('./routes/communication');
app.use('/communication', communicationRoutes);

//communication history endpoint
app.get('/communication/communication-history', isLoggedIn, async (req, res) => {
    try {
      const user = req.user; 
      const communicationHistory = await Email.find({ $or: [{ sender: user.email }, { recipient: user.email }] });
  
      res.json(communicationHistory);
    } catch (error) {
      console.error('Error retrieving communication history:', error);
      res.status(500).json({ error: 'Error retrieving communication history' });
    }
  });
  
app.get('/communication-history', isLoggedIn, (req, res) => {
    res.render('communication-history.ejs', { user: req.user });
});

app.listen(port, () => {
  console.log(`Server is running in port ${port}`);
});
