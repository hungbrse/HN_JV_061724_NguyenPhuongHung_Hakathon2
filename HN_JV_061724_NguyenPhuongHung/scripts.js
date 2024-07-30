let addItem = document.querySelector(".add-item")
let formInput = document.querySelector(".form-input")
let closeBtn = document.getElementById("close-btn")
let addBtn = document.querySelector(".add-btn")
let tableDb = document.querySelector(".table-data")
let tableShow = document.querySelector(".table-show")

let inputImg = document.getElementById("inputImg")
// Render
let tableDbItem = document.querySelector(".table-dataItem");
// change Link

let tableDbProject = document.querySelector(".table-data-project")
let skillDashboard = document.getElementById("skillDashboard")
let projectDashboard = document.getElementById("projectDashboard")
let imageBase64 = null

//
let addProjectBtn = document.querySelector(".add-project")
let projectForm = document.querySelector(".project-form-input")
let addProject = document.getElementById("add-project-btn")
let projectItem = document.querySelector(".table-dataItem-project")
let deleteProject = document.querySelector(".delete-project-Btn")
let cancelProjectBtn = document.getElementById("cancel-project-btn")
let closeProjectBtn = document.getElementById("close-project-btn")


let idUpdateGlobal = null;



addItem.addEventListener("click" , function() {

    formInput.style.display = "block"
    tableShow.style.backgroundColor ="#7f7f7f";

  


})


closeBtn.addEventListener("click", function() {
    formInput.style.display = "none"
    tableShow.style.backgroundColor ="white";


})


closeProjectBtn.addEventListener("click", function() {
    projectForm.style.display = "none"

})


// closeProjectBtn.addEventListener("click", function() {
//   projectForm.style.display = "none"

// })

cancelProjectBtn.addEventListener("click", function() {


  projectForm.style.display = "none"

})

addBtn.addEventListener("click", function() {

  // Input
let inputName = document.getElementById("InputName")
let inputExperienceYear = document.getElementById("inputExperienceYear")

    let nameInput = inputName.value.trim();
    let experienceYear = inputExperienceYear.value.trim();

    const currentDate = new Date();


    // Lấy ngày
const day = currentDate.getDate();

// Lấy tháng (cần cộng thêm 1 vì tháng trong JavaScript được đánh số từ 0 đến 11)
const month = currentDate.getMonth() + 1;

// Lấy năm
const year = currentDate.getFullYear();
    

console.log(day)

  let tableDb = JSON.parse(localStorage.getItem("tableDb"))

  let checkViet = tableDb.findIndex((e) => e.nameSkill.toLowerCase()  === nameInput.toLowerCase())


  if(checkViet === -1) {

    if(nameInput) {

      if(tableDb.length === 0) {
        tableDb.push({stt: 0, nameSkill: nameInput ,img: imageBase64,Year : experienceYear,date:`${day}/${month}/${year}`})
      } else {
        tableDb.push({stt: (tableDb.length-1)+1, nameSkill: nameInput ,img: imageBase64,year : experienceYear,date:`${day}/${month}/${year}`})
      }
    
      window.localStorage.setItem("tableDb", JSON.stringify(tableDb))
    
      formInput.style.display = "none"
      tableShow.style.backgroundColor ="white";
    
    
      render()
    } else {
      alert("nhập tên hộ cái")
    }
  } else {
    alert("tên bị trùng ó")

   }

console.log(checkViet)

})

function render() {
   
  let tableDb = JSON.parse(localStorage.getItem("tableDb"));

  
     let print = ""
   for (const index in tableDb) {
    
  
    print += `
     <tr>
                <td>${tableDb[index].stt}</td>
                <td>${tableDb[index].nameSkill}</td>
                <td><img src="${tableDb[index].img}"  width="100px"
            height="100px" alt=""></td>
                <td>${tableDb[index].year}</td>
                <td>${tableDb[index].date}</td>
                <td class="delete-li">
                 <button class="delete-Btn" onclick="deleteIndex(${tableDb[index].stt})">
                 Xóa
                </button>
                </td>
               </tr>
           `
   }
   tableDbItem.innerHTML = print;
}

