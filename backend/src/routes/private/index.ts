import Express from 'express';

// create router instance
const router = Express.Router();

import userRoute from './user.route';
userRoute(router);

export default router;
