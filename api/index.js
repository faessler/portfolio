/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

'use strict';

const handleOPTIONS = (req, res) => {
  res.set('Access-Control-Allow-Methods', 'POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Access-Control-Max-Age', '3600');
  res.status(204).send('');
};

const handlePOST = (req, res) => {
  // validate request body
  if (
    !req.body.name ||
    !req.body.contact ||
    !req.body.history ||
    typeof req.body.name !== 'string' ||
    typeof req.body.contact !== 'string' ||
    !Array.isArray(req.body.history)
  ) {
    res.status(422).send('');
    return;
  }

  // send mail
  const Mailjet = require('node-mailjet');
  const mailjet = new Mailjet({
    apiKey: process.env.MAILJET_APIKEY_PUBLIC,
    apiSecret: process.env.MAILJET_APIKEY_PRIVATE,
  });

  const request = mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: process.env.MAIL_SENDER,
          Name: req.body.name,
        },
        To: [
          {
            Email: process.env.MAIL_RECEIVER_ADDRESS,
            Name: process.env.MAIL_RECEIVER_NAME,
          },
        ],
        Subject: '📬 New Chatbot Message',
        TextPart: `Name: ${req.body.name} \nContact: ${req.body.contact} \n\nHistory: ${req.body.history.join(
          ' ▶︎ '
        )}\n`,
        HTMLPart: `<b>Name:</b> ${req.body.name} <br/><b>Contact:</b> ${
          req.body.contact
        } <br/><br/><b>History:</b> ${req.body.history.join(' ▶︎ ')}\n`,
      },
    ],
  });

  request
    .then((result) => {
      res.status(result.response.status).send('');
    })
    .catch((err) => {
      console.error('ERROR: ', err);
      res.status(500).send('');
    });
};

exports.sendMail = (req, res) => {
  res.set('Access-Control-Allow-Origin', process.env.CORS);

  switch (req.method) {
    case 'OPTIONS':
      handleOPTIONS(req, res);
      break;
    case 'POST':
      handlePOST(req, res);
      break;
    default:
      res.status(405).send({ error: 'Something blew up!' });
      break;
  }
};
