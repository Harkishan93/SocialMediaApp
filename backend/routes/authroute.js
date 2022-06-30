import express from 'express';
import { login, registration } from '../controller/authcontroller.js';

 const route = express.Router();

 route.post('/register',registration);
 route.post('/login',login);

export default route;