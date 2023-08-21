let usermsg = document.getElementsByClassName('card-header');

Array.from(usermsg).forEach((e,i)=>{
e.innerHTML = `Message : ${i+1}`
})





