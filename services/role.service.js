const Role = require('../models/Role');

function getRoleByName(name) {
  if (name) {
    return Role.findOne({name});
  }

  return null;
}

function storeRole(params) {
  return Role.create(params);
}

function destroyRoles() {
  return Role.remove({});
}

module.exports = {getRoleByName, storeRole, destroyRoles};
