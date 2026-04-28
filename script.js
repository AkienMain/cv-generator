
const iconClassListDict = {
  'period': ['bi', 'bi-calendar3'],
  'loc': ['bi', 'bi-geo-alt-fill'],
  'website': ['bi', 'bi-globe'],
  'tel': ['bi', 'bi-telephone-fill'],
  'mail': ['bi', 'bi-envelope'],
  'linkedin': ['bi', 'bi-linkedin'],
  'github': ['bi', 'bi-github'],
  'npm': ['bi', 'bi-link-45deg'],
  'work': ['bi', 'bi-bag-fill'],
  'edu': ['bi', 'bi-pencil-fill'],
  'skill': ['bi', 'bi-person-fill-gear'],
  'cert': ['bi', 'bi-award-fill'],
  'lang': ['bi', 'bi-translate'],
  'dev': ['bi', 'bi-code-slash'],
  'link': ['bi', 'bi-link-45deg'],
}

let sectionTitleDict = {}

let data;
let elements = {};

let isColored = true;
isColored = false;

let showBorder = true;
showBorder = false;

let language = '';

window.onload = async function () {

  const urlParams = new URLSearchParams(window.location.search);
  let isAvailableDevInfo = (urlParams.get('devInfo') === "true");

  data = JSON.parse(sessionStorage.getItem('inputFile'));

  sectionTitleDict = data["sectionTitle"];
  language = data["language"];

  init();
  setElement();

  if (isAvailableDevInfo) {
    let devInfos = document.getElementsByClassName("generator-info");
    for (let item of devInfos) {
      item.innerHTML = 'Made by &nbsp <a href="https://akienmain.github.io/cv-generator/" target="_blank">akienmain CV Generator</a>';
    }
  }

  let header = document.getElementById("header");
  let sp1 = document.getElementById("section-p1");
  let sp2 = document.getElementById("section-p2");
  let sp3 = document.getElementById("section-p3");

  header.appendChild(createHeaderFace());
  header.appendChild(createHeaderContent(data));

  sp1.appendChild(createSectionTitleBar('work'));
  for (let item of data['work']) {
    sp1.appendChild(createSectionItemWork(item));
  }
  sp1.appendChild(createSectionTitleBar('edu'));
  for (let item of data['edu']) {
    sp1.appendChild(createSectionItemEducation(item));
  }
  sp2.appendChild(createSectionTitleBar('skill'));
  for (let item of data['skill']) {
    sp2.appendChild(createSectionItemSkill(item));
  }
  sp2.appendChild(createSectionTitleBar('cert'));
  for (let item of data['cert']) {
    sp2.appendChild(createSectionItemCert(item));
  }
  sp2.appendChild(createSectionTitleBar('lang'));
  for (let item of data['lang']) {
    sp2.appendChild(createSectionItemLang(item));
  }
  sp3.appendChild(createSectionTitleBar('dev'));
  for (let item of data['dev']) {
    sp3.appendChild(createSectionItemDev(item));
  }

}

function createSectionItemName(text) {
  let e = document.createElement("div");
  e.classList.add(...['section-item-name']);
  e.innerHTML = text;
  return e;
}
function createSectionItemAddition(item, keys) {
  let e = document.createElement("div");
  e.classList.add(...['d-flex', 'justify-content-start', 'section-item-addition']);
  for (let key of keys) {
    e.appendChild(createSmLet(item, key));
  }
  return e;
}

function createSmLet(item, key) {
  let e = document.createElement("div");
  e.classList.add(...['d-flex', 'justify-content-start', 'sm-let']);
  if (item.hasOwnProperty(key)) {
    e.appendChild(createIcon(iconClassListDict[key]));
    e.appendChild(createDivText(item[key]));
  }
  return e;
}

function createIcon(classList) {
  let e = document.createElement("i");
  e.classList.add(...classList);
  return e;
}

function createDivText(text, classList=[]) {
  let e = document.createElement("div");
  e.classList.add(...classList);
  setTextLink(e, text);
  return e;
}

function createSectionItemSub(text) {
  return createDivText(text, ['section-item-sub']);
}

function createSectionItemContent(text) {
  return createDivText(text, ['section-item-content']);
}

function createSectionItem() {
  let e = document.createElement("div");
  e.classList.add(...['section-item']);
  return e;
}

function createSectionItemWork(item) {
  let e = createSectionItem();
  e.appendChild(createSectionItemName(item["name"]));
  e.appendChild(createSectionItemAddition(item, ["period", "loc", "website"]));
  e.appendChild(createSectionItemSub(item["role"]));
  e.appendChild(createSectionItemContent(item["info"]));
  return e;
}

function createSectionItemEducation(item) {
  let e = createSectionItem();
  e.appendChild(createSectionItemName(item["name"]));
  e.appendChild(createSectionItemAddition(item, ["period", "loc", "website"]));
  e.appendChild(createSectionItemSub(item["role"]));
  e.appendChild(createSectionItemContent(item["info"]));
  return e;
}

function createSectionItemSkill(item) {
  let e = createSectionItem();
  e.appendChild(createSectionItemName(item["name"]));
  e.appendChild(createSectionItemContent(item["info"]));
  return e;
}

