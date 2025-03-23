// Lista de livros da Bíblia (exemplo simplificado)
const bibleBooks = [
    "Gênesis", "Êxodo", "Levítico", "Números", "Deuteronômio",
    "Josué", "Juízes", "Rute", "1 Samuel", "2 Samuel"
    // Adicione todos os 66 livros para uma versão completa
];

// Popular o seletor de livros
function populateBooksSelect() {
    const select = document.getElementById("books-select");
    bibleBooks.forEach(book => {
        const option = document.createElement("option");
        option.value = book;
        option.textContent = book;
        select.appendChild(option);
    });
}

// Criar o plano de leitura
function createReadingPlan() {
    const selectedBooks = Array.from(document.getElementById("books-select").selectedOptions).map(option => option.value);
    const chaptersInput = document.getElementById("chapters-input").value;
    const days = parseInt(document.getElementById("days-input").value, 10);

    let chaptersToRead = [];

    // Adicionar capítulos de livros selecionados (exemplo: 10 capítulos por livro)
    if (selectedBooks.length > 0) {
        selectedBooks.forEach(book => {
            for (let i = 1; i <= 10; i++) {
                chaptersToRead.push(`${book} ${i}`);
            }
        });
    }

    // Adicionar capítulos específicos digitados
    if (chaptersInput) {
        const specifiedChapters = chaptersInput.split(",").map(chap => chap.trim());
        chaptersToRead = chaptersToRead.concat(specifiedChapters);
    }

    // Dividir os capítulos pelo número de dias
    const plan = [];
    const chaptersPerDay = Math.ceil(chaptersToRead.length / days);
    for (let i = 0; i < days; i++) {
        const start = i * chaptersPerDay;
        const end = start + chaptersPerDay;
        plan.push(chaptersToRead.slice(start, end));
    }

    // Salvar no localStorage
    localStorage.setItem("readingPlan", JSON.stringify(plan));
    localStorage.setItem("currentDay", 1);

    // Exibir a seção de leitura
    document.getElementById("reading-plan").style.display = "block";
    loadDailyReading();
}

// Carregar a leitura do dia
function loadDailyReading() {
    const plan = JSON.parse(localStorage.getItem("readingPlan"));
    const currentDay = parseInt(localStorage.getItem("currentDay"), 10);
    if (plan && currentDay <= plan.length) {
        const reading = plan[currentDay - 1].join(", ");
        document.getElementById("daily-reading").innerText = `Dia ${currentDay}: ${reading}`;
    } else {
        document.getElementById("daily-reading").innerText = "Plano concluído!";
    }
}

// Marcar como lido e avançar
function markAsRead() {
    let currentDay = parseInt(localStorage.getItem("currentDay"), 10);
    const plan = JSON.parse(localStorage.getItem("readingPlan"));
    if (currentDay < plan.length) {
        currentDay++;
        localStorage.setItem("currentDay", currentDay);
        loadDailyReading();
    } else {
        alert("Você concluiu o plano!");
    }
}

// Inicializar a página
document.addEventListener("DOMContentLoaded", () => {
    populateBooksSelect();
    document.getElementById("create-plan").addEventListener("click", createReadingPlan);
    document.getElementById("mark-as-read").addEventListener("click", markAsRead);

    // Carregar plano existente, se houver
    if (localStorage.getItem("readingPlan")) {
        document.getElementById("reading-plan").style.display = "block";
        loadDailyReading();
    }
});
