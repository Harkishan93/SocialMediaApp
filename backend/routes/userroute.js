import express from 'express';
import { user,  userdelete,  userupdate, followUser, unfollowUser,getAllUser } from '../controller/usercontroller.js';
import { middleware } from '../controller/authcontroller.js';
const route = express.Router();

route.get('/:id',middleware,user);
route.put('/:id',middleware,userupdate);
route.delete('/:id',middleware,userdelete);
route.put('/:id/follow',middleware,followUser);
route.put('/:id/unfollow',middleware,unfollowUser);
route.get('/',middleware,getAllUser);

export default route;