var Sequelize = require('Sequelize');
var sequelize = new Sequelize('Sequelize-Demo', 'root', null);

var User = sequelize.define('user', {
  first_name: {
    type        : Sequelize.STRING,
    allowNull   : false
  },
  last_name: {
    type        : Sequelize.STRING,
    allowNull   : false
  },
  email: {
    type        : Sequelize.STRING,
    allowNull   : false,
    unique      : true,
    validate: {
      isEmail: true
    }
  }
}, {
  hooks: {
    beforeValidate: function(user, options) {
      user.email = user.email.toLowerCase()     
    }
  }
});
User.sync().then(function () {
  // Table created
  return User.create({
    first_name  : 'John',
    last_name   : 'Hancock',
    email       : 'John@Hanckock.com'
  });
})
.catch(function (err) {
   return console.log('Error occured: ', err); 
});