const sql = require("./db.js");

const addressBook = function(addressbook) {
  this.first_name = addressbook.first_name;
  this.last_name = addressbook.last_name;
  this.email   =     addressbook.email;
  this.address = addressbook.name;
  this.mobile = addressbook.mobile
};

addressBook.create = (newAddressBook, result) => {
  sql.query("INSERT INTO address_book SET ?", newAddressBook, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created address Book");
    result(null, { id: res.insertId, ...newAddressBook });
  });
};

addressBook.findById = (addressBookId, result) => {
  sql.query(`SELECT * FROM address_book WHERE id = ${addressBookId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found address-book: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

addressBook.getAll = result => {
  sql.query("SELECT * FROM address_book", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("address_book: ", res);
    result(null, res);
  });
};

addressBook.updateById = (id, address_book, result) => {
  sql.query(
    "UPDATE address_book SET first_name = ?, last_name = ?, mobile = ?,email = ?,address = ? WHERE id = ?",
    [address_book.first_name, address_book.last_name, address_book.mobile,,address_book.email,,address_book.address, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated address_book: ", { id: id, ...address_book });
      result(null, { id: id, ...address_book });
    }
  );
};

addressBook.remove = (id, result) => {
  sql.query("DELETE FROM address_book WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found address_book with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted customer with id: ", id);
    result(null, res);
  });
};

addressBook.removeAll = result => {
  sql.query("DELETE FROM address_book", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} address_book`);
    result(null, res);
  });
};

module.exports = addressBook;
