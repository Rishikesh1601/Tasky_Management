const taskContainer = document.querySelector(".task_container");
let globalStore = [];
console.log(taskContainer);

const generateNewCard = (taskData) =>{
  return `
  <div id={taskData.id} class="col-md-6 col-lg-4">
  <div class="card">
    <div class="card-header d-flex justify-content-end gap-2">
      <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
      <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"><i class="fas fa-trash" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"></i></button>
    </div>
    <img src=${taskData.imageurl} class="card-img-top p-3" alt="this is a image">
    <div class="card-body">
      <h5 class="card-title fw-bold text-primary">${taskData.tasktitle} </h5>
      <p class="card-text">${taskData.taskdescription}</p>
      <a href="#" class="btn btn-primary">${taskData.tasktype}</a>
    </div>
  </div>
</div>
`;
};


const loadInitialCardData = () => {
  //local storage to GET tasky cards
  const getCardData = localStorage.getItem("tasky");

  //convert the things to normal objects
  const {cards} = JSON.parse(getCardData);

  //loop over the array of task object to create HTML cards
  cards.map((cardObject)=>{
    taskContainer.insertAdjacentHTML("beforeend",generateNewCard(cardObject));

    //updating the globalStore array
    globalStore.push(cardObject);
  }
  
  )
};

//Delete the card
const deleteCard = (event) =>{
  event = window.event;
  const targetID = event.target.id;
  const tagname = event.target.tagName;

  globalStore = globalStore.filter((cardObject)=>cardObject.id !== targetID);
  localStorage.setItem("tasky",JSON.stringify({cards: globalStore}));

  if (tagname === "BUTTON"){
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
  } else{
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
  }
};



const saveChanges = () => {
  const taskData ={
      id:`${Date.now()}`,
      imageurl: document.getElementById("imgUrl").value,
      tasktitle: document.getElementById("taskTitle").value,
      tasktype: document.getElementById("taskType").value,
      taskdescription: document.getElementById("taskDescription").value
  };

taskContainer.insertAdjacentHTML("beforeend",generateNewCard(taskData));

globalStore.push(taskData);

localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));

};