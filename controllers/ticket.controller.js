const userService = require('../services/user.service');
const ticketService = require('../services/ticket.service');
const ResponseUtil = require('../utils/response');
const errors = require('../utils/codeInternalErrors');
const log4js = require('log4js');

const logger = log4js.getLogger();
logger.level = "debug";

async function showAllTickets(req, res) {
  logger.info("[showAllTickets] INIT");
  try {
    let user = await userService.getUserById(req.user.id);
    let tickets = await ticketService.getAllTickets();

    if (user._role.name === 'ADMIN') {
      let requestedTickets = tickets.filter((ticket) => {
        return !ticket._user && ticket._ticketRequestedUser;
      });
      let freeTickets = tickets.filter((ticket) => {
        return !ticket._user && !ticket._ticketRequestedUser;
      });
      let assignedTickets = tickets.filter((ticket) => {
        return ticket._user;
      });

      tickets = requestedTickets.concat(freeTickets).concat(assignedTickets);
    } else {
      let myTickets = tickets.filter((ticket) => {
        return ticket._user && ticket._user._id == req.user.id;
      });
      let myRequestedTickets = tickets.filter((ticket) => {
        return !ticket._user && ticket._ticketRequestedUser && ticket._ticketRequestedUser._id == req.user.id;
      });
      let freeTickets = tickets.filter((ticket) => {
        return !ticket._user && !ticket._ticketRequestedUser;
      });

      tickets = myTickets.concat(myRequestedTickets).concat(freeTickets);
    }

    ResponseUtil.success(res, {user, tickets});
  } catch (error) {
    logger.error("[showAllTickets] ERROR", error);
    ResponseUtil.badRequest(res, errors.DATA_NOT_FOUND, error.message);
  }
  logger.info("[showAllTickets] FINISH");
}

async function createTicket(req, res) {
  logger.info("[createTicket] INIT");
  try {
    let user = await userService.getUserById(req.user.id);

    if (user._role.name === 'ADMIN') {
      let ticket = await ticketService.storeTicket(req.body);
      ResponseUtil.success(res, ticket);
    } else {
      ResponseUtil.unauthorized(res, errors.UNAUTHORIZED, errors.UNAUTHORIZED_MESSAGE);
    }
  } catch (error) {
    logger.error("[createTicket] ERROR", error);
    ResponseUtil.badRequest(res, errors.DATA_NOT_FOUND, error.message);
  }
  logger.info("[createTicket] FINISH");
}

async function showTicketById(req, res) {
  logger.info("[showTicketById] INIT");
  try {
    let ticket = await ticketService.getTicketById(req.params.ticketId);

    if (!ticket) {
      ResponseUtil.notFound(res, errors.TICKET_NOT_FOUND, errors.TICKET_NOT_FOUND_MESSAGE);
    } else {
      let user = await userService.getUserById(req.user.id);
      ResponseUtil.success(res, {user, ticket});
    }
  } catch (error) {
    logger.error("[showTicketById] ERROR", error);
    ResponseUtil.badRequest(res, errors.DATA_NOT_FOUND, error.message);
  }
  logger.info("[showTicketById] FINISH");
}

async function updateTicket(req, res) {
  logger.info("[updateTicket] INIT");
  try {
    let ticket = await ticketService.getTicketById(req.params.ticketId);

    if (!ticket) {
      ResponseUtil.notFound(res, errors.TICKET_NOT_FOUND, errors.TICKET_NOT_FOUND_MESSAGE);
    } else {
      let user = await userService.getUserById(req.user.id);

      if (user._role.name === 'ADMIN') {
        let ticket = await ticketService.updateTicketById(req.params.ticketId, req.body);
        ResponseUtil.success(res, ticket);
      } else {
        if (ticket._ticketRequestedUser || ticket._user) {
          ResponseUtil.unauthorized(res, errors.UNAUTHORIZED, errors.UNAUTHORIZED_MESSAGE);
        } else {
          ticket._ticketRequestedUser = req.user.id;
          await ticket.save();

          ResponseUtil.success(res, ticket);
        }
      }
    }
  } catch (error) {
    logger.error("[updateTicket] ERROR", error);
    ResponseUtil.badRequest(res, errors.DATA_NOT_FOUND, error.message);
  }
  logger.info("[updateTicket] FINISH");
}

async function deleteTicket(req, res) {
  logger.info("[deleteTicket] INIT");
  try {
    let ticket = await ticketService.getTicketById(req.params.ticketId);

    if (!ticket) {
      ResponseUtil.notFound(res, errors.TICKET_NOT_FOUND, errors.TICKET_NOT_FOUND_MESSAGE);
    } else {
      let user = await userService.getUserById(req.user.id);

      if (user._role.name === 'ADMIN') {
        await ticket.remove();

        ResponseUtil.success(res, {});
      } else {
        ResponseUtil.unauthorized(res, errors.UNAUTHORIZED, errors.UNAUTHORIZED_MESSAGE);
      }
    }
  } catch (error) {
    logger.error("[deleteTicket] ERROR", error);
    ResponseUtil.badRequest(res, errors.DATA_NOT_FOUND, error.message);
  }
  logger.info("[deleteTicket] FINISH");
}

module.exports = {showAllTickets, createTicket, showTicketById, updateTicket, deleteTicket};
