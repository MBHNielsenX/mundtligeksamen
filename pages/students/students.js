const URL = "http://localhost:8080/api/students"
import { sanitizeStringWithTableRows } from "../../utils.js"


export function initStudents() {
  document.getElementById("tbl-body").onclick = showStudentDetails
  document.getElementById("add-student").onclick = addStudentRedirect
  getAllStudents()
}

export async function getAllStudents() {
  try {
    const studentsFromServer = await fetch(URL).then(res => res.json())
    showAllData(studentsFromServer)
  }
  catch (err) {
    console.error("UPPPPPS: " + err)
  }
}

function showAllData(data) {
  const tableRowsArray = data.map(student => `
  <tr>                                
    <td>${student.id} </td>              
    <td>${student.name} </td>                     
    <td>${student.emailAddress} </td>  
    <td>
    <button id="${student.id}-column-id" type="button"  class="other-page btn btn-sm btn-primary">Details</button> </td>      
  </tr>`)

  const tableRowsString = tableRowsArray.join("\n")
  document.getElementById("tbl-body").innerHTML = sanitizeStringWithTableRows(tableRowsString)
}

async function showStudentDetails(evt) {
  const target = evt.target
  if (!target.id.includes("-column-id")) {
    return
  }
  const id = target.id.replace("-column-id", "")
  if (target.classList.contains("other-page")) {
    window.router.navigate("find-student?id=" + id)
  }
}
async function addStudentRedirect(evt) {
  const target = evt.target
  if (target.id.includes("add-student")) {
    window.router.navigate("add-student")
  }
}

// async function addStudentRedirect(evt) {
