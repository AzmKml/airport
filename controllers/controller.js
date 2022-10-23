"use strict"
const Model = require('../models/model')
const View = require('../views/view')



class Controller {
  static help(){
    View.showCommandList();
  }

  static planeList(){
    Model.readPlanes((err, result) => {
      if(err){
        View.showEror(err)
      }else{
        View.planeList(result)
      }
    })
  }

  static passengerList(){
    Model.passenger((err, result) =>{
      if(err){
        View.showEror(err)
      }else{
        View.passengerList(result)
      }
    })
  }

  static checkSeats(num){
    Model.checkSeat(num, (err, result) => {
      if(err){
        View.showEror(err)
      }else{
        View.availableSeats(result)
      }
    })
  }

  // PART 2
  static buyTicket(flightNum, name, gender, seatNumber, ticketType){
    Model.addPassenger(flightNum, name, gender, seatNumber, ticketType, (err, result)=>{
      if(err){
        View.showEror(err)
      }else{
        View.buyTicket(result)
      }
    })
  }

  static ticketInfo(id){
    Model.findPassenger(id, (err, result, data) => {
      if(err){
        View.showEror(err)
      }else{
        View.ticketInfo(result)
      }
    })
  }

  static changeTicket(idNum, flightNum, seatNum){
    Model.updateTicket(idNum, flightNum, seatNum, (err, result) =>{
      if(err){
        View.showEror(err)
      }else{
        View.changeTicket(result)
      }
    })
  }

  static cancelTicket(id){
    Model.deleteTicket(id, (err, result)=>{
      if(err){
        View.showEror(err)
      }else{
        View.cancelTicket(result)
      }
    })
  }

  static showPassenger(flightNum){
    Model.showPassenger(flightNum, (err, result) => {
      if(err){
        View.showEror(err)
      }else{
        View.showPassenger(result)
      }
    })
  }
}

module.exports = Controller