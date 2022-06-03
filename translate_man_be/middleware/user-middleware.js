import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler';
import User from '../models/users.js';
import Role from '../models/roles.js';
import { isnotEmptyArray } from '../helpers/validation-helper.js';
import getError from '../utils/get-error.js';

const reject = (res) => {
  res.status(401)
  throw new Error('Not authorized')
};

const protect = (role) => asyncHandler(async (req, res, next) => {
  let token;
  if (
    (req.headers||{}).authorization &&
    ((req.headers||{}).authorization||"").startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      let user;
      try{
        user = await User.findById(decoded.id).select('-password');
      }catch(err){
        console.error(err);
        await getError("general-errors", "UserDBError", res);
        return;
      }

      let author = true;
      if (isnotEmptyArray(role)) {
        let userRole = ""
        try {
          userRole = (await Role.findOne({roleId: user.roleId})||{}).roleName;
        } catch (error) {
          console.error(error);
          await getError("general-errors", "RoleDBError", res);
          return;
        }
        !role.includes(userRole) && (author = false);
      }
      if (!author) {
        await getError("general-errors", "Forbident", res);
        return;
      }
      next()
    } catch (error) {
      console.error(error)
      await getError("general-errors", "TokenFailed", res);
      return;
    }
  }else{
    reject(res);
  }

  if (!token) {
    reject(res);
  }
});

export { protect }
