const modules =  {
    semesterId : 1,
    moduleId : 1,
}

function addModule(id){
    const moduleToAdd = document.getElementById("semester"+id+"Modules")
    
    moduleToAdd.insertAdjacentHTML("beforeend", ` 
        <tbody id="module${id}" >
            <td><input type="text" class="moduleName" placeholder="SYS"></td>
            <td><input type="number" class="moduleWeight" placeholder="10"></td>
            <td><input type="number" class="moduleMark" placeholder="80"></td>
            <td><button type="button" aria-label="Delete Module" class="deleteBtn material-symbols-outlined" onclick="deleteModule(${id})">delete</button></td>
        </tbody>
          
    `)
}

function deleteModule(id){
    const moduleToRemove = document.getElementById("module"+id)
    moduleToRemove.remove()
}

function deleteSemester(id){
    const semesterToRemove = document.getElementById("semester"+id)
    semesterToRemove.remove()
}

document.getElementById("addSemester").addEventListener("click",() => {
    document.getElementById("semesterList").insertAdjacentHTML("beforeend",`<div class="modulesList" id="semester${++modules.semesterId}">
    <h2 class="semText">Semester ${modules.semesterId}</h2>
    <button type="button" aria-label="Delete Semester" class="deleteSemester material-symbols-outlined" onclick="deleteSemester(${modules.semesterId})">clear</button>
<table class="modules" id="semester${modules.semesterId}Modules">
        <thead>
            <th>Modules Name</th>
            <th>Weight</th>
            <th>Marks (%)</th>
        </thead>
       ${moduleInput(++modules.moduleId)}
</table>
${moduleFooter(modules.semesterId)}
</div>
`) 

})



function moduleInput(id){
     return `
     <tbody class="modulesBody" id="module${id}" >
                    <td><input type="text" class="moduleName" placeholder="SYS"></td>
                    <td><input type="number" class="moduleWeight" placeholder="10"></td>
                    <td><input type="number" class="moduleMark" placeholder="80"></td>
                    <td><button type="button" aria-label="Delete Module" class="deleteBtn material-symbols-outlined" onclick="deleteModule(${id})">delete</button></td>
    </tbody> `
}


function moduleFooter(semesterId){
    return `<div class="moduleFooter">
    <button aria-label="Add Module" class="btn addBtn" onclick="addModule(${semesterId})">
        <span class="material-symbols-outlined addIcon ">add</span> 
        <span>Add Modules</span>
    </button>
    
     <button aria-label="Clear Module" class="btn clearBtn" onclick="clearModule(${semesterId})">
        <span class="material-symbols-outlined clearIcon">clear</span> 
        <span>Clear Modules</span>
     </button>
  </div>`
}


document.getElementById("calculateTotal").addEventListener("click",() => {
    const mWeight = document.getElementsByClassName("moduleWeight");
    const mMark = document.getElementsByClassName("moduleMark");

    for(var i = 0; i < mWeight.length; i++){
        console.log(mWeight[i].value)
    }
   
    console.log(mMark)
})