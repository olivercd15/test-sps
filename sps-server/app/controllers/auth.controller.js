const config = require("../config/auth.config");
const User = require("../models/user.model");
const getNextSequenceValue = require('../models/counter'); 

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.signup = async (req, res) => {
  try {
    const nextId = await getNextSequenceValue('user_id');

    const user = new User({
      _id: nextId,  
      name: req.body.name,
      email: req.body.email,
      type: req.body.type,
      password: bcrypt.hashSync(req.body.password, 8)
    });

    await user.save();
    
    res.send({ message: "Usuario registrado exitosamente!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


exports.signin = (req, res) => {
  User.findOne({ email: req.body.email })
    .exec((err, user) => {
      if (err) {
        return res.status(500).send({ message: err });
      }

      if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado." });
      }

      bcrypt.compare(req.body.password, user.password, (err, passwordIsValid) => {
        if (err) {
          return res.status(500).send({ message: "El usuario o la contraseña es incorrecta." });
        }

        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Contraseña incorrecta."
          });
        }

        const token = jwt.sign({ id: user._id }, config.secret, {
          algorithm: 'HS256',
          expiresIn: 86400, // 24 horas
        });

        res.status(200).send({
          id: user._id,
          name: user.name,
          email: user.email,
          type: user.type,
          accessToken: token
        });
      });
    });
};

  
