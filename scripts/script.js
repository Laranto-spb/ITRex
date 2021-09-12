const mainDiv = document.querySelector('.main');
const tBody = document.querySelector('tbody');
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

  $(document).ready(function () {
    $("#sampleTable").fancyTable({
      sortColumn: 0,
      pagination: true,
      perPage: 20,
      globalSearch: true,
      inputPlaceholder: 'Search...',
    });
  });



  tBody.addEventListener('click', (e) => {
    const clickedID = e.target.parentNode.childNodes[0].textContent;
    for (let obj of result) {

      if (obj.id == clickedID) {
        console.log(obj);      
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


}

getRes();