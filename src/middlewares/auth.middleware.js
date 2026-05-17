import jwt from 'jsonwebtoken';


async function authenticate(req, res, next) {
    const sessionId = req.cookies?.sessionId;
    if (!sessionId) {
        return res.redirect('/login/user');
    }
    const userData = jwt.verify(sessionId, process.env.JWT_SECRET);
    
    if (!userData) {
        return res.redirect('/login/user');
    }
    req.userData = userData; 
    return next();
}

export default authenticate;