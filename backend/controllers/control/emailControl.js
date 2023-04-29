const nodemailer = require("nodemailer");
require("dotenv").config();
exports.email = async(req,res) => {
  try {
    const {name,email,message}  = req.body
    console.log(name,email,message)
    // Create a transporter to send the email
    const transporter = nodemailer.createTransport({
      service:"gmail",
      auth:{
        user:process.env.Email,
        pass:process.env.Pass,
      }
    });
    // send the email 
    let info = await transporter.sendMail({
      from:`"${name}" <${email}>`,
      to:"abdulrhman.mahmoud44@gmail.com",
      subject:"New messgae from your portfolio",
      text:message,
    });
    console.log("Message sent: %s",info.messageId)
    res.send("Email sent successfull!")
  }catch(err){
    console.log(err)
    res.status(500).send("Error sending email")
  }
}