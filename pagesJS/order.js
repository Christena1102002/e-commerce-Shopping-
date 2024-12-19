const order=localStorage.getItem(price);
const totalPrice=document.getElementById("price");
const head=document.createElement("h2");
head.innerHTML=order;
totalPrice.appendChild(head);
