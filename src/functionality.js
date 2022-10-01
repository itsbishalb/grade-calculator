import {AddModule} from './App'
// Receive moduleID as a paramater and then get the element by its ID to remove that specific module
function removeModule(moduleID){
    const moduleToRemove = document.getElementById("module"+moduleID)
    moduleToRemove.remove()

}

// Receive semesterID as a paramater and clear all the input fields in that specific semester
function clearModules(semesterID){
  const fieldsToClear = document.getElementById("semester"+semesterID+"Modules").getElementsByTagName("input")

 // loop through all the inputs in specific semester and then set the value of that input to empty string
  for(let i = 0 ; i < fieldsToClear.length; i++){
    fieldsToClear[i].value = ""
  }
}

// receive semesterID and used get element by ID to remove that specific semester.
function removeSemester(semesterID){
  const semesterToRemove = document.getElementById("semester"+semesterID)
  semesterToRemove.remove()
}



// this function calculate the average grade. 

function CalculateTotal(){
    const hideOptions = document.getElementById("showOptions")
    const results = document.getElementById("showResults")
    const mWeight = document.getElementsByClassName("moduleWeight");
    const mMark = document.getElementsByClassName("moduleMark");
    const len = mWeight.length >= mMark.length ? mWeight.length : mMark.length
    let marksWeight = 0
    let weightSum = 0
    for(let i = 0; i < len; i++){
        let currentWeight = parseFloat(mWeight[i].value)
        if(currentWeight=== "" || currentWeight === undefined || currentWeight === null){

          currentWeight = 0;
        }

        let currentMark = parseFloat(mMark[i].value)
        if(currentMark=== "" || currentMark === undefined || currentMark === null){
          currentMark = 0;
        }
      marksWeight += currentMark * currentWeight
      weightSum += currentWeight
    }
    const total = (marksWeight/weightSum).toFixed(2); // 2 decimal placess
    document.getElementById("overallMarks").innerText =  total > 0 ? `${total}%`: "0.00" + "%"
}



// receive values as a paramater which got moduleID and addModuleHTML which is used to add to moduleHTML state array.
function AddNewModule(values,addModuleHTML){
    values.moduleID++;
    addModuleHTML((current) => {
      return [...current, <AddModule moduleID={values.moduleID}  key={values.moduleID} addModuleHTML={addModuleHTML}/>]
    })
  }




  
  export {removeModule,clearModules,removeSemester,CalculateTotal,AddNewModule}