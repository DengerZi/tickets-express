const Joi = require('@hapi/joi');
const ResponseUtil = require('../utils/response');
const errors = require('../utils/codeInternalErrors');
const log4js = require('log4js');

const logger = log4js.getLogger();
logger.level = "debug";

const ticketValidator = (req, res, next) => {
  logger.info("[ticketValidator] INIT");

  const data = req.body;

  const schema = Joi.object({
    "name": Joi.string(),
    "_user": Joi.string().length(24).allow(null),
    "_ticketRequestedUser": Joi.string().length(24).allow(null)
  });

  const {error} = schema.validate(data);

  logger.info("[ticketValidator] FINISH");
  error ? ResponseUtil.unprocessableEntity(res, errors.VALIDATION_FAILED, errors.VALIDATION_FAILED_MESSAGE, error.details[0].message) : next();
};

module.exports = ticketValidator;
