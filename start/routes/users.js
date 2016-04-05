var express = require('express');
var router = express.Router();
var users = require('../app/models/user');


/* GET users listing. */
router.route('/')
    .get(function(req, res) {

        users.find(function(err, staffs) {
            if (err) {
                res.send(err);
            }
            var t = 0;



            for (var i = 0; i < staffs.length; i++) {
                (function(x) {
                    users.find({"Manager" : staffs[x].id}, function(err, employees) {
                        staffs[x].NumReport = employees.length;
                        console.log("NumReport" + staffs[x].NumReport);
                        t++;
                        if (t == staffs.length) {
                            res.json(staffs);
                            console.log(staffs);
                            res.end();
                        };
                    });

                })(i);


      };

  });
})
    .post(function(req, res) {
        users.findOne({LastID: {$exists: true}}, function (err, userIndex) {
            //res.send("user is " + userIndex.LastID);
            userIndex.LastID = userIndex.LastID + 1;
            userIndex.save();
            var user = new users();

            user.id = userIndex.LastID;
            user.Name.fName = req.body.fName;
            user.Name.lName = req.body.lName;
            user.Title = req.body.Title;
            user.Sex = req.body.Sex;
            user["Start Date"].Month = req.body.Month;
            user["Start Date"].Day = req.body.Day;
            user["Start Date"].year = req.body.year;
            user["Office Phone"].areaCode = req.body.tel_areaCode;
            user["Office Phone"].subCode1 = req.body.tel_subCode1;
            user["Office Phone"].subCode2 = req.body.tel_subCode2;
            user["SMS"].areaCode = req.body.sms_areaCode;
            user["SMS"].subCode1 = req.body.sms_subCode1;
            user["SMS"].subCode2 = req.body.sms_subCode2;
            user.Email = req.body.Email;
            user.Manager = req.body.Manager;


            /* test
             user.id = userIndex.LastID;
             user.Name.fName = "hello";
             user.Name.lName = "world";
             user["Office Phone"].areaCode = "123";
             user["Office Phone"].subCode1 = "4567";
             user["Office Phone"].subCode2 = "6789";
             user.Email = "hello";
             user.Manager = 20;
             */

            console.log(user);
            user.save(function (err) {
                if (err) {
                    res.send(err);
                }
                res.json({message: 'new user created'});
            });
        });

});

//Update, delete
router.route('/:id')
    .get(function(req, res, next) {
     users.findOne({"id": req.params.id}, function (err, staff) {

         res.json(staff);

     });
    })
    .post(function(req, res) {

        users.findOne({"id": req.params.id}, function (err, staff) {
            if (err) {
                res.send(err);
            }
            staff.Name.fName = req.body.fName;
            staff.Name.lName = req.body.lName;
            staff.Title = req.body.Title;
            staff.Sex = req.body.Sex;
            staff["Start Date"].Month = req.body.Month;
            staff["Start Date"].Day = req.body.Day;
            staff["Start Date"].year = req.body.year;
            staff["Office Phone"].areaCode = req.body.tel_areaCode;
            staff["Office Phone"].subCode1 = req.body.tel_subCode1;
            staff["Office Phone"].subCode2 = req.body.tel_subCode2;
            staff.SMS.areaCode = req.body.sms_areaCode;
            staff.SMS.subCode1 = req.body.sms_subCode1;
            staff.SMS.subCode2 = req.body.sms_subCode2;
            staff.Email = req.body.Email;
            staff.Manager = req.body.Manager;
            staff.save(function(err) {
                if(err) {
                    res.send(err);
                }
                res.json({message: "updated"});
            })
            console.log("int put");
        });
    })
    .delete(function(req, res, next) {
        users.findOne({LastID: {$exists: true}}, function (err, userIndex) {
            userIndex.LastID = userIndex.LastID - 1;
            userIndex.save();
            users.findOne({"id": req.params.id}, function (err, staff) {
                if (err) {
                    res.send(err);
                }
                staff.remove(function (err) {
                    if (err) {
                        res.json(err);
                    }
                    res.json({message: "the user deleted"});
                    next();
                });
            });
        });
    });

//------getCurEmployee--------//
/*
router.route("/employees/:id")
    .get(function(req, res) {
        users.find({"id" : req.params.id}), function (err, staffs) {
            if (err) {
                res.send(err);
            }
            res.json({message : "staffs sent"});
        };
    });
*/



module.exports = router;
