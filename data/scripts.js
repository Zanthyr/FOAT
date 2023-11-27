// function findFormulation() {
//   const formulName = document.getElementById('formulName').value;
//   const xhr = new XMLHttpRequest();
//   xhr.open('GET', '/Formulation/name/' + formulName);
//   xhr.responseType = 'json';
//   xhr.send();
//   xhr.onload = function() {
//     console.log(xhr.response);
//     const formul = xhr.response;
//     const compList = { component: [] };
//     let componentAmount = 0;
//     for (let i = 0; i < formul.length; i++) {
//       let compy = [formul[i].amount, formul[i].component];
//       compList.component.push(compy);
//       componentAmount += formul[i].amount;
//     }

//     let solventAmount =
//       Math.round((formul[0].total - componentAmount) * 100) / 100;
//     let solvent = [solventAmount, formul[0].solvent];
//     compList.component.push(solvent);
//     let total = [formul[0].total, 'Total'];
//     compList.component.push(total);

//     let formulleObj = { name: [], assortment: [], component: [] };
//     formulleObj.name = formul[0].name;
//     formulleObj.assortment = formul[0].assortment;

//     for (let j = 0; j < compList.component.length; j++) {
//       let component = JSON.stringify(compList.component[j][1]);
//       component = component.replaceAll(',', '').replaceAll('"', '');
//       let amount = JSON.stringify(compList.component[j][0]);
//       amount = amount.replaceAll(',', '').replaceAll('"', '');
//       formulleObj.component.push(
//         '- bevat : ' + amount + ' - ' + component + '<br/>'
//       );
//     }
//     document.getElementById('formul').innerHTML = formulleObj.name;
//     document.getElementById('formulDesc').innerHTML = formulleObj.assortment;
//     document.getElementById('formulComp').innerHTML = formulleObj.component;
//   };
// }

// function GoToPageSF() {
//   var Model = document.getElementById('Number').value;
//   var Filename = Model.substring(2, 5);
//   var Pad = Model.substring(0, 2);
//   window.open(
//     'http://192.168.100.103/PDF_Modellen/' + Pad + '/' + Filename + '.pdf'
//   );
// }

// function GoToPageSR() {
//   const Model = document.getElementById('Number2').value;
//   const Filename = Model.substring(2, 5);
//   const Pad = Model.substring(0, 2);
//   window.open(
//     'http://192.168.100.103/PDF_SR_Modellen/' + Pad + '/' + Filename + '.pdf'
//   );
// }

// function GoToPageBarCode() {
//   const Model = document.getElementById('Number3').value;
//   const Filename = Model.substring(0, 3);
//   const Pad = Model.substring(0, 6);
//   window.open('http://192.168.100.103/Barcode_Scan/' + Filename + '/' + Pad);
// }
