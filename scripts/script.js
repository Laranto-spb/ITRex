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

}

getRes();

const clickedInfo = document.addEventListener('click', (e)=> {
 console.log(e.target.textContent);

  adress.textContent = e.target.textContent;

})


