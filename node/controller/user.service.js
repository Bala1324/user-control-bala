const moment = require("moment");
const database = require('../helper/db.js');
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const user = database.users;
const bcrypt = require("bcrypt");
const mailTransport = nodemailer.createTransport({
	"service": "gmail",
	"auth": {
		user: "balachandiran132@gmail.com",
		pass: "1324bala1324"
	}
});

module.exports = {
	registerUser,
	loginUser,
	verifyEmail,
	forgetPassword

}

// register user
async function registerUser(req, res) {
	console.log(req.body);
	let email = req.body.email;
	let details = {
		from: "balachandiran132@gmail.com",
		to: email,
		subject: "Wellcome to Food Park",
		text: "You have successfullly registered...."
	}
	let name = req.body.name;
	let password1 = req.body.password;
	const email_detail = await user.find({ "email": email }).exec();
	if (email_detail.length > 0) {
		throw res.json({ "status": "Failed", "message": "email already exists" });
	}
	const mobile_Availab = await user.find({ "name": name }).exec()
	if (mobile_Availab.length > 0) {
		throw res.json({ "status": "Failed", "message": "name already exists" });
	}
	let users = new user(req.body);
	if (password1) {
		let password = req.body.password;
		let salt = await bcrypt.genSalt(10);
		users.password = bcrypt.hashSync(password, salt);
		users.save();
		console.log(users);
		sendMail(details);
		res.json({ "status": "Success", "message": "Register successfully" });
	} else {
		res.json({ "status": "Failed", "message": "Please Provide password" });
	}
};


//Login user
async function loginUser(req, res) {
	console.log(req.body)
	let email = req.body.email;
	let password = req.body.password;
	let users = await user.findOne({ "email": email }).exec();
	if (users) {

		console.log(users);
		let pass = users.password;
		console.log(pass);
		let match = await bcrypt.compare(password, pass);

		if (match) {
			res.json({ "status": "Success", "message": "Login successfully", "user": users });
		} else {
			res.json({ "status": "Failed", "message": "password wrong" });
		}
	} else {

		res.json({ "status": "Failed", "message": "User not Registered" });
	}
}


// forget password
async function forgetPassword(req, res) {
	try {
		let email = req.body.emailid;
		let NewPassword = req.body.password;
		let users = await user.findOne({ "email": email }).exec();
		let salt = await bcrypt.genSalt(10);
		let pass = bcrypt.hashSync(NewPassword, salt);
		const data = await user.findOneAndUpdate({ email: email }, { password: pass }, { new: true }).exec()
		res.json({ "status": "Success", "message": "Password changed", "data": data });
	} catch (err) {
		res.json({ "status": "Failed", "message": err.message });
	}

};

// forget password
async function verifyEmail(req, res) {
		let email = req.body.email;
		let users = await user.findOne({ "email": email }).exec();
		
		
		if(users){
			let otp = generateRandomString(6);
			let details = {
				from: "balachandiran132@gmail.com",
				to: email,
				subject: "Wellcome to Food Park",
				text: "Your OTP is "+ otp
			}
			sendMail(details);
			console.log(otp);

			res.json({ "status": "Success", "message": "Correct Email", "otp": otp });

		}else{
			res.json({ "status": "Failed", "message": "Wrong email id" });

		}
	

};

// // Reset Password
// async function resetPassword(req, res) {

// 	let email = req.body.email;
// 	let oldpassword = req.body.password;
// 	let NewPassword = req.body.confirmPassword;
// 	let users = await user.findOne({ "email": email }).exec();
// 	if(users){
// 		let pass = users.password;
// 	let match = await bcrypt.compare(oldpassword, pass);
// 	if (!match) {
// 		res.json({ "status": "Failed", "message": "Please enter the correct password" });
// 	} else {
// 		let salt = await bcrypt.genSalt(10);
// 		let pass = bcrypt.hashSync(NewPassword, salt);
// 		const data = await user.findOneAndUpdate({ email: email }, { password: pass }, { new: true }).exec()
// 		res.json({ "status": "Success", "message": "Password changed", "data": data });
// 	}

// 	}else{
// 		res.json({ "status": "Failed", "message": "Wrong Email id."});

// 	}
	
// }


function sendMail(details) {

	let mailData;
	mailData = {
		from: details.from,
		to: details.to,
		subject: details.subject,
		text: details.text
	}
	mailTransport.sendMail(mailData, function (err, data) {
		if (err) {
			console.log(err)
		} else {
			console.log("Email sent");
		}
	})
}


// forget password
async function verifyOTP(req, res) {
	let email = req.body.email;
	let otp = generateRandomString(6);

	let users = await user.findOne({ "email": email }).exec();
	if(users){
		res.json({ "status": "Success", "message": "Correct Email" });

	}else{
		res.json({ "status": "Failed", "message": "Wrong email id" });

	}


};



function generateRandomString(length){
    var chars = '0123456789';
    var random_string = '';
    if(length > 0){
      for(var i=0; i < length; i++){
          random_string += chars.charAt(Math.floor(Math.random() * chars.length));
      }
  }
    return random_string;
}
// alert(generateRandomString(10));