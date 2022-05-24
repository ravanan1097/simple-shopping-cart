
const auth = (req, res, next) => {
    try {
        let role =req.role;
        if(role!=='Admin') return res.status(403).json({message:"User not authorized"});
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err.message)
    }
    return next();

};

module.exports = auth;