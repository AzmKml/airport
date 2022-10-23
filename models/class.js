"use strict"

class Plane {
    constructor(flightNumber, airlineName, origin, destination){
        this.flightNumber = flightNumber;
        this.airlineName = airlineName;
        this.origin = origin;
        this.destination = destination;
    }
}

class Passenger {
    constructor(id, name, gender, ticket){
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.ticket = ticket
    }
}

class Ticket {
    #seatNumber
    constructor(airlineName, type, origin, destination, seatNumber){
        this.airlineName = airlineName;
        this.type = type;
        this.origin = origin;
        this.destination = destination;
        this.#seatNumber = seatNumber
    }
    get seatNum(){
        return this.#seatNumber
    }

    set seatNum(value){
        this.#seatNumber = value
    }
}

class VIP extends Ticket{
    constructor(airlineName, origin, destination, seatNumber){
        super(airlineName, 'VIP', origin, destination, seatNumber)
    }
}
class Business extends Ticket{
    constructor(airlineName, origin, destination, seatNumber){
        super(airlineName, 'Business', origin, destination, seatNumber)
    }
}
class Economy extends Ticket{
    constructor(airlineName, origin, destination, seatNumber){
        super(airlineName, 'Economy', origin, destination, seatNumber)
    }
}

class Factory {
    static createTicket(type, airlineName, origin, destination, seatNumber, cb){
        if(type === 'VIP'){
            cb(new VIP(airlineName, origin, destination, seatNumber))
        }else if(type === 'Business'){
            cb(new Business(airlineName, origin, destination, seatNumber))
        }else if(type === 'Economy'){
            cb(new Economy(airlineName, origin, destination, seatNumber))
        }
    }
}

module.exports = {
    Plane,
    Passenger,
    Factory
}