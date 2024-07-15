const express = require('express');
const router = express.Router();
// const checkCredits = require('../middlewares/checkCredits');
// const requireLogin = require('../middlewares/requireAuth');
const mongoose = require('mongoose');
const Survey = mongoose.model('surveys');
const sendSurvey = require('../services/Mailer');

//Pipeline processing modules for webhook
const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');

router.get('/surveys', async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ error: 'You must log in!' });
  }

  const surveys = await Survey.find({
    _user: req.user.id,
  }).select({
    recipients: false,
  });
  res.send(surveys);
});

router.get('/surveys/:surveyId/:choice', (req, res) => {
  res.send('Thanks for voting!');
});

router.post('/surveys', async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ error: 'You must log in!' });
  }

  if (req.user.credits < 1) {
    return res.status(403).send({ error: 'Not enough credits!' });
  }

  const { title, subject, body, recipients } = req.body;

  console.log('Received request:', req.body);

  const survey = new Survey({
    title,
    subject,
    body,
    recipients: recipients.split(',').map((email) => ({ email: email.trim() })),
    _user: req.user.id,
    dateSent: Date.now(),
  });

  try {
    console.log('Sending survey...');
    const recipientList = recipients.split(',');
    await sendSurvey(recipientList, survey);
    console.log('Survey sent!');
    await survey.save();
    req.user.credits -= recipientList.length;
    const user = await req.user.save();
    res.status(201).send({ user, survey });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/survey/webhook', async (req, res) => {
  const p = new Path('/api/surveys/:surveyId/:choice');

  _.chain(req.body)
    .map(({ email, url }) => {
      const match = p.test(new URL(url).pathname);

      if (match) {
        return {
          email,
          surveyId: match.surveyId,
          choice: match.choice,
        };
      }
    })
    .compact()
    .uniqBy('email', 'surveyId')
    .each(({ email, surveyId, choice }) => {
      Survey.updateOne(
        {
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false },
          },
        },
        {
          $inc: { [choice]: 1 },
          $set: { 'recipients.$.responded': true },
          lastResponded: new Date(),
        }
      ).exec();
    })
    .value();

  res.send({});
});

module.exports = router;
