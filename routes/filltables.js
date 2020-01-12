const express = require('express')
var router = express.Router()

var methods = require('../methods')

router.get("/",(req,res) => {
    methods.filltables.addDept("AE","Applied Electronics and Instrumentation Engineering")
    methods.filltables.addDept("EC","Electronics and Communication Engineering")
    methods.filltables.addDept("CS","Computer Science and Engineering")
    methods.filltables.addDept("CE","Civil Engineering")
    methods.filltables.addDept("EE","Electrical and Electronics Engineering")
    methods.filltables.addDept("ME","Mechanical Engineering")
    methods.filltables.addDept("IE","Industrial Engineering")
    methods.filltables.addDept("MA","Department of Mathematics")
    
    methods.filltables.addCourse("AE482","Industrial Automation","AE")
    methods.filltables.addCourse("AE484","Instrumentation System Design","AE")
    methods.filltables.addCourse("EC482","Biomedical Engineering","EC")
    methods.filltables.addCourse("CE482","Environmental Impact Assessment","CE")
    methods.filltables.addCourse("CE484","Applied Earth Systems","CE")
    methods.filltables.addCourse("CE486","Geo Informatics for Infrastructure Management","CE")
    methods.filltables.addCourse("CE488","Disaster Management","CE")
    methods.filltables.addCourse("CE494","Environmental Health and Safety","CE")
    methods.filltables.addCourse("CS482","Data Structures","CS")
    methods.filltables.addCourse("CS486","Object Oriented Programming","CS")
    methods.filltables.addCourse("CS484","Computer Graphics","CS")
    methods.filltables.addCourse("CS488","C# and .NET Programming","CS")
    methods.filltables.addCourse("EE482","Energy Management and Auditing","EE")
    methods.filltables.addCourse("EE484","Control Systems","EE")
    methods.filltables.addCourse("EE486","Soft Computing","EE")
    methods.filltables.addCourse("EE488","Industrial Automation","EE")
    methods.filltables.addCourse("EE494","Instrumentation Systems","EE")
    methods.filltables.addCourse("MA482","Applied Linear Algebra","MA")
    methods.filltables.addCourse("MA484","Operations Research","MA")
    methods.filltables.addCourse("MA486","Advanced Numerical Computations","MA")
    methods.filltables.addCourse("MA488","Cryptography","MA")
    methods.filltables.addCourse("IE482","Financial Management","IE")
    methods.filltables.addCourse("IE484","Introduction to Business Analytics","IE")
    methods.filltables.addCourse("IE486","Design and Analysis of Experiments","IE")
    methods.filltables.addCourse("IE488","Total Quality Management","IE")
    methods.filltables.addCourse("ME484","Finite Element Analysis","ME")
    methods.filltables.addCourse("ME482","Energy Conservation and Management","ME")
    methods.filltables.addCourse("ME471","Optimization Techniques","ME")

    methods.filltables.addCNE("AE482","AE")
    methods.filltables.addCNE("AE484","AE")
    methods.filltables.addCNE("EE484","AE")
    methods.filltables.addCNE("EE494","AE")
    methods.filltables.addCNE("CE482","CE")
    methods.filltables.addCNE("CE484","CE")
    methods.filltables.addCNE("CE486","CE")
    methods.filltables.addCNE("CE488","CE")
    methods.filltables.addCNE("CE494","CE")
    methods.filltables.addCNE("CS482","CS")
    methods.filltables.addCNE("CS484","CS")
    methods.filltables.addCNE("CS486","CS")
    methods.filltables.addCNE("CS488","CS")
    methods.filltables.addCNE("MA488","CS")
    methods.filltables.addCNE("AE482","EE")
    methods.filltables.addCNE("EE482","EE")
    methods.filltables.addCNE("EE484","EE")
    methods.filltables.addCNE("EE486","EE")
    methods.filltables.addCNE("EE488","EE")
    methods.filltables.addCNE("EE494","EE")
    methods.filltables.addCNE("EE484","EC")
    methods.filltables.addCNE("EC482","EC")
    methods.filltables.addCNE("CS486","EC")
    methods.filltables.addCNE("EE482","ME")
    methods.filltables.addCNE("ME482","ME")
    methods.filltables.addCNE("ME484","ME")
    methods.filltables.addCNE("ME471","ME")
    methods.filltables.addCNE("ME471","IE")
    methods.filltables.addCNE("CS486","IE")
    methods.filltables.addCNE("MA484","IE")
    methods.filltables.addCNE("EE488","IE")
    methods.filltables.addCNE("IE482","IE")
    methods.filltables.addCNE("IE484","IE")
    methods.filltables.addCNE("IE486","IE")
    methods.filltables.addCNE("IE488","IE")

    methods.filltables.addElective("EC360","Soft Computing")
    methods.filltables.addElective("CE466","Finite Element Methods")
    methods.filltables.addElective("CE473","Advanced Computational Techniques and Optimization")
    methods.filltables.addElective("EC363","Optimization Techniques")
    methods.filltables.addElective("CS361","Soft Computing")
    methods.filltables.addElective("CS365","Optimization Techniques")
    methods.filltables.addElective("EE361","Object Oriented Programming")
    methods.filltables.addElective("EE362","Data Structures and Algorithms")
    methods.filltables.addElective("EE474","Energy Management and Auditing")
    methods.filltables.addElective("ME362","Control System Engineering")
    methods.filltables.addElective("ME464","Robotics and Automation")
    methods.filltables.addElective("ME372","Operations Research")

    methods.filltables.linkElective("EC360","AE")
    methods.filltables.linkElective("EC360","EC")
    methods.filltables.linkElective("EC363","EC")
    methods.filltables.linkElective("CE473","CE")
    methods.filltables.linkElective("CE466","CE")
    methods.filltables.linkElective("CS361","CS")
    methods.filltables.linkElective("CS365","CS")
    methods.filltables.linkElective("EE361","EE")
    methods.filltables.linkElective("EE362","EE")
    methods.filltables.linkElective("EE474","EE")
    methods.filltables.linkElective("ME362","ME")
    methods.filltables.linkElective("ME464","ME")
    methods.filltables.linkElective("ME372","ME")

    methods.filltables.addCCE("EE484","ME362")
    methods.filltables.addCCE("EE488","ME464")
    methods.filltables.addCCE("MA484","ME372")
    methods.filltables.addCCE("CS486","EE361")
    methods.filltables.addCCE("CS482","EE362")
    methods.filltables.addCCE("ME482","EE474")
    methods.filltables.addCCE("EE486","CS361")
    methods.filltables.addCCE("ME471","CS365")
    methods.filltables.addCCE("MA484","CS365")
    methods.filltables.addCCE("ME471","EC363")
    methods.filltables.addCCE("MA484","EC363")
    methods.filltables.addCCE("ME471","CE473")
    methods.filltables.addCCE("ME484","CE466")
    methods.filltables.addCCE("EE486","EC360")

    res.redirect('/login')
})

module.exports = router