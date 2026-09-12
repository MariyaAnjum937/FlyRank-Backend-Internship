const supabase = require('../../supabase');

const authMiddleware = async (req, res, next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({
            error : 'Access token required'
        });
    }

    const token = authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({
            error : 'Access token required'
        });
    }

    const {data, error} = await supabase.auth.getUser(token);

    if(error || !data.user){
        res.status(401).json({
            error : 'Invalid or expired token'
        });
    }

    req.user = data.user;
    req.token = token;

    next();

}

module.exports = authMiddleware;