// import module.................................
const userModel = require("../model/user.Schema");
const emailValidator = require("deep-email-validator");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken")
// singup.........................................
const singup = async (req, res) => {
  const { name, email, password, confrimPassword,bio } = req.body;
  console.log(name, email, password, confrimPassword,bio);
  try {
    if (!name || !email || !password || !confrimPassword || !bio ) {
      return res.status(400).json({
        success: false,
        message: "Ever Field is required",
      });
    }
    // check for valid Email format

    let ValidEmail = emailValidator.validate(email);
    if (!ValidEmail) {
      return res.status(400).send({
        success: false,
        message: "please provide valid email",
      });
    }
    if (password !== confrimPassword) {
      return res.status(400).send({
        success: false,
        message: "Password & confrim password don't match",
      });
    }
    // ...................................................
    const userInfo = userModel(req.body);
    const result = await userInfo.save();
    return res.status(200).send({
      success: true,
      data: result,
    });
  } catch (e) {
    if (e.code === 11000) {
      return res.status(400).send({
        success: false,
        message: "Account is already exists",
      });
    }
    return res.status(400).send({
      success: false,
      message: e.message,
    });
  }
};

// signin.........................................

const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({
      success: false,
      message: "Ever Field is required",
    });
  }
  // check for valid Email format

  let ValidEmail = emailValidator.validate(email);
  if (!ValidEmail) {
    return res.status(400).send({
      success: false,
      message: "please provide valid email",
    });
  }
  try {
    const user = await userModel
      .findOne({
        email,
      })
      .select("+password");
    if (!user || !( await bcrypt.compare(password, user.password))) {
      return res.status(400).send({
        success: false,
        message: "Invalid credentials",
      });
    }
    const token = await  user.jwtToken();
    // user.password = undefined;
    const cookieOptions = {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    };
    res.cookie("token", token, cookieOptions);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (e) {
    return res.status(400).send({
      success: false,
      message: e.message,
    });
  }
};
// user get.......................................
const getUser = async (req, res) => {
  const UserId = req.user.id;

  try {
    const user = await userModel.findById(UserId);
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (e) {
    return res.status(400).send({
      success: false,
      message: e.message,
    });
  }
};
// fogotPassword............................
const fogotPassword = async (req, res) => {
  const email = req.body.email
  if (!email) {
    return res.status(400).send({
      success: false,
      message: "Email is required",
    });

  }
  try {
    const user = await userModel.findOne({
      email
    })

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "user not exist",
      });
    }

    const forgotPasswordToken = user.getForgotPasswordToken()
    await user.save()
    return res.status(200).send({
      success: true,
      token: forgotPasswordToken,
    });

  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message,
    });
  }
}

// reset password.....................
const resetPassword = async (req, res, next) => {
  const { token } = req.params
  const { password, confrimPassword } = req.body

  if (!password || !confrimPassword) {
    return res.status(400).send({
      success: false,
      message: "password and confrimpassword is required"

    })
  }
  const hashToken =
    crypto.createHash("sh256").update(token).digest("hex")
  try {
    const user = await  userModel.findOne({
      forgotPasswordToken:hashToken,
      forgotPasswordExpireTime:{
        $gt :new Date()
      }
    })

    if(!user){
      return res.status(400).send({
        success: false,
        message: "invalid Token or token is expired",
      });
    }
    // check the passwords match
user.password = password
await user.save()
user.forgotPasswordExpireTime = undefined
user.forgotPasswordToken = undefined
user.password= undefined

return res.status(200).send({
  success:true,
  data:user
})

}catch(e){
  return res.status(400).send({
    success: false,
    message: e.message

  })
}


}






// logout.........................................

const logout = (req, res) => {
  try {
    const cookieOptions = {
      expires: new Date(),
      httpOnly: true

    }
    res.cookie("token", null, cookieOptions)
    return res.status(200).json({
      success: true,
      message: "Logout!"
    })



  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

// .................. export it to use wherever needed

module.exports = {
  singup,
  signin,
  getUser,
  logout,
};
