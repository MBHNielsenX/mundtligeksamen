const URL = "http://localhost:8080/api/teachers"
import { sanitizeStringWithTableRows } from "../../utils.js"


export function initAddTeacher() {


}


async function redirect(evt) {
    const target = evt.target
    if (target.id.includes("redirect")) {
        window.router.navigate("teachers")
    }
}

