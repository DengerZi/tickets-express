const Joi = require('@hapi/joi');
const ResponseUtil = require('../utils/response');
const errors = require('../utils/codeInternalErrors');
const log4js = require('log4js');

const logger = log4js.getLogger();
logger.level = "debug";

const ticketIdValidator = (req, res, next) => {
  logger.info("[ticketIdValidator] INIT");

  const data = req.params;

  const schema = Joi.object({
    "ticketId": Joi.string().max(24).required(),
  });

  const {error} = schema.validate(data);

  logger.info("[ticketIdValidator] FINISH");
  error ? ResponseUtil.unprocessableEntity(res, errors.VALIDATION_FAILED, errors.VALIDATION_FAILED_MESSAGE, error.details[0].message) : next();
};

module.exports = ticketIdValidator;
