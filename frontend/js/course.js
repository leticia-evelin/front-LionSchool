'use strict'

import { fetchStudent } from "./api.js";
import { fetchData } from "./api.js";

const courseTitle = await fetchData();
const id = localStorage.getItem('id_card')
const selectedValue = localStorage.getItem('selected')

let courseStudents
if (selectedValue == undefined) {
    courseStudents = await fetchStudent(id, 'todos');
} else {
    courseStudents = await fetchStudent(id, selectedValue);
}

const select = document.getElementById('select');
select.addEventListener('change', () => {
    const valorSelecionado = select.value;
    localStorage.setItem('selected', valorSelecionado)
    location.reload()
});

const createTitle = () => {
    const ds = courseTitle.cursos[0].nome.slice(17)
    const rds = courseTitle.cursos[1].nome.slice(17);
    const createTitleCourse = document.createElement('h1')
    createTitleCourse.classList.add('title-course')
    createTitleCourse.style.fontStyle = 'bold'
    if (id == 'DS') {
        createTitleCourse.textContent = ds
        console.log(ds);
    } else if (id == 'RDS') {
        createTitleCourse.textContent = rds
        console.log(rds);
    }
    return createTitleCourse
}

const createCardAluno = (aluno) => {
    const cardAluno = document.createElement('a')
    const host = window.location.protocol + '//' + window.location.host;
    const studentPath = '/frontend/pages/student.html';
    cardAluno.href = host + studentPath;
    cardAluno.target = 'blank_'

    if (aluno.status == "Finalizado") {
        cardAluno.classList.add('students__finished')
    } else {
        cardAluno.classList.add('students__studying')
    }

    const img = document.createElement('img')
    img.classList.add('students__image')
    img.src = aluno.foto

    const name = document.createElement('h3')
    name.classList.add('students__name')
    name.textContent = aluno.nome.toUpperCase()

    cardAluno.append(img, name)
    cardAluno.id = aluno.matricula

    cardAluno.onclick = () => {
        var storage = localStorage.setItem('id_cardAluno', cardAluno.id)
    }
    return cardAluno
}


const loadStudents = async () => {
    const box = document.getElementById('box')
    const container = document.getElementById('container-students')
    const alunos = courseStudents.alunos.map(createCardAluno)
    container.append(...alunos)
    box.replaceChildren(createTitle(), container)
}

loadStudents()
