const Flight = require("../models/flight");
const Ticket = require("../models/ticket");

module.exports = {
    addNewTicket,
    create
}

function addNewTicket(req, res) {
    Flight.findById(req.params.id, function (err, flight) {
            res.render("tickets/new", {
                flight,
            })
    });
}

function create(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        const ticket = new Ticket(req.body);
        ticket.flight = req.params.id;
        ticket.save(function(err) {
            if(err) {
                console.log(err);
                res.redirect(`/tickets/${flight._id}`);
            }
            res.redirect(`/flights/${flight._id}`);
        })
    })
}
