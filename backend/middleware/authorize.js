const User = require('../models/User');

const authorize = (roles)=>{
  return async (req, res, next) =>{
    try{

      console.log('User from request:', req.user);
      const user = await User.findById(req.user.id);

      if(!user){
        return res.status(401).json({msg: 'User not found'});
      }

      if(!roles.includes(user.role)){
        return res.status(403).json({msg:'Access denied'});
      }

      next();
    }catch(err){
      console.error('Error in authorize middleware:', err);
      res.status(500).json({ msg: 'Server error', err });
    }
  }
};

module.exports = authorize;