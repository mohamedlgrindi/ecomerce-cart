const products=[
    {id:1 , name:"Mercides",price:19.99 ,image:"mercides.jpg"},
    {id:2 , name:"BMW-M3",price:29.99 ,image:"BMW.jpg"},
    {id:3 , name:"Porche",price:39.99 ,image:"porche.jpg"},
    {id:4 , name:"Maclaren",price:49.99 ,image:"maclaren.jpg"}
]

let cart=JSON.parse(localStorage.getItem("cart"))||[];

let ProductListElem=document.getElementById("product-list");
let ProductCount=document.getElementById("cart-count");
let Totalprice=document.getElementById("cart-total");
let cartItemsEl=document.getElementById("cart-items");
let checkoutBtn=document.getElementById("checkout-btn");

// Render products to the product list
function renderProducts(){
    ProductListElem.innerHTML=products
    .map((product)=>`
    <div class="products" data-id=${product.id}>
    <img src="${product.image}" alt="${product.name}" />
    <h3>${product.name}</h3>
    <p>$${product.price}</p>
    <button>Add to Cart</button>
    </div>
    
    `).join("");


}
// Add to cart function
function addToCart(id){

let product=products.find((p)=>p.id===id);
if(!product){
    console.error("This product not found!");
    return;
}

const cartItem=cart.find((item)=>item.id===id);
if(cartItem){
    cartItem.quantity++;
}
else{
    cart.push({...product,quantity:1});
}
updateCart();
}

function removeFromCart(id){
    cart=cart.filter((cartItem)=>cartItem.id!==id);
    updateCart();
}

function updateCart(){
    ProductCount.textContent=cart.reduce((sum,item)=>sum+=item.quantity,0);

    cartItemsEl.innerHTML=cart.
    map((item)=>`
     <div id="cartItem">
     <span>${item.name} (x${item.quantity})</span>
     <span>$${item.price}</span>
     <button onclick="removeFromCart(${item.id})">Remove</button>
     </div>
    `).join("");

    const total=cart.reduce((sum,item)=>sum+=item.quantity*item.price,0);
    Totalprice.textContent=total.toFixed(2);

    localStorage.setItem("cart",JSON.stringify(cart));
}

function handleCheckout(){
    if(cart.length===0){
        alert(`Your cart is empty`);
        return;
    }

    alert(`Thank you for your purchase! Total: $${Totalprice.textContent}`);
    cart=[];
    updateCart();
}


ProductListElem.addEventListener("click",(e)=>{
    if(e.target.tagName==="BUTTON"){
        const productId = +e.target.closest(".products").dataset.id;
        addToCart(productId);
    }
});

checkoutBtn.addEventListener("click", handleCheckout);

renderProducts();
updateCart();
