const { sendError } = require('../infra/response/defaultResponse');
const authService = require('../services/authService');

const requireAuth = (req, res, next) => {
  const authorization = req.get('authorization');
  const [scheme, token, extra] = typeof authorization === 'string' ? authorization.split(' ') : [];

  if (scheme !== 'Bearer' || !token || extra || !authService.verifyToken(token)) {
    return sendError(res, 'Unauthorized', 401);
  }

  return next();
};

module.exports = {
  requireAuth,
};
