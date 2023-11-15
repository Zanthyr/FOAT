const database = require('../database');

const Formule = function(formule) {
  this.name = formule.name;
  this.assortment = formule.assortment;
  this.component = formule.component;
  this.solvent = formule.solvent;
  this.amount = formule.amount;
  this.total = formule.total;
};

Formule.findByName = (name, result) => {
  database.inktFormSql.query(
    `SELECT * FROM named_list WHERE name LIKE '${name}%'`,
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      result(null, res);
    }
  );
};

Formule.findById = (id, result) => {
  database.inktFormSql.query(
    `SELECT * FROM named_list WHERE ID LIKE '${id}'`,
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      result(null, res);
    }
  );
};

module.exports = Formule;
