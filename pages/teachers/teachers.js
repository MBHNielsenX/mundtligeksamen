const URL = "http://localhost:8080/api/teachers"
import { sanitizeStringWithTableRows } from "../../utils.js"


export function initTeachers() {
    document.getElementById("tbl-body").onclick = showTeacherDetails
    document.getElementById("add-teacher").onclick = addTeacherRedirect
    getAllTeachers()

}

export async function getAllTeachers() {
    try {
        const teachersFromServer = await fetch(URL).then(res => res.json())
        showAllData(teachersFromServer)
    }
    catch (err) {
        console.error("UPPPPPS: " + err)
    }
}

function showAllData(data) {
    const tableRowsArray = data.map(teacher => `
  <tr>                                
    <td>${teacher.id} </td>              
    <td>${teacher.name} </td>                     
    <td>${teacher.emailAddress} </td>  
    <td>
    <button id="${teacher.id}-column-id" type="button"  class="other-page btn btn-sm btn-primary">Details</button> </td>      
  </tr>`)

    const tableRowsString = tableRowsArray.join("\n")
    document.getElementById("tbl-body").innerHTML = sanitizeStringWithTableRows(tableRowsString)
}

async function showTeacherDetails(evt) {
    const target = evt.target
    if (!target.id.includes("-column-id")) {
        return
    }
    const id = target.id.replace("-column-id", "")
    if (target.classList.contains("other-page")) {
        window.router.navigate("find-teacher?id=" + id)
    }
}

async function addTeacherRedirect(evt) {
    const target = evt.target
    if (target.id.includes("add-teacher")) {
        window.router.navigate("add-teacher")
    }
}

// async function addTeacherRedirect(evt) {

