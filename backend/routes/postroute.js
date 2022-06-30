import express from 'express'
import { sharepost, getpost, updatepost, deletepost, likespost, gettimelinepost } from '../controller/postcontroller.js';
import { middleware } from '../controller/authcontroller.js';
const router = express.Router()

router.post('/',middleware, sharepost);
router.get('/:id',middleware, getpost);
router.put('/:id',middleware, updatepost);
router.delete('/:id',middleware, deletepost);
router.put('/:id/wish',middleware, likespost);
router.get('/:id/timeline',middleware,gettimelinepost)

export default router