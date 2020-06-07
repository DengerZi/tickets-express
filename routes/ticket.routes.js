const express = require('express');
const jwtMiddleware = require('express-jwt');
const secrets = require('../config/secrets');
const router = express.Router();
const ticketValidator = require('../middlewares/ticketValidator');
const ticketStoreValidator = require('../middlewares/ticketStoreValidator');
const ticketIdValidator = require('../middlewares/ticketIdValidator');

const ticketController = require('../controllers/ticket.controller');

router.route('/')
  .get(jwtMiddleware({secret: secrets.jwtSecret}), ticketController.showAllTickets)
  .post(jwtMiddleware({secret: secrets.jwtSecret}), ticketStoreValidator, ticketController.createTicket);

router.route('/:ticketId')
  .get(jwtMiddleware({secret: secrets.jwtSecret}), ticketIdValidator, ticketController.showTicketById)
  .put(jwtMiddleware({secret: secrets.jwtSecret}), ticketValidator, ticketController.updateTicket)
  .delete(jwtMiddleware({secret: secrets.jwtSecret}), ticketController.deleteTicket);

module.exports = router;
