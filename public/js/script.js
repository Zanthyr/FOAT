/* eslint-disable */

const reslutList = document.querySelector('.resultList');
const recepieSearch = document.querySelector('.searchRecepie');
const resultTitle = document.querySelector('.resultTitle');
const recepieResult = document.querySelector('.recepieResult');
const recepieResultRow1 = document.querySelector('.reslutRow1');
const recepieResultRow2 = document.querySelector('.reslutRow2');
const recepieResultRow3 = document.querySelector('.reslutRow3');
const recepieResultTitle1 = document.querySelector('.rowtitle1');
const recepieResultTitle2 = document.querySelector('.rowtitle2');
const recepieResultTitle3 = document.querySelector('.rowtitle3');

const displaySearchResult = data => {
  resultTitle.textContent = `Select Formulation to see components`;
  recepieResultRow1.innerHTML = '';
  recepieResultRow2.innerHTML = '';
  recepieResultRow3.innerHTML = '';
  recepieResultTitle1.innerHTML = '';
  recepieResultTitle2.innerHTML = '';
  recepieResultTitle3.innerHTML = '';
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

  const ulElement1 = document.createElement('ul');
  data.formulation.components.forEach(item => {
    const liElement1 = document.createElement('li');
    liElement1.textContent = item[0];
    ulElement1.appendChild(liElement1);
  });

  const ulElement2 = document.createElement('ul');
  data.formulation.components.forEach(item => {
    const liElement2 = document.createElement('li');
    liElement2.textContent = `${item[1]} %`;
    ulElement2.appendChild(liElement2);
  });

  const ulElement3 = document.createElement('ul');
  data.formulation.components.forEach(item => {
    const liElement3 = document.createElement('li');
    liElement3.textContent = `${Math.round(item[1] * 170) / 1000} kg`;
    ulElement3.appendChild(liElement3);
  });

  resultTitle.innerHTML = '';
  recepieResultRow1.innerHTML = '';
  recepieResultRow2.innerHTML = '';
  recepieResultRow3.innerHTML = '';
  recepieResultTitle1.innerHTML = '';
  recepieResultTitle2.innerHTML = '';
  recepieResultTitle3.innerHTML = '';
  resultTitle.appendChild(paragraph);
  recepieResultTitle1.innerHTML = 'Component:';
  recepieResultTitle2.innerHTML = 'Percentage:';
  recepieResultTitle3.innerHTML = 'Gebruik op 17kg:';
  recepieResultRow1.appendChild(ulElement1);
  recepieResultRow2.appendChild(ulElement2);
  recepieResultRow3.appendChild(ulElement3);
};

const searchRecepie = async id => {
  try {
    const response = await fetch(`/Formulation/id/${id}`);
    const res = await response.json();
    displayRecepieResult(res.data);
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
    reslutList.innerHTML =
      'Geen resultaten voor deze naam, probeer maar opnieuw!';
    resultTitle.innerHTML = '';
    recepieResultRow1.innerHTML = '';
    recepieResultRow2.innerHTML = '';
    recepieResultRow3.innerHTML = '';
    recepieResultTitle1.innerHTML = '';
    recepieResultTitle2.innerHTML = '';
    recepieResultTitle3.innerHTML = '';
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
