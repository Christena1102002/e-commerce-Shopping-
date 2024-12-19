
let product = [];

document.addEventListener("DOMContentLoaded", () => {
    const favCard = localStorage.getItem("card");
    const displayCard = document.getElementById("myCard");

    if (favCard) {
        product = JSON.parse(favCard);

        product.forEach((product_item, i) => {
            const id = product_item.id;
            if (typeof product_item.customcount === 'undefined') {
                product_item.customcount = 0; 
            }

            const div = document.createElement("div");
            div.className="container";
            div.innerHTML = `
            <div class="parent-card">
            <div class="image">
                <img src="${product_item.image}">
            </div>
                <div class="detailProduct">
                <h2>${product_item.title}</h2>
                <p>${product_item.price}$</p>
                <button class="minus" onclick="minusCount(${i}, ${id})">
                    <i class="fa-solid fa-minus"></i>
                </button>
                <span class="count" id="count-${id}">${product_item.customcount}</span>
                <button class="plus" onclick="plusCount(${i}, ${id})">
                    <i class="fa-solid fa-plus"></i>
                </button>
                </div>
                </div>
            `;

            displayCard.appendChild(div);
        });
        calculateTotal();
    }
});


function plusCount(i, id) {
    const span = document.getElementById(`count-${id}`);

    if (typeof product[i].customcount === 'undefined') {
        product[i].customcount = 0;
    }

    product[i].customcount++;
    span.innerHTML = product[i].customcount;
    calculateTotal();

    localStorage.setItem("card", JSON.stringify(product)); // تحديث البيانات في localStorage
}


function minusCount(i, id) {
    const span = document.getElementById(`count-${id}`);

    if (product[i].customcount > 0) {
        product[i].customcount--;
        span.innerHTML = product[i].customcount;
        calculateTotal();
        localStorage.setItem("card", JSON.stringify(product)); // تحديث البيانات في localStorage
    }
}

function calculateTotal(){
    let total=0;
    product.forEach(item=>{
        if(item.customcount>0){
            total+=item.customcount*item.price;
        }
    });
  const totalEle=document.getElementById("totalPrice");
  totalEle.innerHTML=`Total price:${total.toFixed(2)}`;
  return total;
}
const buy=document.getElementById("buyNow");
buy.addEventListener("click",()=>
{
const total=calculateTotal();
   window.location="../pagesHTML/order.html";
}
);
localStorage.setItem("price",total);