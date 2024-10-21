const date = document.querySelector('.date')
const second = document.querySelector('.seconds')
const minute = document.querySelector('.minutes')
const hour = document.querySelector('.hours')
const inputtext = document.querySelector('.inputter')
const addbtn = document.querySelector('.addbtn')
const added = document.querySelector('.added')
const icons = document.querySelector('.icons')
const overlay = document.querySelector('.overlay')
const body = document.querySelector('body')
let todos =JSON.parse(localStorage.getItem('list'))||[] ;


let now = new Date();
let chislo=date.textContent=`${now.getDate()}.${now.getMonth()+1}.${now.getFullYear()}`

function livetime(){
    let time = new Date();
        hour.textContent= String(time.getHours()).padStart(2,'0');
        minute.textContent= time.getMinutes()<10?'0'+time.getMinutes():time.getMinutes();
        second.textContent= String(time.getSeconds()).padStart(2,'0');
       
    }
    
setInterval(livetime,1000);
   
// Local storage da list key ni ochib todos malumotlarini set qilamiz
function setAddedlocal (){
localStorage.setItem('list',JSON.stringify(todos))
} 



addbtn.addEventListener('click',()=>{
  let vaqt = new Date()
    let text = inputtext.value.trim()
    if(text!==''&&/\S/.test(text)){ // Tekst probelga tekshiriladi ikkinchi shartda
        todos.push({text:inputtext.value, time:(vaqt.getHours()<10?'0'+vaqt.getHours():vaqt.getHours())+':'+(vaqt.getMinutes()<10?'0'+vaqt.getMinutes():vaqt.getMinutes()),
          date:(vaqt.getDate()<10?'0'+vaqt.getDate():vaqt.getDate())+'.'+
          (vaqt.getMonth()<9?'0'+(vaqt.getMonth()+1):vaqt.getMonth()+1)+'.'+
          (vaqt.getFullYear()),completed:false }) 
        console.log(todos)
        setAddedlocal()
        inputtext.value = ''
        inputtext.placeholder='Type to do'
        showtodos()
    }else{
        inputtext.value=''
        inputtext.classList.add('placeholder')
        inputtext.placeholder='nothing to add..'
        setTimeout(()=>{inputtext.placeholder='Type to do',inputtext.classList.remove('placeholder')}, 2500);
    }
}) 
   
  inputtext.addEventListener('keydown',(event)=>{
    if(event.key==='Enter'){
      addbtn.click()
    }
  })
   // Yozilganlarni va localstorage dagi tekslardi chiqaramiz
function showtodos(){
    let todoslist = JSON.parse(localStorage.getItem('list'))
    // const todoslist = localStorage.getItem('list',todos) //Bunda xolos string qaytadi tepada object
    added.innerHTML=''
    if(todoslist){
    todoslist.forEach((item, i)=>{
        added.innerHTML+= `<li ondblclick="setCompleted(${i})" class="todosclass ${item.completed==true?'completed':''}">
        <div class="todotext"> ${item.text} </div> 
        <div class="compl"><small class="completed"> ${item.completed}</small></div>
        <div class="icons">
        <small class="vaqt">${item.time}</small>
        <small class="sana"> ${item.date}</small>
        <i class="fa-solid fa-eye"></i>
        <i class="fa-solid fa-eye-slash hidden"></i>
        <i class="fa-solid fa-pen-fancy"></i>
        <i class="fa-regular fa-circle-check hidden"></i>
        <i class="fa-solid fa-trash-can"></i>
        </div>  </li>`})
        iconci()
        }else{
            console.log('nothing')
    }
}
// IKONKALAR
function iconci(){
    const todosclass = document.querySelectorAll('.todosclass')
    const eye = document.querySelectorAll('.fa-eye')
    const slasheye = document.querySelectorAll('.fa-eye-slash')
    const pen = document.querySelectorAll('.fa-pen-fancy')
    const check = document.querySelectorAll('.fa-circle-check')
    const trashCan = document.querySelectorAll('.fa-trash-can')
    for(let i=0;i<todosclass.length;i++){
        eye[i].addEventListener('click',()=>{
                todosclass[i].classList.add('modal')
                eye[i].classList.add('hidden')
                overlay.classList.remove('hidden')
                slasheye[i].classList.remove('hidden')
                 })
        slasheye[i].addEventListener('click',()=>{
                todosclass[i].classList.remove('modal')
                slasheye[i].classList.add('hidden')
                overlay.classList.add('hidden')
                eye[i].classList.remove('hidden')
            })
                let textinputted=''
        //CHANGER
        pen[i].addEventListener('click',()=>{
                  todosclass[i].classList.add('modal')  
                  textinputted = todosclass[i].querySelector('.todotext')
                  eye[i].classList.add('hidden')
                  pen[i].classList.add('hidden')
                  check[i].classList.remove('hidden')
                    textinputted.contentEditable = true;
                    textinputted.focus(); // teksda probeldi paydo qiberadi bu bomasa texdi ustiga bosish kerak
                    overlay.classList.remove('hidden')
                })
          //PTICHKA
        check[i].addEventListener('click',()=>{
          
          const newtext = textinputted.textContent.trim()
            if (newtext !== "") {
              todos =JSON.parse(localStorage.getItem("list")) || [];
                if (todos) {
                todos[i].text = newtext;
                todos[i].time = new Date().getHours() + ":" +(new Date().getMinutes() <=9 ? "0" + new Date().getMinutes(): new Date().getMinutes());
                 }else{todos=[]}
                setAddedlocal();
                showtodos()
              } else {
                  alert("Xech qanday malumot kiritilmadi");
                  return;
                }
               todosclass[i].classList.remove('modal')
               textinputted.contentEditable= false;
               eye[i].classList.remove('hidden')
               slasheye[i].classList.add('hidden')
               pen[i].classList.remove('hidden')
               check[i].classList.add('hidden')
               overlay.classList.add('hidden')
          })
          todosclass[i].addEventListener('keydown',(event)=>{
            if(event.key==='Enter'){
              check[i].click()
            }
          })
          //DELETE
          trashCan[i].addEventListener('click',()=>{
            todos =JSON.parse(localStorage.getItem("list")) || [];
                if (todos) {
                  todos.splice(i,1) // i indexsidan boshlab 1 ta elementni ochiradi 
                  setAddedlocal()
                  showtodos()
                  overlay.classList.add('hidden')
                }
          })
     }

}
function setCompleted(id){
  const completedTodos = todos.map((item,i)=>{ // map di orniga bemalol forEach di ishlatsak boladi
    if(id==i){
      return{...item,completed: item.completed==true? false:true}
    }else{
  
      return {...item}//...itemdi hamma qismlari dgani misol item.text, item.time, item.completed
    }
  })
    todos= completedTodos
    setAddedlocal();
    showtodos()
}
 showtodos()