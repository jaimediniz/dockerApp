import express, { Application, Request, Response, NextFunction } from 'express';

import { setVapidDetails, sendNotification } from 'web-push';

import * as log from './utils/logger';

const component = 'Index - V0';

const publicVapidKey =
  'BD3DSzJfoHbfxxOhup3CVfAqR1wNODMD5esnwspb4AYNZDFeB3kB0uU3OAUjxXcZonuUqN0staw0yYh-9L5wn7E';
const privateVapidKey = 'cCvIQRheMhsPJEVNYBvqGa7koNBQX6YYgSD-8ExNyK8';

setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);

const router = express.Router();

var subscription: any;

// Subscribe Route
router.route('/subscribe').post((req: Request, res: Response) => {
  // Get pushSubscription Object
  subscription = req.body;

  // Send 201 - Created
  res.status(201).json({});

  // Create Payload
  const payload = JSON.stringify({
    title: 'Subscribed!',
    body: 'You will receive notifications...',
    icon:
      'https://freeiconshop.com/wp-content/uploads/edd/notification-flat.png'
  });

  // Pass object into sendNotification
  sendNotification(subscription, payload).catch((err) => {
    log.error({ component, message: err.message, error: err });
  });
});

router.route('/getOne/:id').get((req: Request, res: Response) => {
  // Send 201 - Created
  res.status(200).json({});

  // Create Payload
  const payload = JSON.stringify({
    title: `Title ${req.params.id}:`,
    body: 'Info...',
    icon:
      'https://freeiconshop.com/wp-content/uploads/edd/notification-flat.png'
  });

  // Pass object into sendNotification
  sendNotification(subscription, payload).catch((err) => {
    log.error({ component, message: err.message, error: err });
  });
});

router
  .route('/')
  .get((req: Request, res: Response) =>
    res.json({ message: 'Docker is easy 🐳' })
  );

router.use('/DB', require('./routes/database'));

module.exports = router;
