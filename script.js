let $=document;
//call Elem dom
let parent_cart=$.getElementById('cart');
let card_btn=$.querySelectorAll('.card__btn');
let total_elem=$.querySelector('.total');
let purchase_btn=$.querySelector('.purchase')
//variables
let product_image;
//products array
let products=[
    {id:1,name:'bread',src:'img/mahsol1.PNG',price:11,count:1},
    {id:2,name:'fruits and vegetables',src:'img/mahsol2.PNG',price:76,count:1},
    {id:3,name:'almonds',src:'img/mahsol3.PNG',price:50,count:1},
    {id:4,name:'meat',src:'img/mahsol4.PNG',price:22,count:1},
    {id:5,name:'mushrooms',src:'img/mahsol5.PNG',price:11,count:1},
    {id:6,name:'lettuce',src:'img/mahsol6.PNG',price:76,count:1},
    {id:7,name:'tomato',src:'img/mahsol7.PNG',price:50,count:1},
    {id:8,name:'respberry',src:'img/mahsol8.PNG',price:22,count:1}
]
//user shopping cart
let include_array=[]
//add to cart
card_btn.forEach((btn)=>{
    btn.addEventListener('click',()=>{

    //find information products
    let information=btn.parentNode.childNodes;
    let product_name=information[1].textContent;
    //find image and price
    products.forEach((find)=>{
    if(product_name==find.name){
     product_image=find.src;

    }
})

//creat Element 
let product_container=$.createElement('div');
product_container.classList.add('product-cart-container');
let product_cart=$.createElement('div');
product_cart.classList.add('product-cart');
let info_product_container=$.createElement('div');
info_product_container.classList.add('info-container');
let image=$.createElement('img');
image.classList.add('card-image');
image.src=product_image;
let name=$.createElement('p');
name.classList.add('name');
name.innerHTML=product_name;
let price=$.createElement('p')
products.forEach((item)=>{
    if(product_name==item.name){
    price.innerHTML=item.price

    }
})
price.classList.add('price');
let count_input=$.createElement('input')
count_input.type='number';
count_input.classList.add('input')
count_input.min=1
count_input.max=100
//change price with count
count_input.addEventListener('input',()=>{
    products.forEach((item)=>{
        if(product_name==item.name){
            item.count=count_input.value
            price.innerHTML=count_input.value*item.price
            include_array.forEach((item)=>{
                if(product_name==item.name){
                item.price=price.textContent
                }
            })
        }
    })
    //call re handle price function
    re_hanlder_total()

})
//change count product
products.forEach((count)=>{
    count_input.value=count.count
})
//creat remove btn
let btn_container=$.createElement('div');
btn_container.classList.add('cart-btn');
let button=$.createElement('button');
button.innerHTML='remove'
button.classList.add('delete-product');
// find product in user cart
let finally_count=include_array.some((item)=>{
    return item.name==product_name
})

if(!finally_count){
    info_product_container.append(image);
    info_product_container.append(name);
    info_product_container.append(price);
    info_product_container.append(count_input)
    product_cart.append(info_product_container);
    btn_container.append(button);
    product_cart.append(btn_container);
    product_container.append(product_cart)
    parent_cart.append(product_container);
    //creat item
    let info={
        name:product_name,
        price:price.textContent,
    }
    //add to user cart
    include_array.push(info)
        //call change total price function
        totaLhandler(count_input)
        
}
if(finally_count){
    products.forEach((item)=>{
        if(product_name==item.name){
            count_input.value=item.count
        }
    })
}

//remove btn handle
remove_item(product_name,button,product_container)

//

})

})
//remove item handler func
const remove_item=(name,remove,parent)=>{
remove.addEventListener('click',()=>{
    parent.remove()
    let index=include_array.findIndex((item)=>{
    return name==item.name
    })
   include_array.splice(index,1)
   console.log(include_array);
   if(include_array.length==0){
    total_elem.innerHTML='total:'+ 0 +'$'
   }else{
   re_hanlder_total()
   }
})
}
function totaLhandler(count){
    let sum=0
    include_array.forEach((item)=>{
        console.log(item.name);
        sum+=Math.ceil(item.price*count.value)
            total_elem.innerHTML='total:'+sum+'$'
       
    })
}
function re_hanlder_total(){
    let count_sum=0
    include_array.forEach((item)=>{
        count_sum+=Math.ceil(item.price)
        total_elem.innerHTML='total:'+count_sum+'$'
    })
}
//purchase btn event
purchase_btn.addEventListener('click',()=>{
    alert("tanks for your purchase")
    location.reload()
})

