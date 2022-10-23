"use strict"

const { table, Console } = require("console");


class View {
  static showCommandList(){
        console.log(`Command List
============
node app.js
node app.js help
node app.js planeList
node app.js passengerList <flight_number>
node app.js checkSeats <flight_number>
node app.js buyTicket <flight_number> <passenger_name> <passenger_gender> <seat_number> <ticket_type> 
node app.js ticketInfo <passenger_id>
node app.js changeTicket <passenger_id> <flight_number> <seat_number>
node app.js cancelTicket <passenger_id>
node app.js showPassenger <flight_number>`)
  }

  static planeList(result){
    console.table(result);
  }
  static showEror(result){
    console.log(result)
  }
  static passengerList(result){
    console.table(result);
  }
  static availableSeats(result){
    console.log(`=====================
Flight Number : ${result.flightNumber}
Airline Name : ${result.airlineName}
Origin: ${result.origin}
Destination : ${result.destination}
======================
Seating Plan`);
    let seatingTable = [
      ['A', 'B', 'C', 'D'],
      [' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' '],
    ]
    result.passangers.forEach((el, i) => {
      seatingTable[0].forEach((elem, ind)=>{
        if(el.ticket.seatNum[0] === elem){
          seatingTable[el.ticket.seatNum[el.ticket.seatNum.length -1]][ind] = 'X'
        }
      })
    });
    console.table(seatingTable)
  }

  static buyTicket(result){
    console.log(`Success buy ticket for seat ${result.ticket.seatNum} for ${result.ticket.airlineName} destination to ${result.ticket.destination}`);
  }

  static ticketInfo(result){
    console.log(`this ${result.ticket.type} area booked for ${result.ticket.airlineName} to ${result.ticket.destination} with seat number ${result.ticket.seatNum}`);
  }

  static changeTicket(result){
    console.log(`Ticket has been change to ${result.ticket.airlineName} with ${result.ticket.seatNum}`);
  }

  static cancelTicket(result){
    console.log(`Ticket for ${result.name} has been canceled`);
  }

  static showPassenger(result){
    console.log(`========================
Number      : ${result.flightNumber}
Name        : ${result.airlineName}
Destination : ${result.destination}
========================
      Seating Plan`);
    let seatingTable = [
      ['A', 'B', 'C', 'D'],
      [' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' '],
    ]
    result.passangers.forEach((el, i) => {
      seatingTable[0].forEach((elem, ind)=>{
        if(el.ticket.seatNum[0] === elem){
          let position;
          if(el.gender == 'Male') {
            position = `Mr. ${el.name}`
          } else {
            position = `Mrs. ${el.name}`
          }
          seatingTable[el.ticket.seatNum[el.ticket.seatNum.length -1]][ind] = position
        }
      })
    })
    console.table(seatingTable);
  }
}

module.exports = View