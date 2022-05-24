const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken =  (req, res, next) => {

        let reqtoken;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization;
            reqtoken=token.split(' ')[1];
        }
        if (!reqtoken) {
            return res.status(401).json("Not Authorized to access this route");
        }
        try {
          jwt.verify(reqtoken, process.env.token_key);

        const decodedToken = jwt.decode(reqtoken, { complete: true });
        let { payload: { userName, role } } = decodedToken;
        req.user = userName
        req.role = role

        
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ status: "Token Error", message: err.message });
    }
    return next();
};

module.exports = verifyToken;