// //JOI VALIDATION
// const joi = require("joi");

// //Register Validation
// const registerValidation = (data) => {
//   const schema = {
//     username: joi.string().min(6).required(),
//     email: joi.string().min(6).required().email(),
//     password: joi.string().min(6).required(),
//   };
//   return joi.Validate(data, schema);
// };

// const loginValidation = (data) => {
//   const schema = {
//     email: joi.string().min(6).required().email(),
//     password: joi.string().min(6).required(),
//   };
//   return joi.Validate(data, schema);
// };

// module.exports.registerValidation = registerValidation;
// module.exports.loginValidation = loginValidation;
