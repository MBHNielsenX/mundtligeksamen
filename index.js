import "https://unpkg.com/navigo"  //Will create the global Navigo object used below


import {
  setActiveLink, adjustForMissingHash, renderTemplate, loadTemplate
} from "./utils.js"

import { showMatchObject } from "./pages/show-match/match.js"
import { initStudents } from "./pages/students/students.js"
import { initFindStudent } from "./pages/findStudent/findStudent.js"
import { initTeachers } from "./pages/teachers/teachers.js"
import { initFindTeacher } from "./pages/findTeacher/findTeacher.js"
import { initCourses } from "./pages/courses/courses.js"

window.addEventListener("load", async () => {


  const templateStudents = await loadTemplate("./pages/students/students.html")
  const templateFindStudent = await loadTemplate("./pages/findStudent/findStudent.html")

  const templateMatch = await loadTemplate("./pages/show-match/match.html")
  const templateNotFound = await loadTemplate("./pages/notFound/notFound.html")
  const templateTeachers = await loadTemplate("./pages/teachers/teachers.html")
  const templateFindTeacher = await loadTemplate("./pages/findTeacher/findTeacher.html")
  const templateCourses = await loadTemplate("./pages/courses/courses.html")

  adjustForMissingHash()

  const router = new Navigo("/", { hash: true });

  window.router = router

  router
    .hooks({
      before(done, match) {
        setActiveLink("menu", match.url)
        done()
      }
    })
    .on({

      "/": () => document.getElementById("content").innerHTML =
        `<h2>Home</h2>
      <p style='margin-top:2em'>
      This is the content of the Home Route
      </p>
     `,
        "/teachers": () => {
          renderTemplate(templateTeachers, "content")
            initTeachers()
        },
        "/find-teacher": (match) => {
            renderTemplate(templateFindTeacher, "content")
                initFindTeacher(match)
        },
      "/students": () => {
        renderTemplate(templateStudents, "content")
        initStudents()
      },
      "/find-student": (match) => {
        renderTemplate(templateFindStudent, "content")
        initFindStudent(match)
      },
        "/courses": () => {
            renderTemplate(templateCourses, "content")
            initCourses()
        },

      "/show-match": (match) => {
        renderTemplate(templateMatch, "content")
        showMatchObject(match)
      }
    })
    .notFound(() => {
      renderTemplate(templateNotFound, "content")
    })
    .resolve()
});


window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
  alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber
    + ' Column: ' + column + ' StackTrace: ' + errorObj);
}