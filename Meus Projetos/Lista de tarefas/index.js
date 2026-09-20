const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const ulEl = document.querySelector(".list");

// CORREÇÃO 1: Garante que 'list' seja pelo menos um array vazio [] se o localStorage estiver vazio
let list = JSON.parse(localStorage.getItem("list")) || [];

// Agora o forEach não vai quebrar se não houver tarefas salvas
list.forEach(task => {
    toDoList(task);
});

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    toDoList();
});

function toDoList(task) {
    let newTask = inputEl.value;
    if (task) {
        newTask = task.name;
    }

    // Impede que o usuário adicione uma tarefa em branco
    if (!newTask) return;

    const liEl = document.createElement("li");
    if (task && task.checked) {
        liEl.classList.add("checked");
    }
    liEl.innerText = newTask;
    ulEl.appendChild(liEl);
    inputEl.value = "";

    const checkBtnEl = document.createElement("div");
    checkBtnEl.innerHTML = ' <i class="fa-solid fa-square-check"></i>'; // Adicionado fechamento da tag </i>
    liEl.appendChild(checkBtnEl);

    const trashBtnEl = document.createElement("div");
    trashBtnEl.innerHTML = '<i class="fa-solid fa-trash"></i>'; // Adicionado fechamento da tag </i>
    liEl.appendChild(trashBtnEl);

    checkBtnEl.addEventListener("click", () => {
        liEl.classList.toggle("checked");
        updateLocalStorage();
    });

    trashBtnEl.addEventListener("click", () => {
        liEl.remove();
        updateLocalStorage(); // CORREÇÃO 2: Corrigido o erro de digitação 'pdateLocalStorage'
    });

    updateLocalStorage();
}

function updateLocalStorage() {
    const liEls = document.querySelectorAll("li"); // Alterado o nome para 'liEls' no plural para evitar confusão no escopo
    let list = [];
    liEls.forEach(li => {
        list.push({
            name: li.innerText.trim(), // .trim() limpa espaços extras se necessário
            checked: li.classList.contains("checked")
        });
    });
    localStorage.setItem("list", JSON.stringify(list));
}
