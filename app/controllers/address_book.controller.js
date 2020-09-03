const addressBook = require("../models/address_book.model.js");


exports.create = (req, res) => {
 
  if (!req.body) {
    res.status(400).send({
      message: "Data can not be blank!"
    });
  }
  const addressbook = new addressBook({
    first_name: req.body.email,
    last_name: req.body.last_name,
    mobile: req.body.mobile,
    email:req.body.email,
    address:req.body.address
  });

  addressBook.create(addressbook, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || " error while creating the address-Book."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  addressBook.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || " error  while retrieving address-Book."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  addressBook.findById(req.params.addressBookId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No address-Book with id ${req.params.addressBookId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving address-Book with id " + req.params.addressBookId
        });
      }
    } else res.send(data);
  });
};


exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Data Can not be blank!"
    });
  }
  addressBook.updateById(
    req.params.addressBookId,
    new addressBook(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No addres-sBook with id ${req.params.addressBookId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating address-Book with id " + req.params.addressBookId
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  addressBook.remove(req.params.addressBookId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No address-Book with id ${req.params.addressBookId}.`
        });
      } else {
        res.status(500).send({
          message: " Not delete address-Book with id " + req.params.addressBookId
        });
      }
    } else res.send({ message: `address-Book was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  addressBook.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || " error  while removing all address-Book."
      });
    else res.send({ message: `All address-Book were deleted successfully!` });
  });
};
