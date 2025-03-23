// Lista completa dos livros da Bíblia com o número de capítulos
const bibleBooksChapters = {
    "Gênesis": 50, "Êxodo": 40, "Levítico": 27, "Números": 36, "Deuteronômio": 34,
    "Josué": 24, "Juízes": 21, "Rute": 4, "1 Samuel": 31, "2 Samuel": 24,
    "1 Reis": 22, "2 Reis": 25, "1 Crônicas": 29, "2 Crônicas": 36, "Esdras": 10,
    "Neemias": 13, "Ester": 10, "Jó": 42, "Salmos": 150, "Provérbios": 31,
    "Eclesiastes": 12, "Cânticos": 8, "Isaías": 66, "Jeremias": 52, "Lamentações": 5,
    "Ezequiel": 48, "Daniel": 12, "Oséias": 14, "Joel": 3, "Amós": 9, "Obadias": 1,
    "Jonas": 4, "Miquéias": 7, "Naum": 3, "Habacuque": 3, "Sofonias": 3,
    "Ageu": 2, "Zacarias": 14, "Malaquias": 4, "Mateus": 28, "Marcos": 16,
    "Lucas": 24, "João": 21, "Atos": 28, "Romanos": 16, "1 Coríntios": 16,
    "2 Coríntios": 13, "Gálatas": 6, "Efésios": 6, "Filipenses": 4, "Colossenses": 4,
    "1 Tessalonicenses": 5, "2 Tessalonicenses": 3, "1 Timóteo": 6, "2 Timóteo": 4,
    "Tito": 3, "Filemom": 1, "Hebreus": 13, "Tiago": 5, "1 Pedro": 5, "2 Pedro": 3,
    "1 João": 5, "2 João": 1, "3 João": 1, "Judas": 1, "Apocalipse": 22
};

const bibleBooksList = Object.keys(bibleBooksChapters);

// Popular o seletor de livros
function populateBooksSelect() {
    const select = document.getElementById("books-select");
    bibleBooksList.forEach(book => {
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

    if (isNaN(days) || days <= 0) {
        alert("Por favor, insira um número de dias válido.");
        return;
    }

    let chaptersToRead = [];

    // Adicionar capítulos de livros selecionados
    if (selectedBooks.length > 0) {
        selectedBooks.forEach(book => {
            for (let i = 1; i <= bibleBooksChapters[book]; i++) { // Usar o número correto de capítulos
                chaptersToRead.push(`${book} ${i}`);
            }
        });
    }

    // Adicionar capítulos específicos digitados, suportando ranges (ex: Gênesis 1-3)
    if (chaptersInput) {
        const specifiedChapters = chaptersInput.split(",").map(chap => chap.trim());
        specifiedChapters.forEach(chapterSpec => {
            if (chapterSpec.includes('-')) {
                const [bookChapterRange, chapterEnd] = chapterSpec.split('-').map(s => s.trim());
                const [book, startChapter] = bookChapterRange.split(' ').map(s => s.trim());
                const endChapter = parseInt(chapterEnd, 10);
                const start = parseInt(startChapter, 10);

                if (book && start && endChapter && bibleBooksChapters[book]) {
                    for (let i = start; i <= endChapter; i++) {
                        if (i <= bibleBooksChapters[book]) { // Verificar se o capítulo está dentro do range válido
                            chaptersToRead.push(`${book} ${i}`);
                        }
                    }
                } else if (book && start && !endChapter && bibleBooksChapters[book]) {
                     if (start <= bibleBooksChapters[book]) {
                        chaptersToRead.push(`${book} ${start}`);
                    }
                }

            } else {
                chaptersToRead.push(chapterSpec);
            }
        });
    }

    if (chaptersToRead.length === 0) {
        alert("Por favor, selecione livros ou especifique capítulos para criar um plano.");
        return;
    }

    // *** ADICIONE ESTES console.log STATEMENTS ***
    console.log("chaptersToRead:", chaptersToRead); // Verifique a lista completa de capítulos
    console.log("days:", days); // Verifique o número de dias
    const plan = [];
    const chaptersPerDay = Math.ceil(chaptersToRead.length / days);
    console.log("chaptersPerDay:", chaptersPerDay); // Verifique o cálculo de capítulos por dia
    let chapterIndex = 0;
    for (let i = 0; i < days; i++) {
        const dailyChapters = [];
        for (let j = 0; j < chaptersPerDay && chapterIndex < chaptersToRead.length; j++) {
            dailyChapters.push(chaptersToRead[chapterIndex++]);
        }
        plan.push(dailyChapters);
        console.log(`Dia ${i+1} chapters:`, dailyChapters); // Verifique os capítulos de cada dia
    }

    console.log("plan:", plan); // Verifique a estrutura completa do plano

    // Salvar no localStorage
    localStorage.setItem("readingPlan", JSON.stringify(plan));
    localStorage.setItem("currentDay", 1);

    // Exibir a seção de leitura e mensagem de sucesso
    document.getElementById("reading-plan").style.display = "block";
    document.getElementById("plan-creation").style.display = "none"; // Ocultar a criação do plano
    loadDailyReading();
    alert("Plano de leitura criado com sucesso!"); // Feedback para o usuário
}

// Carregar a leitura do dia
function loadDailyReading() {
    const plan = JSON.parse(localStorage.getItem("readingPlan"));
    const currentDay = parseInt(localStorage.getItem("currentDay"), 10);
    if (plan && currentDay <= plan.length) {
        const reading = plan[currentDay - 1].join(", ");
        document.getElementById("daily-reading").innerText = `Dia ${currentDay}: ${reading}`;
    } else {
        document.getElementById("daily-reading").innerText = "Parabéns! Plano de leitura concluído!";
        document.getElementById("mark-as-read").style.display = "none"; // Ocultar botão ao concluir
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
        alert("Você já concluiu o plano!"); // Mensagem mais clara
    }
}

function resetReadingPlan() {
    localStorage.removeItem("readingPlan");
    localStorage.removeItem("currentDay");
    document.getElementById("reading-plan").style.display = "none";
    document.getElementById("plan-creation").style.display = "block"; // Mostrar a criação do plano novamente
    document.getElementById("mark-as-read").style.display = "block"; // Mostrar botão marcar como lido novamente
    document.getElementById("daily-reading").innerText = "Nenhum plano carregado.";
    alert("Plano de leitura resetado.");
}


// Inicializar a página
document.addEventListener("DOMContentLoaded", () => {
    populateBooksSelect();
    document.getElementById("create-plan").addEventListener("click", createReadingPlan);
    document.getElementById("mark-as-read").addEventListener("click", markAsRead);
    document.getElementById("reset-plan").addEventListener("click", resetReadingPlan); // Adicionar evento para resetar

    // Carregar plano existente, se houver
    if (localStorage.getItem("readingPlan")) {
        document.getElementById("plan-creation").style.display = "none"; // Ocultar a criação do plano se já existe
        document.getElementById("reading-plan").style.display = "block";
        loadDailyReading();
    }
});