function createSectionItemCert(item) {
  let e = createSectionItem();
  e.appendChild(createSectionItemName(item["name"]));
  e.appendChild(createSectionItemContent(item["info"]));
  e.appendChild(createSectionItemAddition(item, ["period", "link"]));
  return e;
}

function createSectionItemLang(item) {
  let e = createSectionItem();
  if (item.hasOwnProperty("name")) e.appendChild(createSectionItemName(item["name"]));
  e.appendChild(createSectionItemContent(item["info"]));
  e.appendChild(createSectionItemAddition(item, ["period"]));
  return e;
}

function createSectionItemDev(item) {
  let e = createSectionItem();
  e.appendChild(createSectionItemName(item["name"]));
  e.appendChild(createSectionItemAddition(item, ["github"]));
  e.appendChild(createSectionItemSub(item["role"]));
  e.appendChild(createSectionItemContent(item["info"]));
  return e;
}










function createSectionTitleBar(titleKey) {
  let e = document.createElement("div");
  e.appendChild(createSectionIcon(iconClassListDict[titleKey]));
  e.appendChild(createSectionTitle(sectionTitleDict[titleKey]));
  e.appendChild(createHrLine());
  e.classList.add(...['d-flex','align-items-center', 'section-title-bar']);
  return e;
}

function createSectionIcon(iconClassList) {
  let e = document.createElement("div");
  e.classList.add(...['section-icon']);
  e.appendChild(createIcon(iconClassList));
  return e;
}

function createSectionTitle(text) {
  let e = document.createElement("div");
  e.classList.add(...['section-title']);
  e.innerHTML = text;
  return e;
}

function createHrLine() {
  let e = document.createElement("div");
  e.classList.add(...['flex-grow-1', 'hr-line']);
  return e;
}


function createHeader() {
  let container = document.createElement("div");
  container.classList.add(...['container-fluid', 'g-0', 'main-container']);
  let row = document.createElement("div");
  row.classList.add(...['row', 'g-0', 'main-container-row']);
  row.appendChild(createHeaderFace());
  row.appendChild(createHeaderContent());
  container.appendChild(row);
  return container;
}

function createHeaderFace() {
  let div = document.createElement("div");
  div.classList.add(...['col-3', 'bg', 'align-cen']);
  let img = document.createElement("img");
  img.src = sessionStorage.getItem('imageFile');
  img.classList.add(...['face']);
  div.appendChild(img);
  return div;
}

function createHeaderContent(data) {
  let e = document.createElement("div");
  let add = document.createElement("div");
  e.classList.add(...['col', 'bg', 'header-content']);
  e.appendChild(createDivText(data['name'], ['name']));
  e.appendChild(createDivText(data['bio'], ['bio']));
  add.appendChild(createSectionItemAddition(data, ["loc", "tel", "mail"]));
  add.appendChild(createSectionItemAddition(data, ["website"]));
  add.appendChild(createSectionItemAddition(data, ["linkedin"]));
  add.appendChild(createSectionItemAddition(data, ["github"]));
  add.appendChild(createSectionItemAddition(data, ["npm"]));
  e.appendChild(add);
  return e;
}















function init() {

  document.title = `CV_${language}_${formatDate()}`;

  document.querySelectorAll('div.bg').forEach((item, index) => {
    if (isColored) {
      item.style.background = `hsl(${(index*89)%360}, 60%, 70%)`;
      item.style.borderWidth = '1px';
      item.style.borderStyle = 'solid';
    }
  });
  document.querySelectorAll('div.page').forEach((item, index) => {
    if (showBorder) {
      item.style.borderWidth = '1px';
      item.style.borderStyle = 'solid';
    }
  });
}

function setElement() {
  for (let key of Object.keys(data)) {
    elements[key] = document.getElementById(key);
  }
}

function setHTML() {
  for (let key of Object.keys(data)) {
    setTextLink(elements[key], data[key]);
  }
}

function setTextLink(element, text) {
  if (text.includes('://')) {
    element.innerHTML = `<a href="${text}" target="_blank">${text}</a>`;
  } else {
    element.innerHTML = text;
  }
}

async function loadText(url) {
  const response = await fetch(url);
  return await response.text();
}

async function loadCSV(url) {
  try {
    return CSVToObject(await loadText(url), '\t');
  } catch (error) {
    return {};
  }
}

function CSVToArray(text, delimiter=',') {
  let result = [];
  let rows = text.split(/\r\n|\r|\n/);
  for(let i=0;i<rows.length;++i){
    result[i] = rows[i].split(delimiter);
  }
  return result;
}

function CSVToObject(text, delimiter=',') {
  let result = {};
  let rows = text.split(/\r\n|\r|\n/);
  for(let i=0;i<rows.length;++i){
    let words = rows[i].split(delimiter);
    result[words[0]] = words[1];
  }
  return result;
}

async function loadJson(url) {
  try {
    return JSON.parse(await loadText(url));
  } catch (error) {
    return {};
  }
}

function formatDate(sep='') {
  const dateTime = new Date();
  const date = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());
  const yyyy = date.getFullYear();
  const mm = ('00' + (date.getMonth()+1)).slice(-2);
  const dd = ('00' + date.getDate()).slice(-2);
  return `${yyyy}${sep}${mm}${sep}${dd}`;
}