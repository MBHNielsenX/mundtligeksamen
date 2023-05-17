const URL = "http://localhost:8080/api/course"
import { sanitizeStringWithTableRows } from "../../utils.js"


export function initCourses() {
    document.getElementById("tbl-body").onclick = showCourseDetails
    getAllCourses()
}

export async function getAllCourses() {
    try {
        const coursesFromServer = await fetch(URL).then(res => res.json())
        showAllData(coursesFromServer)
    }
    catch (err) {
        console.error("UPPPPPS: " + err)
    }
}

function showAllData(data) {
    const tableRowsArray = data.map(course => `
  <tr>                                
    <td>${course.id} </td>              
    <td>${course.name} </td>  
    <td>${course.startDate} </td>
    <td>${course.endDate} </td>
    <td>${course.ectsPoints} </td>
    <td>${course.maxStudents} </td>
    <td></td>                  
    <td>
    <button id="${course.id}-column-id" type="button"  class="other-page btn btn-sm btn-primary">Details</button> </td>      
  </tr>`)

    const tableRowsString = tableRowsArray.join("\n")
    document.getElementById("tbl-body").innerHTML = sanitizeStringWithTableRows(tableRowsString)
}

async function showCourseDetails(evt) {
    const target = evt.target
    if (!target.id.includes("-column-id")) {
        return
    }
    const id = target.id.replace("-column-id", "")
    if (target.classList.contains("other-page")) {
        window.router.navigate("find-course?id=" + id)
    }
}
