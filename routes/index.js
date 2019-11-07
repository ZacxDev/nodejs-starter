const express = require('express');
const router = express.Router();

/* Index route is just a healthcheck */
router.get('/', function(req, res, next) {
  res.json({
    health: 'healthy',
  });
});

export default router;
