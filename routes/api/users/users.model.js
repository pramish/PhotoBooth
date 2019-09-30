const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

//Verifying whether the users credentials has been modified or not.
//This is because if the user has not changed the password then we do not have to bcrypt
// the password if not then we have to bcrypt the password.
userSchema.pre('save', () => {
  const user = this; //Telling this is current user
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, hashPassword => {
        if (err) throw err;
        user.password = hashPassword;
      });
    });
  }
});
module.exports = User = mongoose.model('User', userSchema);
