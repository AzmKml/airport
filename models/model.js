"use strict"
let fs = require('fs')
const { passengerList } = require('../views/view.js')
const {
  Plane,
  Passenger,
  Factory
} = require("./class.js")


class Model {
  static readPlanes(cb){
    fs.readFile('./data/plane.json', 'utf8', (err, data) =>{
      if(err){
        cb(err, null)
      }else{
        let parsedData = JSON.parse(data)
        let result = parsedData.map(el => new Plane(el.flightNumber, el.airlineName, el.origin, el.destination))
        cb(null, result);
      }
    }) 
  }
  static readPassengers(cb){
    fs.readFile('./data/passanger.json', 'utf8', (err, data) =>{
      if(err){
        cb(err, null)
      }else{
        let parsedData = JSON.parse(data)
        let result  = parsedData.map((el) => {
          let tiket; 
          Factory.createTicket(el.ticket.type, el.ticket.airlineName, el.ticket.origin, el.ticket.destination, el.ticket.seatNumber, (ticket) =>{
            tiket = ticket}); 
          return new Passenger(el.id, el.name, el.gender, tiket) 
        })
        cb(null, result)
      }
    }) 
  }

  static passenger(cb){
    this.readPassengers((err, result) => {
      if(err){
        cb(err, null)
      }else{
        let resultView = result.map((el) => {return {id: el.id, name: el.name, gender: el.gender, airlineName: el.ticket.airlineName}})
        cb(null, resultView);
      }
    })
  }

  static checkSeat(num, cb){
    this.readPlanes((err, data)=>{
      if(err){
        cb(err, null)
      }else{
        let foundPlane = data.find(el =>{
          return el.flightNumber === num
        })
        if(!foundPlane){
          cb(`Plane not found, please check your input`, null)
        }else{
          this.readPassengers((err, data1)=>{
            if(err){
              cb(err, null)
            }else{
              foundPlane.passangers = data1.filter(elem =>{ 
                return (elem.ticket.airlineName == foundPlane.airlineName)
              })
              cb(null, foundPlane)
            }
          })  
        }
      }
    })
  }

  static save(input, pathFile, cb){ 
    let stringify = JSON.stringify(input, null, 2)
    fs.writeFile(pathFile, stringify, 'utf-8', (err) =>{
      if(err){
        cb(err, null)
      }else{
        cb(null, input)
      }
    })
  }

  static addPassenger(flightNum, name, gender, seatNumber, ticketType, cb){ // buyTicket
    if(seatNumber.split('-')[0] > 'D' || seatNumber.split('-')[1] > 8){
      cb(`Seat not found, please pick column A-D and row 1-8 with format A-1`, null)
    }else{
      this.checkSeat(flightNum, (err, result)=>{
        if(err){
          cb(err, null)
        }else{
          this.bookedSeat(flightNum, seatNumber, (err, result1)=>{
            if(err){
              cb(err,null)
            }else{
              this.readPassengers((err1, data)=>{
                if(err1){
                  cb(err1, null)
                }else{
                  let newId = data.length ? data[data.length - 1].id + 1 : 1
                  let newTicket;
                  Factory.createTicket(ticketType, result.airlineName, result.origin, result.destination, seatNumber, result => newTicket = result)
                  let newPassenger = new Passenger(newId, name, gender, newTicket)
                  data.push(newPassenger)
                  let converted = data.map((el,i) =>{
                    let convert = JSON.parse(JSON.stringify(el))
                    convert.ticket.seatNumber = data[i].ticket.seatNum
                    return convert
                  })
                  this.save(converted, './data/passanger.json', (err2)=>{
                    if(err2){
                      cb(err2, null)
                    }else{
                      cb(null, newPassenger)
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  }

  static findPassenger(idPassenger, cb){ // ticketInfo
    this.readPassengers((err, data) =>{
      if(err){
        cb(err, null, null)
      }else{
        let idFound = data.find(el =>{
          return el.id === idPassenger
        })
        if(!idFound){
          cb(`Passanger not found, please check your input`, null, null)
        }else{
          cb(null, idFound, data)
        }
      }
    })
  }

  static bookedSeat(flightNum, seatNumber, cb){
    this.checkSeat(flightNum, (err, result)=>{
      if(err){
        cb(err, null)
      }else{
        let booked = result.passangers.find((el) => {
            return el.ticket.seatNum === seatNumber
          })
        if(booked){
          cb(`Seat already been booked, please choose another seat`, null)
        }else{
          cb(null, result)
        }
      }
    })
  }

  static updateTicket(idNum, flightNum, seatNumber, cb){
    if(seatNumber.split('-')[0] > 'D' || seatNumber.split('-')[1] > 8){
      cb(`Seat not found, please pick column A-D and row 1-8 with format A-1`, null)
    }else{
      this.findPassenger(idNum, (err, result, allPassenger)=>{
        if(err){
          cb(err, null)
        }else{
          this.bookedSeat(flightNum, seatNumber, (err1, result1) =>{
            if(err1){
              cb(err1, null)
            }else{
              result.ticket.airlineName = result1.airlineName
              result.ticket.origin = result1.origin
              result.ticket.destination = result1.destination
              result.ticket.seatNum = seatNumber
              
              let converted = allPassenger.map((el,i) =>{
                let convert = JSON.parse(JSON.stringify(el))
                convert.ticket.seatNumber = allPassenger[i].ticket.seatNum
                return convert
              })
              this.save(converted, './data/passanger.json', (err2)=>{
                if(err2){
                  cb(err2, null)
                }else{
                  cb(null, result)
                }
              })
            }
          })
        }
      })
    }
  }

  static deleteTicket(idNum, cb){
    this.findPassenger(idNum, (err, result, allPassenger)=>{
      if(err){
        cb(err, null)
      }else{
        let deleted = result
        let data = allPassenger.filter(el =>{
          if(el.id !== idNum) return el
        })
        //SAVE DATA
        let converted = data.map((el,i) =>{
          let convert = JSON.parse(JSON.stringify(el))
          convert.ticket.seatNumber = data[i].ticket.seatNum
          return convert
        })
        Model.save(converted, './data/passanger.json', (err2)=>{
          if(err2){
            cb(err2, null)
          }else{
            cb(null, deleted)
          }
        })
      }
    })
  }

  static showPassenger(flightNum, cb){
    this.checkSeat(flightNum, (err, data)=>{
      if(err){
        cb(err, null)
      }else{
        cb(null, data)
      }
    })
  }
}

module.exports = Model