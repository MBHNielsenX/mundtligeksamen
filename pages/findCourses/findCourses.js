
//Add id to this URL to get a single course
const URL = "http://localhost:8080/api/course/"
const STUDENT_URL = "http://localhost:8080/api/students/"
const TEACHER_URL = "http://localhost:8080/api/teachers/"


export async function initFindCourse(match) {

    document.getElementById("btn-fetch-course").onclick = fetchCourseData
    if (match?.params?.id) {
        const id = match.params.id
        try {
            renderCourse(id)
        } catch (err) {
            document.getElementById("error").innerText = "Could not find course: " + id
        }
    }
    document.getElementById("course-id-input").value = ""
}

async function fetchCourseData() {
    document.getElementById("error").innerText = ""
    const id = document.getElementById("course-id-input").value
    if (!id) {
        document.getElementById("error").innerText = "Please provide an id"
        return
    }
    try {
        renderCourse(id)
    } catch (err) {
        console.log("UPS " + err.message)
    }
}

async function renderCourse(id) {
    try {
        const course = await fetch(URL + id).then(res => res.json())
        //jsonplaceholder returns an empty object for students not found, NOT an error
        if (Object.keys(course).length === 0) {  //checks for an empty object = {}
            throw new Error("No course found for id:" + id)
        }

        document.getElementById("course-id").innerText = course.id;
        document.getElementById("course-name").innerText = course.name;
        document.getElementById("course-start-date").innerText = course.startDate;
        document.getElementById("course-end-date").innerText = course.endDate;
        document.getElementById("course-ects-points").innerText = course.ectsPoints;
        document.getElementById("course-max-students").innerText = course.maxStudents;
    } catch (err) {
        document.getElementById("error").innerText = err
    }
}

//Add id to this URL to get a single user