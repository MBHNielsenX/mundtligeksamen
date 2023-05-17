
//Add id to this URL to get a single user
const URL = "http://localhost:8080/api/teachers/"

export async function initFindTeacher(match) {

    document.getElementById("btn-fetch-teacher").onclick = fetchTeacherData
    if (match?.params?.id) {
        const id = match.params.id
        try {
            renderTeacher(id)
        } catch (err) {
            document.getElementById("error").innerText = "Could not find teacher: " + id
        }
    }
    document.getElementById("teacher-id-input").value = ""
}

async function fetchTeacherData() {
    document.getElementById("error").innerText = ""
    const id = document.getElementById("teacher-id-input").value
    if (!id) {
        document.getElementById("error").innerText = "Please provide an id"
        return
    }
    try {
        renderTeacher(id)
    } catch (err) {
        console.log("UPS " + err.message)
    }
}

async function renderTeacher(id) {
    try {
        const teacher = await fetch(URL + id).then(res => res.json())
        //jsonplaceholder returns an empty object for students not found, NOT an error
        if (Object.keys(teacher).length === 0) {  //checks for an empty object = {}
            throw new Error("No teacher found for id:" + id)
        }

        document.getElementById("id").innerText = teacher.id;
        document.getElementById("name").innerText = teacher.name;
        document.getElementById("email").innerText = teacher.emailAddress;


    } catch (err) {
        document.getElementById("error").innerText = err
    }
}
//Add id to this URL to get a single user