
//Add id to this URL to get a single user
const URL = "http://localhost:8080/api/students/"

export async function initFindStudent(match) {

  document.getElementById("btn-fetch-user").onclick = fetchStudentData
  if (match?.params?.id) {
    const id = match.params.id
    try {
      renderStudent(id)
    } catch (err) {
      document.getElementById("error").innerText = "Could not find student: " + id
    }
  }
  document.getElementById("student-id-input").value = ""
}

async function fetchStudentData() {
  document.getElementById("error").innerText = ""
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
    const student = await fetch(URL + id).then(res => res.json())
    //jsonplaceholder returns an empty object for students not found, NOT an error
    if (Object.keys(student).length === 0) {  //checks for an empty object = {}
      throw new Error("No student found for id:" + id)
    }

    document.getElementById("id").innerText = student.id;
    document.getElementById("name").innerText = student.name;
    document.getElementById("email").innerText = student.emailAddress;


  } catch (err) {
    document.getElementById("error").innerText = err
  }
}