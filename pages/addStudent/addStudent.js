const URL = "http://localhost:8080/api/students"




export function initAddStudent() {

    const onClick = (event) => {
        if (event.target.id.startsWith("add-new-student")) {
            addStudent()
            redirect()
        }
    }
    window.addEventListener('click', onClick)

}

async function addStudent() {
    const studentName = document.getElementById("asn1").value
    const studentEmail = document.getElementById("asn2").value

    const student = {
        name: studentName,
        emailAddress: studentEmail,

    }
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    }
    try {
        const response = await fetch(URL, options)
        const json = await response.json()
        console.log(json)
        window.router.navigate("students")
    } catch (err) {
        console.log(err)
    }
}


async function redirect() {
    const target = evt.target
    if (target.id.includes("redirect")) {
        window.router.navigate("teachers")
    }
}