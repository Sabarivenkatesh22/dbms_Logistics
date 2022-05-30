const mongoose = require("mongoose");
// const crypto = require("crypto");
const { uuid } = require("uuidv4");
const moment = require("moment");
const bcrypt = require("bcryptjs");
const otpGenerator = require('otp-generators')
const Schema = mongoose.Schema;
const Hashing = require("../utils/hashing");

const userSchema = new Schema(
    {

        userId: {
            type: String,
            // required:[true,'UserId is must!'],
            unique: true
        },
        name: {
            type: String,
            required: [true, 'Username is must!'],
            unique: true
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            required: [true, 'A user must provide email!'],
            unique: true
        },
        hostelName: {
            type: String,
            default: "Not Updated"
        },
        // Street, Landmark, City, State, Country, Pin-code
        mobileNumber: {
            type: String,
            required: [true, 'please provide your mobilenumber!'],
        },
        roomNumber: {
            type: String,
            required: [true, 'please provide your !'],
        },
        gender: {
            type: String,
            required: [true, 'please provide your gender!']
        },
        createdAt: {
            type: Number,
            // required: [true,'createdAt is must!'],
        },
        verificationToken: {
            type: String
        },
        otp: {
            type: String
        },
        confirmEmailToken: { String },
        // verifySellerToken:{String},
        // passwordResetToken: String,
        passwordResetExpires: Date,
        passwordChangedAt: Date,
        // resetPasswordToken:String,
        token: String,
        confirmEmailHashedToken: String,
        // verifySellerHashedToken: String,
        // MostVisitedProduct:[{
        //   type:String,
        //   enum: ['Clothing','Toys','Sports','Beauty','Automobiles','Books','Media','Natural','Dairy','Food','Accessories']
        // }],
    },

    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);





userSchema.methods.createOTPVerificationToken = function () {
    // const resetToken = crypto.randomBytes(32).toString('hex');
    // this.confirmEmailHashedToken = Hashing.hash(resetToken, resetToken.length);
    console.log("from otp verification");
    let otpGenerate = otpGenerator.generate(6, { upperCaseAlphabets: true, specialChars: true });
    this.otp = otpGenerate + "";
    // console.log(otpGenerate);
    // console.log({ verifyToken }, this.verificationToken);

    return otpGenerate + "";
};

userSchema.methods.otpVerifyToken = function(){
    let otpGenerate = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: true });
    this.otp = otpGenerate;
    console.log(otpGenerate);
    // console.log({ verifyToken }, this.verificationToken);

    return otpGenerate;
}


const User = mongoose.model("user", userSchema);
module.exports = User;
