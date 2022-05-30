const User = require("../models/userModel");
const validationerror = require("../middleware/validationError");

const { v4: uuidv4 } = require('uuid')
const moment = require("moment")

class UserController {

    async addUser(req, res, next) {

        // console.log("from User add controller");
            let name = req.body.name;
            let userId = uuidv4();
            let email = req.body.email;
            let mobileNumber = req.body.mobileNumber;
            let hostelName = req.body.hostelName;
            let roomNumber = req.body.roomNumber;
            let gender = req.body.gender;

            let userAdd = new User({
                userId: userId,
                name: name,
                email: email,
                mobileNumber: mobileNumber,
                hostelName: hostelName,
                roomNumber: roomNumber,
                gender: gender,
                createdAt: moment(Date.now()).unix()
            })

            await userAdd.save()
            return res.status(200).json({ "message": "Student Added" })

        

    };


    // important: Watchman query will be directed here
    async findUser(req, res, next) {

        try {
            const userRes = await User.findOne({ mobileNumber: req.body.mobileNumber });
            if(userRes){
                res.status(200).json({
                    userRes
                // reviews:[
                //     Review
                // ]
            });
            }
           

        } catch (error) {
            return next(new validationerror(error.message, 400));
        }
    };

//     async findAllUsers(req, res, next) {

//         try {
//             const UserRes = await User.find().populate({
//                 path: "reviews",
//                 select: 'title description rating userId reviewId'
//             });
//             res.status(200).json({
//                 results:UserRes.length,
                
//                     UserRes
                
//                 // reviews:[
//                 //     Review
//                 // ]
//             });

//         } catch (error) {
//             return next(new validationerror(error.message, 400));
//         }
//     };

//     async deleteUser(req,res,next){
//         // let userId = req.params.userId;
//         let UserId = req.params.UserId;
//         // const delUser =  await foodData.findByIdAndDelete(req.params.id);
//         const delUser =  await User.deleteOne({UserId: UserId});
//         if(!delUser)
//         {
//             return next(new validationerror('No food found with that ID', 404));
//         }
//          res.send("Done");

// };

}

const userController = new UserController()
module.exports = userController
