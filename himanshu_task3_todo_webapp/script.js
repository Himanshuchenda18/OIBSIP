const taskInput=document.getElementById("taskInput");
const categorySelect=document.getElementById("categorySelect");
const prioritySelect=document.getElementById("prioritySelect");
const dueDate=document.getElementById("dueDate");
const addTaskBtn=document.getElementById("addTaskBtn");
const searchInput=document.getElementById("searchInput");
const sortSelect=document.getElementById("sortSelect");
const themeSelect=document.getElementById("themeSelect");
const resetBtn=document.getElementById("resetBtn");
const pendingContainer=document.getElementById("pendingTaskContainer");
const completedContainer=document.getElementById("completedTaskContainer");
const totalTasks=document.getElementById("totalTasks");
const completedTasks=document.getElementById("completedTasks");
const pendingTasks=document.getElementById("pendingTasks");
const completionRate=document.getElementById("completionRate");
const progressBar=document.getElementById("progressBar");
const progressPercent=document.getElementById("progressPercent");
const toast=document.getElementById("toast");
const filterBtns=document.querySelectorAll(".filter-btn");
let tasks=JSON.parse(localStorage.getItem("taskflowpro"))||[];
let currentFilter="all";
function saveTasks(){
localStorage.setItem("taskflowpro",JSON.stringify(tasks));
}
function showToast(message){
toast.innerText=message;
toast.classList.add("show");
setTimeout(()=>{
toast.classList.remove("show");
},2500);
}
function updateStats(){
const total=tasks.length;
const completed=tasks.filter(task=>task.completed).length;
const pending=total-completed;
const rate=total===0?0:Math.round((completed/total)*100);
totalTasks.innerText=total;
completedTasks.innerText=completed;
pendingTasks.innerText=pending;
completionRate.innerText=rate+"%";
progressPercent.innerText=rate+"%";
progressBar.style.width=rate+"%";
}
function getPriorityValue(priority){
if(priority==="High")return 1;
if(priority==="Medium")return 2;
return 3;
}
function renderTasks(){
pendingContainer.innerHTML="";
completedContainer.innerHTML="";
let filtered=[...tasks];
const keyword=searchInput.value.toLowerCase().trim();
if(keyword!==""){
filtered=filtered.filter(task=>
task.name.toLowerCase().includes(keyword)||
task.category.toLowerCase().includes(keyword)||
task.priority.toLowerCase().includes(keyword)
);
}
if(currentFilter==="completed"){
filtered=filtered.filter(task=>task.completed);
}
if(currentFilter==="pending"){
filtered=filtered.filter(task=>!task.completed);
}
if(sortSelect.value==="priority"){
filtered.sort((a,b)=>getPriorityValue(a.priority)-getPriorityValue(b.priority));
}
else if(sortSelect.value==="date"){
filtered.sort((a,b)=>{
if(a.due===""&&b.due==="")return 0;
if(a.due==="")return 1;
if(b.due==="")return -1;
return new Date(a.due)-new Date(b.due);
});
}
else{
filtered.sort((a,b)=>b.id-a.id);
}
filtered.forEach(task=>{
const taskCard=document.createElement("div");
taskCard.className="task-item";
taskCard.innerHTML=`
<div class="task-content">
<h3>${task.name}</h3>
<p><strong>Category:</strong> ${task.category}</p>
<p><strong>Priority:</strong> ${task.priority}</p>
<p><strong>Due:</strong> ${task.due||"No Date"}</p>
<p><strong>Created:</strong> ${task.created}</p>
${task.completed?`<p><strong>Completed:</strong> ${task.completedDate}</p>`:""}
</div>
<div class="task-buttons">
${!task.completed?`<button class="complete-btn" onclick="completeTask(${task.id})">Complete</button>`:""}
<button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
<button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
</div>
`;
if(task.completed){
completedContainer.appendChild(taskCard);
}
else{
pendingContainer.appendChild(taskCard);
}
});
updateStats();
saveTasks();
}
function addTask(){
const name=taskInput.value.trim();
if(name===""){
showToast("Please enter a task");
return;
}
const task={
id:Date.now(),
name:name,
category:categorySelect.value,
priority:prioritySelect.value,
due:dueDate.value,
created:new Date().toLocaleString(),
completed:false,
completedDate:""
};
tasks.push(task);
taskInput.value="";
dueDate.value="";
showToast("Task added successfully");
renderTasks();
}
function completeTask(id){
const task=tasks.find(task=>task.id===id);
if(task){
task.completed=true;
task.completedDate=new Date().toLocaleString();
showToast("Task completed");
renderTasks();
}
}
function deleteTask(id){
tasks=tasks.filter(task=>task.id!==id);
showToast("Task deleted");
renderTasks();
}
function editTask(id){
const task=tasks.find(task=>task.id===id);
if(!task)return;
const newName=prompt("Edit Task",task.name);
if(newName===null)return;
if(newName.trim()===""){
showToast("Task name cannot be empty");
return;
}
task.name=newName.trim();
showToast("Task updated");
renderTasks();
}
function applyTheme(theme){
document.body.className="";
if(theme!=="default"){
document.body.classList.add(theme);
}
localStorage.setItem("taskflowtheme",theme);
}
filterBtns.forEach(btn=>{
btn.addEventListener("click",()=>{
filterBtns.forEach(button=>{
button.classList.remove("active");
});
btn.classList.add("active");
currentFilter=btn.dataset.filter;
renderTasks();
});
});
themeSelect.addEventListener("change",()=>{
applyTheme(themeSelect.value);
});
searchInput.addEventListener("input",renderTasks);
sortSelect.addEventListener("change",renderTasks);
addTaskBtn.addEventListener("click",addTask);
taskInput.addEventListener("keypress",e=>{
if(e.key==="Enter"){
addTask();
}
});
resetBtn.addEventListener("click",()=>{
if(confirm("Are you sure you want to delete all tasks?")){
tasks=[];
showToast("All tasks deleted");
renderTasks();
}
});
window.onload=()=>{
const savedTheme=localStorage.getItem("taskflowtheme")||"default";
themeSelect.value=savedTheme;
applyTheme(savedTheme);
renderTasks();
};