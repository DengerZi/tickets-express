const codeInternalErrors = {
  ROLE_NOT_FOUND: 30,
  ROLE_NOT_FOUND_MESSAGE: "Role not found",

  ROLE_EXISTS: 31,
  ROLE_EXISTS_MESSAGE: "Role already defined",

  USER_NOT_FOUND: 40,
  USER_NOT_FOUND_MESSAGE: "User not found",

  USER_EXISTS: 41,
  USER_EXISTS_MESSAGE: "User already defined",

  TICKET_NOT_FOUND: 50,
  TICKET_NOT_FOUND_MESSAGE: "Ticket not found",

  INSUFFICIENT_DATA: 51,
  INSUFFICIENT_DATA_MESSAGE: "The data provided is insufficient",

  BAD_REQUEST: 52,
  BAD_REQUEST_MESSAGE: "The data provided is poorly structured",

  PARAM_NO_FOUND: 80,
  PARAM_NO_FOUND_MESSAGE: "Param query not found",

  IMAGE_NO_FOUND: 90,
  IMAGE_NO_FOUND_MESSAGE: "Image not found",

  DATA_NOT_FOUND: 100,

  UNAUTHORIZED: 401,
  UNAUTHORIZED_MESSAGE: "Unauthorized access",

  FORBIDDEN: 403,
  FORBIDDEN_MESSAGE: "You do not have permissions to perform this operation",

  VALIDATION_FAILED: 422,
  VALIDATION_FAILED_MESSAGE: "Invalid request data"
};

module.exports = codeInternalErrors;
