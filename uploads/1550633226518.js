const cartItems = [];
const barcodeInfo = [{id:1,name:"Apple",price:2},{id:2,name:"Leamon",price:1},{id:3,name:"Banana",price:3}]

function addItemsToCart(itemBarcode){
	cartItems.push(itemBarcode);
}

function removeItemFromCart(itemBarcode){
	let idx = cartItems.findIndex((o)=>{return o.id===itemBarcode.id});
	if(idx>-1){
	   cartItems.splice(idx,1)
}
}

function billingCartInfo(){
	cartItems.forEach(vd,ix=>{
	
})
}
