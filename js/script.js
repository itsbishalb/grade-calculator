const add_btn_form = document.getElementById("add-btn-form");
const add_module_btn = document.getElementById("add-module-btn");
const form_box = document.getElementById("form-box");
const cover_container = document.getElementById("cover");
let module = {
    id:"",
    name: "",
    weight: "",
    grade:0
}

let id_count = 0;

let user_modules = []
add_btn_form.addEventListener("click", function(){
    form_box.style.display = "none";
    cover_container.style.display = "none";
    module.id = id_count++;
    module.name = document.querySelector('input[name=module_name]').value
    module.weight = document.querySelector('input[name=module_weight]').value
    module.grade = document.querySelector('input[name=grade_achived]').value

    user_modules[id_count] = module; 

    add_modules()
})

add_module_btn.addEventListener("click",function(){
    cover_container.style.display = "block";
    form_box.style.display = "block";
})




function add_modules(){
const modules_list = document.getElementById("modules-list"); 
modules_list.innerHTML += 
    `
        <div class="modules" id="module${id_count}">
            <p class="module-name">${user_modules[id_count].name}</p>
            <p class="module-weight">${user_modules[id_count].weight}</p>
            <p class="grade-achived">${user_modules[id_count].grade}</p>
            <button class="material-symbols-outlined" onclick="remove(${id_count})">
                remove_circle
            </button>
        </div>
    `
}


function remove (num){
    el_remove = document.getElementById("module"+num)
    el_remove.remove()
    user_modules[num] = null;
    console.log(user_modules[num])
}


