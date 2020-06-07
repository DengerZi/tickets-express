const roleService = require('../services/role.service');
const ResponseUtil = require('../utils/response');
const errors = require('../utils/codeInternalErrors');
const log4js = require('log4js');

const logger = log4js.getLogger();
logger.level = "debug";

async function createRol(req, res) {
  logger.info("[createRol] INIT");
  try {
    let role = await roleService.getRoleByName(req.body.name.toUpperCase());

    if (role) {
      logger.info(`[createRol] Role found ${role._id}`);
      ResponseUtil.unprocessableEntity(res, errors.ROLE_EXISTS, errors.ROLE_EXISTS_MESSAGE, null);
    } else {
      role = await roleService.storeRole(req.body);
      logger.info(`[createRol] Role saved ${role._id}`);

      ResponseUtil.success(res, role);
    }
  } catch (error) {
    logger.error("[createRol] ERROR", error);
    ResponseUtil.badRequest(res, errors.DATA_NOT_FOUND, error.message);
  }
  logger.info("[createRol] FINISH");
}

async function removeAllRoles(req, res) {
  logger.info("[removeAllRoles] INIT");
  try {
    await roleService.destroyRoles();

    ResponseUtil.noContent(res, null, null);
  } catch (error) {
    logger.error("[removeAllRoles] ERROR", error);
    ResponseUtil.badRequest(res, errors.DATA_NOT_FOUND, error.message);
  }
  logger.info("[removeAllRoles] FINISH");
}

module.exports = {createRol, removeAllRoles};
