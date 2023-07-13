const userModel = require("../model/user.Schema")
const emailValidator = require('deep-email-validator');

const singup = async (req, res) => {
    const { name, email, password, confrimPassword } = req.body
    console.log(name, email, password, confrimPassword)
    try {
        if(!name || !email || !password || !confrimPassword){
            return res.status(400).json({
                success: false,
                message: "Ever Field is required"
            })
        }
        // check for valid Email format
        
        let ValidEmail = emailValidator.validate(email)
        if (!ValidEmail) {
            return res.status(400).json({
                success: false,
                message: "please provide valid email"
            })
        }
        if (password !== confrimPassword) {
            return res.status(400).json({
                success: false,
                message: "Password & confrim password don't match"
            })
        }

        const userInfo = userModel(req.body)
        const result = await userInfo.save()
        return res.status(200).json({
            success: true,
            data: result
        })

    } catch (e) {
        if (e.code  === 11000) {
            return res.status(400).json({
                success: false,
                message: "Account is already exists"
            })
        }
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }

}

const signin = async (req , res) =>{
    const {email, password} = req.body
    if( !email || !password ){
        return res.status(400).json({
            success: false,
            message: "Ever Field is required"
        })
    }
    // check for valid Email format
    
    let ValidEmail = emailValidator.validate(email)
    if (!ValidEmail) {
        return res.status(400).json({
            success: false,
            message: "please provide valid email"
        })
    }
    try{
        const user = userModel
        .findOne({
            email     
        })
        .select("+password")
        if(!user ||   password !== user.password ){
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }
    }catch(e){

    }

}

module.exports = {
    singup,
    signin
}