let {studentValidator, teacherValidator} = require('./joi')

let validator = {
    studentValidator: (payload) => studentValidator(payload),
    teacherValidator: (payload) => teacherValidator(payload)
}

module.exports = validator
