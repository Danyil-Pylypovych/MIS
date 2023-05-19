const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const config = require('../config/db')

const patientSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    }
})

const patient = module.exports = mongoose.model('patient', patientSchema)

module.exports.getPatientByLogin = function(name, callback) {
    const query = {name: name}
    patient.findOne(query)
}

module.exports.getPatientByID = function(id, callback) {
    patient.findById(id, callback)
}

module.exports.addPatient = async function(newPatient, callback) {
    const addpat = new patient(newPatient)
    addpat.save().then(() => console.log("Yes"))
}

module.exports.comparePass = function(passFromPatient, patientDBPass, callback) {
    bcrypt.compare(passFromPatient, patientDBPass, function(err, isMatch) {
        if(err) throw err
        callback(null, isMatch)
    })
}