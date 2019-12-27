const methods = {};     

methods.advisor = require('./advisor')
methods.user = require('./user')
methods.department = require('./department')
methods.course  = require('./course')
methods.student  = require('./student')
methods.elective = require('./elective')
methods.allotment = require('./allotment')
methods.authentication = require('./authentication')
methods.filltables = require('./filltables')
methods.HOD = require('./HOD')
methods.result = require('./result')

module.exports = methods;