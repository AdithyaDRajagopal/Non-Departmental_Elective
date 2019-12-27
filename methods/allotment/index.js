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
        models.result.destroy({
            where : {},
            truncate : true
        })
        .then(rest => {
            methods.student.generateRankList()
            .then(re1 => {
                var dic = {"student":re1}
                let student = []
                for (let i=0; i<dic["student"].length; i+=1) {
                student.push(dic["student"][i].dataValues);
                }
                for(let x=0;x<student.length;x++){
                    var sid = student[x].id
                    methods.student.viewChoice(sid)
                    .then(re2 => {
                        var dic2 = {"choice":re2}
                        let choice = []
                        for (let i=0; i<dic2["choice"].length; i+=1) {
                        choice.push(dic2["choice"][i].dataValues);
                        }
                        for(let y=0;y<choice.length;y++){
                            var cid = choice[y].CID
                            methods.course.getCourse(cid)
                            .then(re3 => {
                                var dic3 = {"course":re3}
                                let course = []
                                for (let i=0; i<dic3["course"].length; i+=1) {
                                course.push(dic3["course"][i].dataValues);
                                }
                                if(course[0].filled < course[0].capacity)
                                {
                                    methods.result.addResult(cid,sid)
                                    .then(re => {
                                        console.log(re)
                                        break
                                    })
                                    .catch(er => {
                                        console.log(er)
                                    })
                                    methods.course.fill(cid)
                                    .then(r2 => {
                                        console.log(r2)
                                    })
                                    .catch(e2 => {
                                        console.log(e2)
                                    })
                                }
                            })
                            .catch(er3 => {
                                console.log(er3)
                            })
                        }
                    })
                    .catch(er2 => {
                        console.log(er2)
                    })
                }
            })
            .catch(er => {
                console.log(er)
            })
        })
}


module.exports = allotmentMethods