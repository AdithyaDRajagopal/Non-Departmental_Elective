const express = require('express')
const router = express.Router()
const readXlsxFile = require('read-excel-file/node');



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
            console.log(file)
            readXlsxFile(req.files.myFile).then((rows) => {
                console.log(rows);
                rows.shift();
               console.log(rows);
               res.redirect("/advisor/dashboard")
              })
              .catch(er=>{
                  console.log(er);
              })
    })
    .catch(err => {
            console.log(err)
    })
})



module.exports = router;