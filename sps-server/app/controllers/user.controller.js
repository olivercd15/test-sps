const User = require("../models/user.model");
const getNextSequenceValue = require('../models/counter'); 
var bcrypt = require("bcryptjs");


exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};



// Lista de usuarios
exports.listUsers = (req, res) => {
  User.find()
    .exec((err, users) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      // Mapea los usuarios para devolver solo los campos necesarios
      const userList = users.map(user => ({
        id: user._id,
        name: user.name,
        email: user.email,
        type: user.type,
      }));

      res.status(200).send(userList); // Envía la lista de usuarios
    });
};

// Buscar un usuario por ID
exports.getUserById = (req, res) => {
  const userId = req.params.id;

  User.findOne({ _id:userId })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        res.status(404).send({ message: "Usuario no encontrado" });
        return;
      }

      // Devuelve solo los campos necesarios
      const userData = {
        id: user._id,
        name: user.name,
        email: user.email,
        type: user.type,
      };

      res.status(200).send(userData);
    });
};


// Registrar un usuario nuevo
exports.storeNewUser = async (req, res) => {
  const userData = req.body;

  // Verificar si el correo ya existe en la base de datos
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    return res.status(400).send({ message: "El correo electrónico ya está registrado." });
  }

  const nextId = await getNextSequenceValue('user_id');

  const newUser = new User({
    _id: nextId,
    name: userData.name,
    email: userData.email,
    type: userData.type,
    password: bcrypt.hashSync(userData.password, 8)
  });

  newUser.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    const createdUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      type: user.type,
    };

    res.status(201).send({ message: "Usuario creado con éxito", user: createdUser });
  });
};


// Editar un usuario por ID
exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const updateData = req.body;

  User.findByIdAndUpdate(userId, updateData, { new: true })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        res.status(404).send({ message: "Usuario no encontrado" });
        return;
      }

      const updatedUser = {
        name: user.name,
        email: user.email,
        type: user.type,
      };

      res.status(200).send({ message: "Usuario actualizado con exito", user: updatedUser });
    });
};

// Eliminar un usuario por ID
exports.deleteUser = (req, res) => {
  const userId = req.params.id;

  User.findByIdAndDelete(userId)
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        res.status(404).send({ message: "Usuario no encontrado" });
        return;
      }

      res.status(200).send({ message: "Usuario eliminado con exito" });
    });
};
