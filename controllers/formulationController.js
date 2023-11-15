const Formule = require('../models/formulationModel');

exports.findName = (req, res) => {
  // console.log('name:', req.params.name);
  Formule.findByName(req.params.name, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found formule with name ${req.params.name}.`
        });
      } else {
        res.status(500).send({
          message: `Error retrieving formule with name ${req.params.name}`
        });
      }
    } else {
      const [...namesList] = new Set(
        data.map(el => {
          return `${el.name} #${el.ID}`;
        })
      );
      //const id = newData[0].split('#');
      res.send(namesList);
    }
  });
};

exports.findID = (req, res) => {
  // console.log('id:', req.params.id);
  Formule.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found formule with ID ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: `Error retrieving formule with ID ${req.params.id}`
        });
      }
    } else {
      const components = data.map(el => {
        return [el.component, el.amount];
      });
      let solventAmount = 0;
      components.forEach(element => {
        solventAmount += element[1];
      });
      components.push([
        data[0].solvent,
        Math.round((100 - solventAmount) * 100) / 100
      ]);
      const formulation = {
        name: data[0].name,
        assortment: data[0].assortment,
        components
      };
      res.send(formulation);
    }
  });
};
