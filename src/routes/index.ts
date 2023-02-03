import express from 'express';
import createUser from '../resolvers/user/createUser';

const router = express.Router();

const routes = router.post('/user/create', createUser);

export default routes;
