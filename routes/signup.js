const express = require('express')
const router = express.Router()

const checkNotLogin = require('../middlewares/check').checkNotLogin

// GET /signup 注册页
router.get('/', checkNotLogin, function(req, res, next) {
  res.render('signup')
})

// POST /signup 用户注册
router.post('/', checkNotLogin, function(req, res, next) {
  if (!checkParams(req.fields)) {
    res.send('signup111')
  }
  res.send('signup')
})

function checkParams(params) {
  const { name, gender, bio, avatar, password, repassword } = params
  if (name || name.trim() ) {
    
  }
}

module.exports = router
