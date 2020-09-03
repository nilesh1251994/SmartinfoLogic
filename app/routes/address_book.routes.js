module.exports = app => {
  const address_book = require("../controllers/address_book.controller.js");

  app.post("/address-book", address_book.create);
  app.get("/address-book", address_book.findAll);
  app.get("/address-book/:addressBookId", address_book.findOne);
  app.put("/address-book/:addressBookId", address_book.update);
  app.delete("/address-book/:addressBookId", address_book.delete);
  app.delete("/address-book", address_book.deleteAll);
};
