import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  getUserProfile
} from '../controllers/user-controller.js'
import { protect } from '../middleware/user-middleware.js';
import ROLES from '../configuration/roles.js';

router.route('/create').post(registerUser);
router.post('/login', authUser);
router.route('/detail').get(protect([ROLES.HEADMASTER,ROLES.OWNER, ROLES.STUDY_DEPARTMENT, ROLES.HEADMASTER, ROLES.STUDENTS, ROLES.GUESTS]), getUserProfile);


export default router;