function deleteIndex(deleteStt) {

  let tableDb = JSON.parse(localStorage.getItem("tableDb"))

  let deleteIndex = tableDb.findIndex((e) => e.stt === deleteStt);

  tableDb.splice(deleteIndex,1);

  window.localStorage.setItem("tableDb", JSON.stringify(tableDb))


  render();


  
}


render()

function encodeImageFileAsURL(element) {
    const file = element.files[0];
    const reader = new FileReader();

    reader.onloadend = function () {
        document.getElementById('image-product').src = reader.result
        imageBase64 = reader.result
    }

    reader.readAsDataURL(file);
}


// 
skillDashboard.addEventListener("click", function() {
  tableDbProject.style.display = "none"
  tableDb.style.display = "block"
})
projectDashboard.addEventListener("click", function(){
  tableDb.style.display = "none"
  tableDbProject.style.display = "block"
})


addProjectBtn.addEventListener("click" , function() {

  projectForm.style.display = "block"

})



addProject.addEventListener("click", function() {
  // Input
  let inputTechnology = document.getElementById("technology");
  let inputProjectName = document.getElementById("projectName");
  let projectNameInput = inputProjectName.value.trim();
  let technologyName = inputTechnology.value.trim();

  // Lấy dữ liệu từ localStorage và kiểm tra
  let projectDb = JSON.parse(localStorage.getItem("project")) || [];




  if(idUpdateGlobal) {
    let findIndexInputUpdate = projectDb.findIndex((e) => e.stt === idUpdateGlobal)
    // projectForm.style.display = "block"
    projectDb[findIndexInputUpdate].projectName = projectNameInput

    window.localStorage.setItem("project", JSON.stringify(projectDb));
    idUpdateGlobal = null
    addProject.textContent = "Thêm"

    inputProjectName.value = "";

    renderProject()
     return;
}

  

console.log(idUpdateGlobal)


  if (projectNameInput) {
      if (projectDb.length === 0) {
          projectDb.push({ stt: 0, projectName: projectNameInput, img: imageBase64, technology: technologyName });
      } else {
          projectDb.push({ stt: (projectDb.length-1)+1, projectName:projectNameInput, img: imageBase64, technology: technologyName });
      }

      window.localStorage.setItem("project", JSON.stringify(projectDb));
  } else {
      alert("Vui lòng nhập tên dự án");
  }

renderProject();

projectForm.style.display = "none"


});



function renderProject() {
   
  let projectDb = JSON.parse(localStorage.getItem("project")) || [];

  
     let print = ""
   for (const index in projectDb) {
    
  
    print += `
     <tr>
                <td>${projectDb[index].stt}</td>
                <td>${projectDb[index].projectName}</td>
                <td><img src="${projectDb[index].img}"  width="100px"
            height="100px" alt=""></td>
                <td>${projectDb[index].technology}</td>
                <td class="delete-li">
                 <button class="delete-project-Btn" onclick="deleteProjectIndex(${projectDb[index].stt})">
                 Xóa
                </button>

                 <button class="delete-project-Btn" onclick="updateBtn(${projectDb[index].stt})">
                 Cập nhập
                </button>
                </td>
               </tr>
           `
   }
   projectItem.innerHTML = print;
}


renderProject()


function deleteProjectIndex(deleteProjectIndex) {

  let projectDb = JSON.parse(localStorage.getItem("project")) || [];

  let deleteIndex = projectDb.findIndex((e) => e.stt === deleteProjectIndex)
  projectDb.splice(deleteIndex,1)
  window.localStorage.setItem("project", JSON.stringify(projectDb));
renderProject()

}
function updateBtn(idEdit) {
  let inputTechnology = document.getElementById("technology");
  let inputProjectName = document.getElementById("projectName");

  let projectDb = JSON.parse(localStorage.getItem("project")) || [];
  let updateIndex = projectDb.find((e) => e.stt === idEdit);

  if (updateIndex) {
      inputProjectName.value = updateIndex.projectName;
      inputTechnology.value = updateIndex.technology;
      idUpdateGlobal = idEdit;
     
      return
  }


   addProject.textContent = "Đồng ý sửa";
    projectForm.style.display = "block";
  
}