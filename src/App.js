  import React from 'react';
  import './App.css';
  
  import {removeModule,clearModules,removeSemester,CalculateTotal,AddNewModule} from './functionality'
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
    const [semesterHTML, addSemesterHTML] = React.useState([<MoodleList values={values} semesterID={values.semesterID} key ={values.semesterID} moduleID={values.moduleID}/>])
    function reload(){
      window.location.reload()
    }
    function AddSemester(){
        values.semesterID = values.semesterID + 1
        addSemesterHTML((current) => {
          return [...current, <MoodleList values={values} semesterID={values.semesterID} key ={values.semesterID} moduleID={values.moduleID}/>]
        })
    }
  
  
  
    return (
      <div className="App">
        <Header />
        <div className={"container"}>
          <LoadSemesterList semesterHTML={semesterHTML} values={values}/>
          <FooterSection AddSemester={AddSemester} reload={reload} />
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
  
    const [moduleHtml, addModuleHTML] = React.useState([<AddModule moduleID={props.moduleID} key={props.moduleID}/>])
    return (
              <div className="modulesList" id={"semester"+props.semesterID}>
                  <h2 className="semText" contentEditable="true" suppressContentEditableWarning={true}>Semester Name</h2>
                  <button type="button" aria-label="Delete Semester" className="deleteSemester material-symbols-outlined" onClick={() => removeSemester(props.semesterID)}>clear</button>
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
    return (
      <tbody className="modulesBody" id={"module" + props.moduleID} >
        <tr>
          <td><input type="text" className="moduleName" placeholder="SYS" /></td>
          <td><input type="number" className="moduleWeight" placeholder="10" required /> </td>
          <td><input type="number" className="moduleMark" placeholder="80" required /></td>
          <td><button type="button" aria-label="Delete Module" className="deleteBtn material-symbols-outlined" onClick={() => removeModule(props.moduleID,props.addModuleHTML)}>delete</button></td>
        </tr>
    </tbody>
    )
  
  }
  
  function FooterSection (props){
    return (
      <footer>
        <div id="defaultFooter">
            <button type="button" id="calculateTotal" onClick={CalculateTotal}>Calculate</button>
            <button type="button" id="addSemester" onClick={props.AddSemester}>Add Semester</button>
        </div>
        <div id="overallGrade">
            <h1>Overall Grade</h1>
            <h1 id="overallMarks">0.00%</h1>
        </div>
        <div id="resetOptions">
            <button type="button" id="newCalculation" onClick={props.reload}>New Calculation</button>
            <button type="button" id="download">Download</button>
            <button type="button" id="edit">Edit</button>
        </div>
    </footer>
    )
  }
  
  function MoodleFooter(props){
      return (
      <div className="moduleFooter">
        <button aria-label="Add Module" className="btn addBtn" onClick={() => AddNewModule(props.values,props.addModuleHTML)}>
          <span className="material-symbols-outlined addIcon ">add</span>
          <span>Add Modules</span>
        </button>
  
        <button aria-label="Clear Module" className="btn clearBtn" onClick={() => clearModules(props.semesterID)}>
          <span className="material-symbols-outlined clearIcon">clear</span>
          <span>Clear Modules</span>
        </button>
    </div>
    )
  }
  
  export default App;