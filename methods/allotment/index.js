const Promise = require('bluebird');

const models = require('../../models');
// const obtainInformation = require('./obtainInformation');
const Sequelize = require('sequelize');
var { sequelize } = models;
// const methods = require('../../methods');
const methods = require('../../methods')
const Op = Sequelize.Op;

var allotmentMethods = {}

allotmentMethods.allot = function() {
    methods.student.generateRankList()
    .then(res => {
        var dic = {"student":res}
                    let student = []
                    for (let i=0; i<dic["student"].length; i+=1) {
                    student.push(dic["student"][i].dataValues);
                    }
                    for(let x=0;x<student.length;x++){
                        methods.student.viewChoice(student[x].id)
                        .then(re2 => {
                            
                            var dic2 = {"choice":re2}
                            let choice = []
                            for (let i=0; i<dic2["choice"].length; i+=1) {
                            choice.push(dic2["choice"][i].dataValues);
                            }
                            for(let y=0;y<choice.length;y++){
                                methods.course.getCourse(choice[y].courseID)
                                .then(re3 => {
                                    var dic3 = {"course":re3}
                                    let course = []
                                    for (let i=0; i<dic3["course"].length; i+=1) {
                                    course.push(dic3["course"][i].dataValues);
                                    }
                                    if(course[0].filled < course[0].capacity)
                                    {   
                                        methods.result.addResult(course[0].courseID,student[x].id,course[0].name,student[x].name)
                                        .then(re => {
                                            console.log(course[0].courseID + "+" + student[x].id + "+" + course[0].name + "+" + student[x].name)
                                            y=choice.length
                                        })
                                        .catch(er => {
                                            console.log(er)
                                        })
                                        methods.course.fill(course[0].courseID,course[0].filled)
                                        .then(r2 => {
                                        })
                                        .catch(e2 => {
                                            console.log(e2)
                                        })
                                    }
                                })    
                            }    
                        })    
                    }    
    })
    .catch(err => {
        console.log(err)
    })
}


module.exports = allotmentMethods