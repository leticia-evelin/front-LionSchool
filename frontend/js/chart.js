
const matriculaALuno = localStorage.getItem('id_cardAluno')

const getStudentInformartions = (matriculaALuno) => {

  const fetchData = async () => {
    const url = `https://lion-school.onrender.com/v1/lion-school/status/disciplinas/${matriculaALuno}`;
    const response = await fetch (url);
    const data = await response.json();
    return {...data}
  };

  const ctx = document.getElementById("myChart");

  const updateChart = async () => {
    const data = await fetchData();

    const disciplineName = data.disciplinas.map((index) => {
      return index.nome;
    });
    const disciplineAverage = data.disciplinas.map((index) => {
      console.log(index.media)
      return index.media;

    });


    let arrayColors = [];
    disciplineAverage.forEach((mediaMateria) => {
      if (mediaMateria >= 0 && mediaMateria < 50) {
        arrayColors.push("rgba(193, 16, 16, 1)");
      } else if (mediaMateria >= 50 && mediaMateria < 80) {
        arrayColors.push("rgba(229, 182, 87, 1)");
      } else if (mediaMateria >= 80 && mediaMateria <= 100) {
        arrayColors.push("rgba(51, 71, 176, 1)");
      }
    });

    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: disciplineName,
        datasets: [
          {
            label: `Media de Notas`,
            data: disciplineAverage,
            borderWidth: 1,
            borderRadius: 10,
            backgroundColor: arrayColors,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    myChart.data.labels = disciplineName;
    myChart.data.datasets[0].data = disciplineAverage;
    myChart.update();
  }


  const studentsInfo = async () => {
    const data = await fetchData();
    const container = document.getElementById("informations");
  
    const nomeCompleto = data.nome;
    const palavras = nomeCompleto.split(" ");
    const nomeFormatado = palavras.map(palavra => {
      return palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();
    }).join(" ");

    const studentProfile = document.getElementById("student-profile");
    studentProfile.classList.add("student-profile");

    const studentName = document.createElement('p')
    if(palavras.length >= 4){
      studentName.style.fontSize = '22px'
    }
    studentName.textContent = nomeFormatado

    const studentImage = document.createElement('img')
    studentImage.classList.add('student-image')
    studentImage.src = data.foto

    studentProfile.append(studentName, studentImage) 
    container.replaceChildren(studentProfile, ctx);
  };

  studentsInfo();
  updateChart();
};

getStudentInformartions(matriculaALuno);
