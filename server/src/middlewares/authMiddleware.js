const jwt = require('jsonwebtoken');

const requireSignIn = (req , res, next) => {
    try {
        let token = req.headers.authorization || req.headers.Authorization;

        if (!token) {
            return res.status(401).send({ status: false, message: "Token is missing" });
        }
        
        if (token.startsWith("Bearer ")) {
            token = token.slice(7).trim();
        }

        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        console.log(decoded);

        if(decoded) {
            req.user = decoded;
            next();
        } else {
            return res.status(401).send({ status: false, message: "Invalid user" });
        }
    } catch(err) {
        console.log(err);
        res.status(401).send({status:false , message:"Unauthorized", error: err.message});
    }
}

module.exports = { requireSignIn };