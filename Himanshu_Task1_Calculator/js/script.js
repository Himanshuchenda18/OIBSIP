const display=document.getElementById("display");
const historyDisplay=document.getElementById("history");

function appendValue(value){
if(display.value==="Error"){
display.value="";
}
display.value+=value;
}

function clearDisplay(){
display.value="";
historyDisplay.innerHTML="";
}

function deleteNumber(){
display.value=display.value.slice(0,-1);
}


function calculate(){
try{
let expression=display.value;
if(expression===""){
return;
}
expression=expression.replaceAll("×","*");
expression=expression.replaceAll("÷","/");
expression=expression.replaceAll("^","**");
expression=expression.replaceAll("%","/100");
historyDisplay.innerHTML=expression+" =";
let result=eval(expression);
if(!isFinite(result)){
throw Error();
}
display.value=Number(result.toFixed(10));
}
catch{
display.value="Error";
}
}


function squareRoot(){
try{
let value=Number(display.value);
if(value<0){
throw Error();
}
historyDisplay.innerHTML="√"+value;
display.value=Math.sqrt(value);
}
catch{
display.value="Error";
}
}

function squareNumber(){
try{
let value=Number(display.value);
historyDisplay.innerHTML=value+"²";
display.value=value*value;
}
catch{
display.value="Error";
}
}

function reciprocal(){
try{
let value=Number(display.value);
if(value===0){
throw Error();
}
historyDisplay.innerHTML="1/"+value;
display.value=1/value;
}
catch{
display.value="Error";
}
}

document.addEventListener("keydown",function(event){
let key=event.key;
if(key>="0"&&key<="9"){
appendValue(key);
}
else if(["+","-","*","/","."].includes(key)){
appendValue(key);
}
else if(key==="Enter"){
calculate();
}
else if(key==="Backspace"){
deleteNumber();
}
else if(key==="Escape"){
clearDisplay();
}
else if(key==="%"){
appendValue("%");
}
});


display.addEventListener("input",function(){
let value=display.value;
let dots=(value.match(/\./g)||[]).length;
if(dots>1){
display.value=value.slice(0,-1);
}
});

//created professional calculator