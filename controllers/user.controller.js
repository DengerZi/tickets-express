const userService = require('../services/user.service');
const roleService = require('../services/role.service');
const ResponseUtil = require('../utils/response');
const errors = require('../utils/codeInternalErrors');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');
const log4js = require('log4js');

const logger = log4js.getLogger();
logger.level = "debug";

async function getUsersWithoutAdmin(req, res) {
  logger.info("[getUsersWithoutAdmin] INIT");
  try {
    let role = await roleService.getRoleByName('USER');
    let users = await userService.getUsersByRole(role._id);

    ResponseUtil.success(res, users);
  } catch (error) {
    logger.error("[getUsersWithoutAdmin] ERROR", error);
    ResponseUtil.badRequest(res, errors.DATA_NOT_FOUND, error.message);
  }
  logger.info("[getUsersWithoutAdmin] FINISH");
}

async function registerUser(req, res) {
  logger.info("[registerUser] INIT");
  try {
    let user = await userService.getUserByEmail(req.body.email.toLowerCase());

    if (user) {
      logger.info(`[registerUser] User found ${user._id}`);
      ResponseUtil.unprocessableEntity(res, errors.USER_EXISTS, errors.USER_EXISTS_MESSAGE, null);
    } else {
      user = req.body;
      let userCount = await userService.countAllUsers();
      let roleName;

      if (userCount) {
        roleName = "USER";
      } else {
        roleName = "ADMIN";
      }

      let role = await roleService.getRoleByName(roleName);
      user._role = role._id;

      user = await userService.storeUser(user);
      user = await user.populate({path: "_role", select: ["name"] }).execPopulate();
      user.password = undefined;
      logger.info(`[registerUser] User saved ${user._id}`);

      responseWithJWT(res, user);
    }
  } catch (error) {
    logger.error("[registerUser] ERROR", error);
    ResponseUtil.badRequest(res, errors.DATA_NOT_FOUND, error.message);
  }
  logger.info("[registerUser] FINISH");
}

async function login(req, res) {
  logger.info("[login] INIT");
  try {
    let user = await userService.getUserByEmail(req.body.email.toLowerCase());

    const isValidPassword = await userService.validatePassword(user, req.body.password);
    if (isValidPassword) {
      user.password = undefined;
      responseWithJWT(res, user);
    } else {
      ResponseUtil.unauthorized(res, errors.UNAUTHORIZED, errors.UNAUTHORIZED_MESSAGE);
    }
  } catch (error) {
    logger.error("[login] ERROR", error);
    ResponseUtil.badRequest(res, errors.DATA_NOT_FOUND, error.message);
  }
  logger.info("[login] FINISH");
}

function responseWithJWT(response, user) {
  const token = jwt.sign({id: user._id}, secrets.jwtSecret);
  ResponseUtil.success(response, {
    user,
    jwt: token
  });
}

module.exports = {getUsersWithoutAdmin, registerUser, login};
