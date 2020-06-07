const express = require('express');
const router = express.Router();
const roleValidator = require('../middlewares/roleValidator');

const RoleController = require('../controllers/role.controller');

router.route('/')
  .post(roleValidator, RoleController.createRol)
  .delete(RoleController.removeAllRoles);

module.exports = router;
