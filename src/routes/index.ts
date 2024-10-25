import express from 'express';
import auth from '../resolvers/user/auth';
import createTask from '../resolvers/task/createTask';

const router = express.Router();

router.post('/user/auth', auth);
router.post('/task/create', createTask);

export default router;
