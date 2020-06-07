const log4js = require('log4js');
const ResponseUtil = require('../utils/response');
const errors = require('../utils/codeInternalErrors');

const logger = log4js.getLogger();
logger.level = "debug";

const errorHandlingJWT = (err, req, res, next) => {
  logger.info("[errorHandlingJWT] INIT");
  logger.info(`[errorHandlingJWT] ${err}`);

  if (err.name === "UnauthorizedError" || err.name === 'SyntaxError') {
    return ResponseUtil.unauthorized(res, errors.UNAUTHORIZED, errors.UNAUTHORIZED_MESSAGE);
  }

  logger.info("[errorHandlingJWT] FINISH");
};

module.exports = errorHandlingJWT;
