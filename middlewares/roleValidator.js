const Joi = require('@hapi/joi');
const ResponseUtil = require('../utils/response');
const errors = require('../utils/codeInternalErrors');
const log4js = require('log4js');

const logger = log4js.getLogger();
logger.level = "debug";

const roleValidator = (req, res, next) => {
  logger.info("[roleValidator] INIT");

  const data = req.body;

  const schema = Joi.object({
    "name": Joi.string().required(),
  });

  const {error} = schema.validate(data);

  logger.info("[roleValidator] FINISH");
  error ? ResponseUtil.unprocessableEntity(res, errors.VALIDATION_FAILED, errors.VALIDATION_FAILED_MESSAGE, error.details[0].message) : next();
};

module.exports = roleValidator;
