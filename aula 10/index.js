const addButton = document.getElementById("add-task");
const taskInput = document.querySelector("#new-task input");
const tasksContainer = document.getElementById("tasks");

// função para verificar se há tarefas, caso exista, mostrar o container
function toggleTasksVisibility() {
  if (tasksContainer.children.length === 0) {
    tasksContainer.style.display = "none";
  } else {
    tasksContainer.style.display = "block";
  }
}

// função de criação de tarefas
function createTask(taskContent) {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");

  // checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("task-checkbox");

  // texto da tarefa criada
  const taskText = document.createElement("span");
  taskText.classList.add("task-text");
  taskText.textContent = taskContent;

  // adicionar o evento de mudança no checkbox para alterar o estilo do texto
  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      taskText.classList.add("completed");
    } else {
      taskText.classList.remove("completed");
    }
  });

  // botão de excluir a tarefa
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-btn");
  deleteButton.textContent = "Delete";

  deleteButton.addEventListener("click", function () {
    tasksContainer.removeChild(taskDiv);
    toggleTasksVisibility();
  });

  // adicionar checkbox, texto e o botão de deletar na div da tarefa
  taskDiv.appendChild(checkbox);
  taskDiv.appendChild(taskText);
  taskDiv.appendChild(deleteButton);

  // Adicionando a nova tarefa ao container
  tasksContainer.appendChild(taskDiv);

  toggleTasksVisibility();
}

// função de adicionar a tarefa
function addTask() {
  const taskContent = taskInput.value.trim();

  if (taskContent !== "") {
    createTask(taskContent);
    taskInput.value = "";
  }
}

// função que permite criar uma tarefa ao pressionar a tecla enter
taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

// função para habilitar/desabilitar o botão baseado no conteúdo da caixa de texto
function toggleButtonState() {
  const taskContent = taskInput.value.trim();
  if (taskContent === "") {
    addButton.disabled = true;
    addButton.classList.add("disabled"); // Adiciona a classe para estilizar o botão
  } else {
    addButton.disabled = false;
    addButton.classList.remove("disabled"); // Remove a classe quando o botão estiver habilitado
  }
}

// Adiciona o evento de input para monitorar as mudanças no campo de texto
taskInput.addEventListener("input", toggleButtonState);

// Adiciona o evento de click para o botão
addButton.addEventListener("click", addTask);

// Inicializa o estado do botão (em caso de recarregamento da página ou foco inicial)
toggleButtonState();

// Inicializa a visibilidade das tarefas
