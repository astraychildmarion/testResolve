
const writeData = function(data){
  let fragment = document.createDocumentFragment();
  data.forEach((i) => {
    if (i.name.includes('onerror')) {
      i.name = "Picture was lost";
    }
    let tr = document.createElement("tr");
    let content = `<tr>
      <td>${i.id}</td>
      <td><img src="${i.thumbnailUrl}"></td>
      <td>${i.name}</td>
      <td>${i.price}</td>
    </tr>`;
    tr.innerHTML = content;
    fragment.appendChild(tr);
  })
  document.getElementsByTagName("tbody")[0].appendChild(fragment);
}

const sortData = function(){
  let sort = TABLE_DATA.sort(function(a, b) {
    if (b.price - a.price !== 0){
      return b.price - a.price;
    } else if (b.price - a.price == 0){
      return b.id - a.id;
    }
  });
  document.getElementsByTagName("tbody")[0].innerHTML = '';
  writeData(sort);
}

let timer
function randomTimer(){
  timer = setInterval(() => {
    randomStart();
  }, 1000);
} 

function stopTimer(){
  clearInterval(timer);
}

function randomStart() {
  let newArr = [];
  let copyData = Object.assign([], TABLE_DATA)
  for (let i = 0; i < TABLE_DATA.length; i++) {
    if (copyData.length == 1) {
      newArr.push(copyData[0]);
    }else{
      let randomNum = Math.ceil(Math.random() * copyData.length) - 1;
      console.log("randomNum: " + randomNum);
      newArr.push(copyData[randomNum]);
      copyData.splice(randomNum, 1);
    }
  }
  document.getElementsByTagName("tbody")[0].innerHTML = "";
  writeData(newArr);
}

writeData(TABLE_DATA);
document.getElementById("sort").addEventListener("click", sortData);
document.getElementById("start").addEventListener("click", randomTimer);
document.getElementById("stop").addEventListener("click", stopTimer);
