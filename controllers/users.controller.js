// status code ref : https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
const User = require ('../models/users.model');
const Token = require ('../models/token.model');
var passwordHash = require ('password-hash');

exports.signup = async (req, res) => {
  var existing = await User.findOne ({email: req.body.email});
  if (existing != null) {
    console.log ('Email ID already exists');
    res.send ();
  } else {
    var hashedPassword = passwordHash.generate (req.body.password);
    console.log (hashedPassword);
    var user = new User ({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    user = await user.save ();
    var token = new Token ({userID: user._id});
    token = await token.save ();
    res.header ('Authorization', token._id);
    res.status (200).send (user);
  }
};

exports.signin = async (req, res) => {
  var user = await User.findOne ({email: req.body.email});
  if (user == null || user == undefined) {
    res.send ('User does not exist. Please SIGN UP');
  } else {
    if (passwordHash.verify (req.body.password, user.password)) {
      var token = new Token ({userID: user._id});
      token = await token.save ();
      res.header ('authorization', token._id);
      res.status(200).send(user);
    } else {
      res.status().send ('Password does not match !!');
    }
  }
};

exports.signout = async (req, res) => {
  // Remove token from database
  var token = await Token.findByIdAndDelete(req.token._id);
  console.log(token);
  res.status(200).send({ message: "Signout success" });
};

exports.signoutall = async (req, res) => {
  // Remove all tokens associated with the userId
  var tokens = await Token.deleteMany({ userId: req.token.userId });
  console.log(tokens);
  res.status(200).send({ message: "Signout all success" });
};

exports.retrieveuser = async (req, res) => {
  // Send user associated with userId
  var user = await User.findById(req.token.userID);
  if (!user) {
    res.status(404).send({ message: "User not found" });
  }
  else
  res.status(200).send(user);
};
