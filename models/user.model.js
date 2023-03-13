const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema(
  {
    "avater": {
      type: String,
      default: "null",
    },
    "username": {
      type: String,
      required: true,
    },
    "email": {
      type: String,
      required: true,
    },
    "password": {
      type: String,
      required: true,
    },
    "deleted": {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// 4. Encypt and store the person's password
UserSchema.pre('save', function(next) {
  var person = this;
  if (!person.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(8, function(err, salt) {
    bcrypt.hash(person.password, salt, function(err, hash) {
      person.password = hash;
      next();
    });
  });
});

// 5. Confirm a person's password against the stored password
UserSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};


module.exports = mongoose.model("UserModel", UserSchema);
