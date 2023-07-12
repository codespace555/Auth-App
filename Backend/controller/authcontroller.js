
const singup = (req, res) => {
    const { name, email, password, confrimPassword } = req.body
    console.log(name, email, password, confrimPassword )
    return res.status(200).json({
        success: true,
        data: {}
    })
}



module.exports = {
    singup,
}