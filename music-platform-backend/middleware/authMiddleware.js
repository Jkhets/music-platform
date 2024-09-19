const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  console.log('Token:', token); // Log token

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('JWT Verification Error:', err);
      return res.sendStatus(403);
    }
    console.log('Decoded User:', user);
    req.user = user;
    next();
  });
};

const authorizeArtist = (req, res, next) => {
  console.log('User Role:', req.user.role); // Log role

  if (req.user.role !== 'artist') return res.sendStatus(403);
  next();
};

module.exports = { authenticateToken, authorizeArtist };