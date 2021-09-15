const mainDiv = document.querySelector('.main');
const table = document.getElementById('sampleTable');
const tBody = document.querySelector('tbody');
const searchInput = document.getElementById('searchInput');
const stateSelect = document.getElementById('stateSelect');
const userName = document.querySelector('.name');
const userDesc = document.querySelector('.desc');
const userAdress = document.querySelector('.adress');
const userCity = document.querySelector('.city');
const userState = document.querySelector('.state');
const userIndex = document.querySelector('.index');


const getData = fetch('https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json')
  .then(res => res.json())
  .then(data => {
    return data
  })

const getRes = async () => {
  const result = await getData;

  for (let obj of result) {
    const row = document.createElement('tr');
    row.innerHTML = `<td> ${obj.id}</td> <td> ${obj.firstName} </td> <td> ${obj.lastName} </td> <td> ${obj.email} </td> <td> ${obj.phone} </td> <td> ${obj.adress.state} </td>`;
    tBody.appendChild(row);
  }

  const setStates = () => {
    const stateArray = [];

    for (let res of result) {
      const state = res.adress.state;
      stateArray.push(state);
    }
    const uniqeStates = stateArray.filter((item, index) => stateArray.indexOf(item) === index);
    return uniqeStates;
  }

  const setSelect = () => {
    const selectArr = setStates();

    for (let state of selectArr) {
      const option = document.createElement('option');
      option.value = state;
      option.textContent = state;
      stateSelect.append(option);
    }
  }

  setSelect();


  tBody.addEventListener('click', (e) => {
    const clickedID = e.target.parentNode.childNodes[0].textContent;
    const clickedRow = e.target.parentNode;
    for (let obj of result) {
      if (obj.id == clickedID) {
        userName.textContent = `${obj.firstName} ${obj.lastName}`;
        userDesc.textContent = `${obj.description}`;
        userAdress.textContent = `${obj.adress.streetAddress}`;
        userCity.textContent = `${obj.adress.city}`;
        userState.textContent = `${obj.adress.state}`;
        userIndex.textContent = `${obj.adress.zip}`;
        break;
      }
    }
  })

  const searchUser = (column, typeFilter) => {
    const rows = Array.from(tBody.querySelectorAll('tr'))
    let txtValue = null;

    for (let row of rows) {
      const cell = Array.from(row.querySelectorAll('td'))[column];

      if (cell) {
        txtValue = cell.textContent || cell.innerText;

        if (txtValue.toUpperCase().indexOf(typeFilter) > -1) { // if exists
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      }
    }
  }

  const sortTable = (table, column, asc = true) => {

    const tBody = table.tBodies[0];
    const dirMod = asc ? 1 : -1;
    const rows = Array.from(tBody.querySelectorAll('tr'));

    const sortedRows = rows.sort((a, b) => {
      const aText = a.querySelector(`td:nth-child(${column+1})`).textContent.trim();
      const bText = b.querySelector(`td:nth-child(${column+1})`).textContent.trim();

      return aText > bText ? (1 * dirMod) : (-1 * dirMod);
    })

    while (tBody.firstChild) {
      tBody.removeChild(tBody.firstChild);
    }

    tBody.append(...sortedRows);

    table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-asc", asc);
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-desc", !asc);
  }

  document.querySelectorAll(".table th").forEach(headerCell => {
    headerCell.addEventListener("click", () => {
      const tableElement = headerCell.parentElement.parentElement.parentElement;
      const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
      const currentIsAscending = headerCell.classList.contains("th-sort-asc");

      sortTable(tableElement, headerIndex, !currentIsAscending);
    });
  });


  searchInput.addEventListener('keyup', () => {
    const upInputValue = searchInput.value.toUpperCase();
    searchUser(2, upInputValue);
  });

  stateSelect.addEventListener('change', () => {
    const selectValue = stateSelect.value.toUpperCase();
    searchUser(5, selectValue);
  });

}

getRes();