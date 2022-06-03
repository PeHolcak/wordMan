import asyncHandler from "express-async-handler";
import generateToken from "../utils/generate-token.js";
import Users from "../models/users.js";
import Role from "../models/roles.js";
import bcrypt from "bcryptjs";
import loginDtoInScheme from "../dtoIn/login.js";
import registerDtoInScheme from "../dtoIn/register.js";
import {
  isDtoInValid,
  checkUnsupportedKeyes,
} from "../helpers/validation-helper.js";
import getError from "../utils/get-error.js";

const DEFAULT_ROLE_ID = 1;

const authUser = asyncHandler(async (req, res) => {
  let error = {};
  //HDS 1 1.1 1.3
  const validationResult = await isDtoInValid(loginDtoInScheme, req.body, res);
  if (validationResult) {
    //HDS 1.2
    error.unsupportedKeyList = checkUnsupportedKeyes(
      req.body,
      loginDtoInScheme
    );

    const { login, password } = req.body;
    //HDS 2
    let user;
    try {
      user = await Users.findOne({ login });
    } catch (err) {
      await getError("login-error", "databaseError", res);
    }
    if (user) {
      if (await user.matchPassword(password)) {
        res.json({
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          profilePhoto: user.profilePhoto,
          token: generateToken(user._id),
          error,
        });
      } else {
        //HDS 2.1 - password does not match
        await getError("login-error", "userDoesNotExist", res);
      }
    } else {
      //HDS 2.1 - user does not exist
      await getError("login-error", "userDoesNotExist", res);
    }
  } else {
    await getError("general-errors", "wrongDtoIn", res);
  }
});

const registerUser = asyncHandler(async (req, res) => {
  let error = {};

  //HDS 1, 1.1, 1.2, 1.3
  const validationResult = await isDtoInValid(
    registerDtoInScheme,
    req.body,
    res
  );
  if (validationResult) {
    //HDS 1.4
    error.unsupportedKeyes = checkUnsupportedKeyes(
      req.body,
      registerDtoInScheme
    );
    const {
      firstName,
      lastName,
      login,
      password,
      phoneContact,
      emailContact,
      profilePhoto,
    } = req.body;
    //2 2.1 2.2
    let userExists;
    try {
      userExists = await Users.findOne({ login });
    } catch (err) {
      await getError("register-error", "UserFindDatabaseError", res);
    }

    if (userExists) {
      await getError("register-error", "UserAlreadyExists", res);
    }

    //3 3.1
    let user;
    try {
      user = await Users.create({
        firstName,
        lastName,
        login,
        password: bcrypt.hashSync(password),
        phoneContact,
        emailContact,
        profilePhoto,
        roleId: DEFAULT_ROLE_ID,
        year: new Date().getTime(),
      });
    } catch (err) {
      await getError("register-error", "UserCreateError", res);
    }

    //4
    if (user) {
      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePhoto: user.profilePhoto,
        role: DEFAULT_ROLE_ID,
        token: generateToken(user._id),
      });
      return;
    } else {
      await getError("register-error", "UserCreateError", res);
    }
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await Users.findById((req.query||{}).userId);
  if (user) {
    const role =
      (await Role.findOne({ roleId: user.roleId })) ||
      (await Role.findOne({ roleName: "Guess" }));
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      login: user.login,
      phoneContact: user.phoneContact,
      emailContact: user.emailContact,
      role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      lastName: user.lastName,
      lastName: user.lastName,
      lastName: user.lastName,
      isAdmin: user.role,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { authUser, registerUser, getUserProfile };
