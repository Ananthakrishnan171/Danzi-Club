const rateLimit = {};

const limitRate = (maxRequests = 100, windowMs = 15 * 60 * 1000) => {
  return (req, res, next) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || 'global';
    const now = Date.now();

    if (!rateLimit[ip]) {
      rateLimit[ip] = {
        resetTime: now + windowMs,
        count: 1
      };
      return next();
    }

    const tracker = rateLimit[ip];
    if (now > tracker.resetTime) {
      tracker.resetTime = now + windowMs;
      tracker.count = 1;
      return next();
    }

    tracker.count += 1;
    if (tracker.count > maxRequests) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests from this IP, please try again later.'
      });
    }

    next();
  };
};

module.exports = { limitRate };
