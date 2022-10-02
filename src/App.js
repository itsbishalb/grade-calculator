  import React, { useEffect } from 'react';
  import './App.css';
  
  import {removeModule,clearModules,removeSemester,CalculateTotal,AddNewModule,handleEditButton} from './functionality'
  const values = {
    moduleID : 0,
    semesterID : 0,
  }  
  function Header () {
    return (
    <header>
      <h1 className="headerText">Grade Calculator</h1>
    </header>
  )}
  
  function App() {
    const [showOptions, setShowOptions] = React.useState(true)
    const [resultsOptions, setResultsOptions] = React.useState(false)
    const [semesterHTML, addSemesterHTML] = React.useState([<MoodleList showOptions={showOptions} values={values} semesterID={values.semesterID} key ={values.semesterID} moduleID={values.moduleID}/>])

    // only update this page when showOption is changed. 
    React.useEffect(() => {
      const showHideClass = document.querySelectorAll('.showHide'); // get all the elements with class show hide
      const inputFields = document.querySelectorAll('.inputFields'); // get all the elements with class inputFields
      showHideClass.forEach(showHide => {
        showHide.style.display = showOptions ? "" : "none" // changed each elements display
      });

      inputFields.forEach(inputField => {
        inputField.style.pointerEvents = showOptions ? "auto" : "none" // make input non editable
      })
    },[showOptions])


    function reload(){
      window.location.reload()
    }
    function AddSemester(){
        values.semesterID = values.semesterID + 1
        addSemesterHTML((current) => {
          return [...current, <MoodleList values={values} showOptions={showOptions} setShowOptions={setShowOptions} semesterID={values.semesterID} key ={values.semesterID} moduleID={values.moduleID}/>]
        })
    }
  
  
  
    return (
      <div className="App">
        <Header />
        <div className={"container"}>
          <LoadSemesterList semesterHTML={semesterHTML} values={values}/>
          <FooterSection AddSemester={AddSemester} reload={reload} showOptions={showOptions} setShowOptions={setShowOptions} resultsOptions ={resultsOptions} setResultsOptions = {setResultsOptions}/>
        </div>
      </div>
    );
  }
  
  
  function LoadSemesterList(props){
    return (
    <div id="semesterList"> 
          {props.semesterHTML}
    </div>
    )
  }
  
  function MoodleList(props){ 
    const showOptions = props.showOptions ? "showOptions" : "hideOptions"
    const [moduleHtml, addModuleHTML] = React.useState([<AddModule moduleID={props.moduleID} key={props.moduleID}/>])
    return (
              <div className="modulesList" id={"semester"+props.semesterID}>
                  <h2 className="semText inputFields" contentEditable="true" suppressContentEditableWarning={true}>Semester Name</h2>
                  <button type="button" aria-label="Delete Semester" className={"deleteSemester material-symbols-outlined showHide"}  onClick={() => removeSemester(props.semesterID)}>clear</button>
                 <table className="modules" id={"semester"+props.semesterID+"Modules"}>
                      <thead>
                        <tr>
                          <th>Modules Name</th>
                          <th>Weight</th>
                          <th>Marks (%)</th>
                        </tr>
                      </thead>
                {moduleHtml}
              </table>
              <MoodleFooter semesterID={props.semesterID} values = {props.values} moduleID={props.moduleID} addModuleHTML={addModuleHTML} />
            </div>
      )
    }

  export function AddModule(props){
    const [values,setValues] = React.useState({
      moduleName: "",
      moduleWeight: "",
      moduleMark:"",
    })


  // valaditing input
  function validateInput(event){
      const {name,value} = event.target
      if(name == "moduleWeight"){
        if(isNaN(value) && value){
          return
        }
      } else if(name == "moduleMark"){
          if((isNaN(value) || (parseFloat(value) > 100 || parseFloat(value) < 0)) && value){
            return
          }
      }
      setValues((current) => {    
        return {...current, [name] : value}
      })
  }
    return (
      <tbody className="modulesBody" id={"module" + props.moduleID} >
        <tr>
          <td><input type="text" className="moduleName inputFields" name="moduleName" placeholder={values.moduleName == "" ? "SYS":values.moduleName} value={values.moduleName} onInput ={validateInput}/></td>
          <td><input type="number" className="moduleWeight inputFields" name="moduleWeight" placeholder={values.moduleWeight == "" ? "10":values.moduleWeight} value={values.moduleWeight} onInput ={validateInput}/> </td>
          <td><input type="number" min="0" className="moduleMark inputFields" name="moduleMark" placeholder={values.moduleMark == "" ? "0-100%":values.moduleMark} value={values.moduleMark} onInput ={validateInput} /></td>
          <td><button type="button" aria-label="Delete Module" className="deleteBtn material-symbols-outlined showHide" onClick={() => removeModule(props.moduleID,props.addModuleHTML)}>delete</button></td>
        </tr>
    </tbody>
    )
  
  }
  
  function FooterSection (props){
    const showOptions = props.showOptions ? "showOptions" : "hideOptions"
    const resultsOptions = props.resultsOptions ? "showOptions" : "hideOptions"
    return (
      <footer>
        <div id="defaultFooter">
            <button type="button" id="calculateTotal" className={showOptions} onClick={() => CalculateTotal(props.setShowOptions,props.setResultsOptions)}>Calculate</button>
            <button type="button" id="addSemester" className={showOptions}  onClick={props.AddSemester}>Add Semester</button>
        </div>
        <div>
          {/* show/hide results options */}
          <div className={resultsOptions}>
            <div id="overallGrade">
                <h1>Overall Grade</h1>
                <h1 id="overallMarks">0.00%</h1>
            </div>
            <div id="resetOptions">
                <button type="button" id="newCalculation" onClick={props.reload}>New Calculation</button>
                <button type="button" id="download">Download</button>
                <button type="button" id="edit" onClick={() => handleEditButton(props.setShowOptions, props.setResultsOptions)}>Edit</button>
            </div>
          </div>
        </div>


    </footer>
    )
  }
  
  function MoodleFooter(props){
      return (
      <div >
      <div className="moduleFooter">
        <button aria-label="Add Module" className="btn addBtn showHide" onClick={() => AddNewModule(props.values,props.addModuleHTML)}>
          <span className="material-symbols-outlined addIcon ">add</span>
          <span>Add Modules</span>
        </button>
        <button aria-label="Clear Module" className="btn clearBtn showHide" onClick={() => clearModules(props.semesterID)}>
          <span className="material-symbols-outlined clearIcon">clear</span>
          <span>Clear Modules</span>
        </button>
    </div>
    </div>
    )
  }
  
  export default App;