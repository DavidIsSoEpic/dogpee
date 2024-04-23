let elements = document.querySelectorAll('div');
let divtype = 0
let selected= false;
let random = Math.floor(Math.random()*elements.length);
console.log(random)

elements[random].classList.add('rounded');
elements[random].addEventListener('click', function() {
    window.location.href = "winpage.html"; // Redirect to victory page
});

/*for (let element of elements){
  let divtype = Math.floor(Math.random() * elements.length);
  console.log(divtype);
  
  if (divtype > 0 && selected == false){
    element.classList.add('rounded');
    selected = true;
  }
}*/

