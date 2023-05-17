
//Add id to this URL to get a single user
const URL = "http://localhost:8080/api/students"
let id
let studentData = []
export async function initFindStudent(match) {


  if (match?.params?.id) {
    id = match.params.id
    try {
      renderStudent(id)
    } catch (err) {
      console.log()
    }
  }
  const onClick = (event) => {
    if (event.target.id.startsWith("btn-fetch-student")) {
      fetchStudentData()
    }
  }
  window.addEventListener('click', onClick)
  document.getElementById("student-id-input").value = ""
}

async function fetchStudentData() {
  const id = document.getElementById("student-id-input").value
  if (!id) {
    document.getElementById("error").innerText = "Please provide an id"
    return
  }
  try {
    renderStudent(id)
  } catch (err) {
    console.log("UPS " + err.message)
  }
}

async function renderStudent(id) {
  try {
    const student = await fetch(URL + "/" + id).then(res => res.json())
    studentData = student
    console.log(studentData)
    const coursesArray = studentData.courses.map(
        course =>
            `
        <tr>
            <td>${course.id}</td>
            <td>${course.name}</td>
            <td>${course.startDate}</td>
            <td>${course.endDate}</td>
            <td>${course.ectsPoints}</td>
            <td>${course.maxStudents}</td>
        </tr>
            `);
        document.getElementById("find-student-body").innerHTML = coursesArray.join("\n")
    console.log (coursesArray)




    document.getElementById("find-student-id").innerText = student.id;
    document.getElementById("find-student-name").innerText = student.name;
    document.getElementById("find-student-email").innerText = student.emailAddress;






  } catch (err) {
    console.log(err)
  }
}

// async function renderStudent(id) {