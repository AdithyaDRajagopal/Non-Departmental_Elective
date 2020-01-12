const jwt = require('jsonwebtoken');
var config = require('../config/api.json');
const secret = config.API_SECRET; //+ user's unique secret";

function jwtVerifyToken(req, res, next)
{
  console.log(req.headers);
  console.log(req.query.token)
  
  const token = req.headers.token || req.query.token || req.session.token;
  console.log(token)

  if (!token)
  {
    console.log('no token');
    return res.status(403).send({ auth : false, message : 'No token provided.' });
  }
  return jwt.verify(token, secret, function(err, decoded)
  {
    if (err)
    {
      console.log('failed verification');
      return res.status(500).send({ auth : false, message : 'Failed to authenticate token.' });
    }

    // if everything good, save to request for use in other routes
    console.log('everything good');
    console.log(decoded);
    req.userID = decoded.id;
    req.token = token
    req.decoded = decoded;
  
    // console.log(req.body);
    if(req.url.startsWith('/student')){
      if(decoded.type == 'student')
        return next();
      else
      return res.status(500).send({ auth : false, message : 'Not enough types.' });
    }
    return next();
   
  });
}
module.exports = jwtVerifyToken;