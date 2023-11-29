const Formulle = require('../utils/formulationQuerry');
const catchAsync = require('../utils/catchAsync');

// exports.findName = (req, res) => {
//   // console.log('name:', req.params.name);
//   Formulle.findByName(req.params.name, (err, data) => {
//     if (err) {
//       if (err.kind === 'not_found') {
//         res.status(404).send({
//           message: `Not found formule with name ${req.params.name}.`
//         });
//       } else {
//         res.status(500).send({
//           message: `Error retrieving formule with name ${req.params.name}`
//         });
//       }
//     } else {
//       const [...namesList] = new Set(
//         data.map(el => {
//           return `${el.name} #${el.ID}`;
//         })
//       );
//       //const id = newData[0].split('#');
//       res.send(namesList);
//     }
//   });
// };

exports.findName = catchAsync(async (req, res, next) => {
  // try {
  const list = await new Promise((resolve, reject) => {
    Formulle.findByName(req.params.name, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
  if (list.length === 0) {
    res.status(404).send({
      message: `Not found formule with name ${req.params.name}.`
    });
  } else {
    const namesList = [...new Set(list.map(el => `${el.name} #${el.ID}`))];
    res.status(200).json({
      status: 'success',
      data: {
        namesList
      }
    });
    // res.send(namesList);
  }
  // } catch (err) {
  //   if (err.kind === 'not_found') {
  //     res.status(404).send({
  //       message: `Not found formule with name ${req.params.name}.`
  //     });
  //   } else {
  //     res.status(500).send({
  //       message: `Error retrieving formule with name ${req.params.name}`
  //     });
  //   }
  // }
});

// exports.findID = (req, res) => {
//   // console.log('id:', req.params.id);
//   Formulle.findById(req.params.id, (err, data) => {
//     if (err) {
//       if (err.kind === 'not_found') {
//         res.status(404).send({
//           message: `Not found formule with ID ${req.params.id}.`
//         });
//       } else {
//         res.status(500).send({
//           message: `Error retrieving formule with ID ${req.params.id}`
//         });
//       }
//     } else {
//       const components = data.map(el => {
//         return [el.component, el.amount];
//       });
//       let solventAmount = 0;
//       components.forEach(element => {
//         solventAmount += element[1];
//       });
//       components.push([
//         data[0].solvent,
//         Math.round((100 - solventAmount) * 100) / 100
//       ]);
//       const formulation = {
//         name: data[0].name,
//         assortment: data[0].assortment,
//         components
//       };
//       res.send(formulation);
//     }
//   });
// };

exports.findID = catchAsync(async (req, res, next) => {
  // try {
  const list = await new Promise((resolve, reject) => {
    Formulle.findById(req.params.id, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
  const components = list.map(el => {
    return [el.component, el.amount];
  });
  let solventAmount = 0;
  components.forEach(element => {
    solventAmount += element[1];
  });
  components.push([
    list[0].solvent,
    Math.round((100 - solventAmount) * 100) / 100
  ]);
  const formulation = {
    name: list[0].name,
    assortment: list[0].assortment,
    components
  };
  res.status(200).json({
    status: 'success',
    data: {
      formulation
    }
  });
  // res.send(formulation);
  // } catch (err) {
  //   if (err.kind === 'not_found') {
  //     res.status(404).send({
  //       message: `Not found formule with ID ${req.params.id}.`
  //     });
  //   } else {
  //     res.status(500).send({
  //       message: `Error retrieving formule with ID ${req.params.id}`
  //     });
  //   }
  // }
});
