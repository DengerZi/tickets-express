const Ticket = require('../models/Ticket');

function getAllTickets() {
  return Ticket.find({}).populate([
    {path: "_user", select: ["name", "email"] },
    {path: "_ticketRequestedUser", select: ["name", "email"] },
  ]);
}

function storeTicket(params) {
  return Ticket.create(params);
}

function getTicketById(ticketId) {
  return Ticket.findById(ticketId).populate([
    {path: "_user", select: ["name", "email"] },
    {path: "_ticketRequestedUser", select: ["name", "email"] },
  ]);
}

function updateTicketById(id, params) {
  return Ticket.findByIdAndUpdate(id, params, {new: true});
}

module.exports = {getAllTickets, storeTicket, getTicketById, updateTicketById};
