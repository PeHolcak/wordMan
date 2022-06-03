import express from 'express';
import ROLES from '../configuration/roles.js';
const router = express.Router();

import {
  wordCreate,
  wordDelete,
  wordUpdate,
  wordList
} from '../controllers/word-controller.js'
import { protect } from '../middleware/user-middleware.js';

router.route('/create').post(
  // protect([ROLES.HEADMASTER,ROLES.OWNER, ROLES.STUDY_DEPARTMENT, ROLES.HEADMASTER, ROLES.STUDENTS]), 
  wordCreate);
router.route('/delete').post(protect([ROLES.HEADMASTER,ROLES.OWNER, ROLES.STUDY_DEPARTMENT, ROLES.HEADMASTER]),wordDelete);
router.route('/update').post(protect([ROLES.HEADMASTER,ROLES.OWNER, ROLES.STUDY_DEPARTMENT, ROLES.HEADMASTER]),wordUpdate);
router.route('/list').get(wordList);


export default router;
