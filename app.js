"use strict"
const Controller = require('./controllers/controller.js');
const View = require('./views/view.js');
let command = process.argv[2]
let input = process.argv.slice(3)

// Good luck ...
switch (command) {
    case 'help':
        Controller.help()        
        break;
    case 'planeList':
        Controller.planeList()
        break;
    case 'passengerList':
        Controller.passengerList()
        break;
    case 'checkSeats':
        Controller.checkSeats(+input[0])
        break;
    case 'buyTicket':
        Controller.buyTicket(+input[0], input[1], input[2], input[3], input[4])
        break;
    case 'ticketInfo':
        Controller.ticketInfo(+input[0])
        break;
    case 'changeTicket':
        Controller.changeTicket(+input[0], +input[1], input[2])
        break;
    case 'cancelTicket':
        Controller.cancelTicket(+input[0])
        break;
    case 'showPassenger':
        Controller.showPassenger(+input[0])
        break;
    default:
        Controller.help();
        break;
}
