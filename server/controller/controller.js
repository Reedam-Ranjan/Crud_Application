var Userdb = require("../model/model");

// create and save new user
exports.create = (req, res) => {
  // validate a request
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty" });
    return;
  }

  // new user (creating an instance of the user schema)
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  // save user in the database (using chaining method) (using the same instance above)
  user
    .save(user)
    .then((data) => {
    //   res.send(data);
    // redirect the user to a specific page
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while creating a creat operation",
      });
    });
};

// retrieve and return all users / retrieve an return single user
exports.find = (req, res) => {

    // Using query parameters
  if (req.query.id) {
    const id = req.query.id;

    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "No user found with id " + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Error retrieving data with user id " + id });
      });
  } else {
    // Using url parameters
    Userdb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error occured while retrieving user information" 
        });
      });
  }
};


  

// Update a new identified user by user id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: `Data to update cannot be empty` });
  }

  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user with ${id}. Maybe user not found`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error update user information" });
    });
};

// Delete a user with a specified user id in the reques
exports.delete = (req, res) => {
  const id = req.params.id;

  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot delete with id ${id}. Maybe id is wrong` });
      } else {
        res.send({ message: `User was deleted successfully!` });
      }
    })
    .catch((err) => {
      res.send(500).send({ message: "Could not delete User with id =" + id });
    });
};

// There are two types of parameters
//1. Url parameter 2. Query parameters
