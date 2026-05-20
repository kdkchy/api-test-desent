const crypto = require('crypto');

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'password';
const TOKEN_SECRET = process.env.AUTH_TOKEN_SECRET || 'dev-auth-token-secret';

const sign = (payload) => {
  return crypto.createHmac('sha256', TOKEN_SECRET).update(payload).digest('base64url');
};

const createToken = (username) => {
  const payload = Buffer.from(JSON.stringify({ username })).toString('base64url');
  const signature = sign(payload);

  return `${payload}.${signature}`;
};

const createTokenForCredentials = ({ username, password } = {}) => {
  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return {
      error: {
        message: 'Invalid username or password',
        statusCode: 401,
      },
    };
  }

  return {
    data: {
      token: createToken(username),
    },
  };
};

const verifyToken = (token) => {
  if (typeof token !== 'string') {
    return false;
  }

  const [payload, signature, extra] = token.split('.');

  if (!payload || !signature || extra) {
    return false;
  }

  const expectedSignature = sign(payload);

  if (
    signature.length !== expectedSignature.length ||
    !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
  ) {
    return false;
  }

  try {
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));

    return decoded.username === ADMIN_USERNAME;
  } catch (error) {
    return false;
  }
};

module.exports = {
  createTokenForCredentials,
  verifyToken,
};
