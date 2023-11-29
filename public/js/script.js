/* eslint-disable */

const reslutList = document.querySelector('.resultList');
const recepieSearch = document.querySelector('.searchRecepie');
const recepieResult = document.querySelector('.recepieResult');

const displaySearchResult = data => {
  recepieResult.textContent = `Component list for selected formulation`;
  const ulElement = document.createElement('ul');
  data.forEach(item => {
    newItem = item.split('#');
    const liElement = document.createElement('li');
    liElement.textContent = ` ${newItem[0]}`;
    liElement.id = newItem[1];
    liElement.classList.add('listItem');
    ulElement.appendChild(liElement);
  });
  reslutList.innerHTML = '';
  ulElement.id = 'reslutList';
  reslutList.appendChild(ulElement);
};

const displayRecepieResult = data => {
  const paragraph = document.createElement('p');
  paragraph.id = 'theP';
  paragraph.textContent = data.formulation.name;
  const ulElement = document.createElement('ul');
  data.formulation.components.forEach(item => {
    const liElement = document.createElement('li');
    liElement.textContent = ` ${item[0]} //--- ${item[1]} %`;
    ulElement.appendChild(liElement);
  });
  recepieResult.innerHTML = '';
  recepieResult.appendChild(paragraph);
  recepieResult.appendChild(ulElement);
};

const searchRecepie = async id => {
  try {
    const response = await fetch(`/Formulation/id/${id}`);
    const res = await response.json();
    displayRecepieResult(res.data);
    console.log(res.data);
  } catch (error) {
    console.error('Error:', error);
  }
};

reslutList.addEventListener('click', function(event) {
  const list = document.getElementById('reslutList');
  const listItems = list.getElementsByTagName('li');
  for (let i = 0; i < listItems.length; i++) {
    listItems[i].classList.remove('selected');
  }
  if (event.target.tagName === 'LI') {
    document.getElementById(event.target.id).classList.add('selected');
    searchRecepie(event.target.id);
  }
});

const searchName = async string => {
  try {
    const response = await fetch(`/Formulation/name/${string}`);
    const res = await response.json();
    displaySearchResult(res.data.namesList);
  } catch (error) {
    console.error('Error:', error);
  }
};

recepieSearch.addEventListener('submit', e => {
  e.preventDefault();
  const string = document.getElementById('recepies').value;
  searchName(string);
});

function GoToPageSF() {
  var Model = document.getElementById('singleFile').value;
  var Filename = Model.substring(2, 5);
  var Pad = Model.substring(0, 2);
  window.open(`http://192.168.100.103/PDF_Modellen/${Pad}/${Filename}.pdf`);
}

function GoToPageSR() {
  const Model = document.getElementById('sAndR').value;
  const Filename = Model.substring(2, 5);
  const Pad = Model.substring(0, 2);
  window.open(`http://192.168.100.103/PDF_SR_Modellen/${Pad}/${Filename}.pdf`);
}

function GoToPageBarCode() {
  const Model = document.getElementById('barCode').value;
  const Filename = Model.substring(0, 3);
  const Pad = Model.substring(0, 6);
  window.open(`http://192.168.100.103/Barcode_Scan/${Filename}/${Pad}`);
}
