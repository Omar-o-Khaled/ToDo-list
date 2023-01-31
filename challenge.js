let fieldInput=document.querySelector('[name="Task"]');
let btn_add=document.querySelector('.btn_add');
let tasks_contianer=document.querySelector(".tasks");
let clearAll=document.querySelector(".clearAll");

let main_array=[];

if(window.localStorage.getItem("Tasks-Array")){
    main_array=JSON.parse(window.localStorage.getItem("Tasks-Array"));
}
// window.localStorage.clear()
btn_add.onclick=function(){
    input_value=fieldInput.value.trim();
    if(input_value!==""){
        // create Element Object
        createElementObject(input_value);
        fieldInput.value="";
        clearLocalStorage()
    }
}

function createElementObject(input_value){
    // task Info
    let task_OBJ={
        id: Date.now(),
        title: input_value,
        done:false,
    }
    main_array.push(task_OBJ)
    createTaskDiv(main_array);    
}
function createTaskDiv(tasks_array){
    tasks_contianer.innerHTML="";
        tasks_array.forEach(function(taskEle){
            // create Elemnet 
            let singleTask=document.createElement("div");
            let taskDIV=document.createElement("div");
            let del=document.createElement("p");
            let imgDone=document.createElement("img");
            // add Element classes
            singleTask.className="task_icon";
            taskDIV.className="text";
            del.className="del";
            imgDone.className="done";
            //img atrr 
            imgDone.src="done.png";
            imgDone.alt="Done";
            // add contant
            taskDIV.innerHTML=taskEle.title;
            del.innerHTML="Delete";
            // add did class to Element has done = true
            if(taskEle.done){
                singleTask.classList.add("did")
            }   
            // append
            singleTask.append(taskDIV,del,imgDone);
            tasks_contianer.append(singleTask);
            del.addEventListener("click",deleteElement)
            imgDone.addEventListener("click", function(){              
                    this.parentElement.classList.toggle("did");
                    main_array.forEach(function(ele){
                        if(imgDone.parentElement.firstChild.innerHTML===ele.title){
                            if(imgDone.parentElement.classList.contains("did")){
                                ele.done=true;
                            }else{
                                ele.done=false;
                            }
                        }
                    })
                    addToLocalStorage(JSON.stringify(main_array));
                }
            )
        })
    addToLocalStorage(JSON.stringify(main_array));
}

// add tasks array to local storage
function addToLocalStorage(storageArray){
    window.localStorage.setItem("Tasks-Array",storageArray);
}

// create tasks from local storage
function createTasksFromLocalStorage(){
    if(window.localStorage.getItem("Tasks-Array")){
        createTaskDiv(JSON.parse(window.localStorage.getItem("Tasks-Array")));
        // createTaskDiv(main_array)
    }
}
createTasksFromLocalStorage();
// remove element
function deleteElement(){
    let del=this;
    main_array.forEach(function(ele){
        if(del.parentElement.firstChild.innerHTML===ele.title){
            main_array.splice(main_array.indexOf(ele),1);
        }
    })
    createTaskDiv(main_array);
    clearLocalStorage()
}
function clearLocalStorage(){
    if(tasks_contianer.innerHTML!==""){
        
        clearAll.style.cssText="font-size: 30px; padding: 5px;margin-top: 50px;";
        document.body.addEventListener("click",function(ele){
            if(ele.target.className==="clearAll"){
                window.localStorage.clear();
                main_array=[];
                tasks_contianer.innerHTML="";
                clearAll.style.cssText="margin: 0; padding: 0; font-size: 0;";
            }
        })
    }else{
        clearAll.style.cssText="margin: 0; padding: 0; font-size: 0;";
    }
}
clearLocalStorage()