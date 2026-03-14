async function login(){

const username=document.getElementById("username").value;
const password=document.getElementById("password").value;

const res=await fetch("http://localhost:3000/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({username,password})

});

const data=await res.json();

if(data.token){

localStorage.setItem("token",data.token);

window.location="dashboard.html";

}else{async function login(){

const username=document.getElementById("username").value;
const password=document.getElementById("password").value;

const res = await fetch("http://localhost:3000/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({username,password})

});

if(res.status!==200){

alert("Login Gagal");

return;

}

const data = await res.json();

localStorage.setItem("token",data.token);

window.location="dashboard.html";

}

alert("Login Gagal");

}

}