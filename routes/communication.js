// routes/communication.js
// const express = require('express');
// const router = express.Router();
// // const app = express();
// const isLoggedIn = require('../server')
// const { sendEmail } = require('../controllers/communication');

import express from 'express';
import { Router } from 'express';
import {isLoggedIn} from '../utils.js';
import { sendEmail } from '../controllers/communication.js';
import fetch from 'node-fetch'
const router = Router();

// Middleware to protect routes requiring authentication
router.use(isLoggedIn);

// Compose and send email page
router.get('/compose-email', isLoggedIn, async (req, res) => {
  try {
      // Fetch available templates from Postmark API
      // Assuming you have a server token stored securely
      const serverToken = 'c182d055-763e-494c-ac95-641bef4dd49a'; // Replace with your actual token

      const templatesResponse = await fetch(`https://api.postmarkapp.com/templates?count=100&offset=0`, {
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'X-Postmark-Server-Token': serverToken,
          },
      });
      console.log(templatesResponse)
      const templatesData = await templatesResponse.json();
      const templates = templatesData.Templates;

      res.render('compose-email.ejs', { user: req.user, templates });
  } catch (error) {
      console.error('Error fetching templates:', error);
      res.status(500).json({ error: 'Error fetching templates' });
  }
});
router.post('/send-email', isLoggedIn, async (req, res) => {
  try {
    const { to, Subject, useTemplate, templateId } = req.body;

    if (useTemplate && templateId) {
      // If the user chooses to use a template and has selected one
      const serverToken = 'c182d055-763e-494c-ac95-641bef4dd49a'; // Replace with your actual token
      const result = await fetch('https://api.postmarkapp.com/email/withTemplate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Postmark-Server-Token': serverToken,
        },
        body: JSON.stringify({
          To: to,
          TemplateId: templateId,
          Subject: Subject,
        }),
      });

      if (!result.ok) {
        console.error('Error sending email with template. Status:', result.status);
        const errorText = await result.text();
        console.error('Error details:', errorText);
        res.status(500).json({ error: 'Error sending email with template' });
        return;
      }

      const resultData = await result.json();
      res.send(resultData);
    } else {
      const regularEmailResult = await sendEmail(to, Subject, HtmlBody);
      res.send(regularEmailResult);
      // Handle the case where the user doesn't choose to use a template
      // You can add the logic for sending a regular email here
    }
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ error: 'Error sending email' });
  }
});
// Send email
// router.post('/send-email', sendEmail);

export default router;
