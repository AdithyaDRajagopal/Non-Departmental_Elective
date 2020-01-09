const express = require('express')
const router = express.Router()
const importExcel = require('convert-excel-to-json')

const methods = require('../../methods')

router.get("/dashboard", (req,res,next) => {
    methods.advisor.getAdvisorDetails(req.decoded.id)
    .then(result => {
        dept = result.dataValues.deptID
        methods.elective.getElecDept(dept)
        .then(re => {
            res.render('advisor', {title : 'Advisor Dashboard',elective:re});
        })
        .catch(er => {
            console.log(er)
        })
    })
    .catch(err => {
        console.log(err)
    })
})

router.post("/upload", (req,res) => {
    methods.advisor.getAdvisorDetails(req.decoded.id)
        .then(result => {
        let file = req.files.myFile;
        let filename = file.name;
        let details = [];
        dept = result.dataValues.deptID
        file.mv('./excel/'+filename,(err)=>{
                if(err) {
                        console.log(err)
                }
                else{
                        let result = importExcel({
                                        sourceFile: './excel/' +filename,
                                        header : {rows:1},
                                        columnToKey : {A:'RegID',B:'Name',C:'email',D:'cgpa'},
                                        sheets : ['Sheet1']
                        });
                        for(var i=0;i<result.Sheet1.length;i++){
                                methods.student.addStudent(result.Sheet1[i],dept);
                        }
                        console.log(details)
                }
        })
        res.redirect("/advisor/dashboard")
    })
    .catch(err => {
            console.log(err)
    })
})



module.exports = router;