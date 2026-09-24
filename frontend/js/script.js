const tbody = document.querySelector('tbody'); 
// Seleciona o elemento <tbody> da tabela no HTML, onde as tarefas serão inseridas.

const addForm = document.querySelector('.add-form'); 
// Seleciona o formulário usado para adicionar novas tarefas.

const inputTask = document.querySelector('.input-task'); 
// Seleciona o campo de entrada de texto onde o usuário digita o título da tarefa.

const fetchTasks = async () => {
  const response = await fetch('http://localhost:8080/tasks')
  // Faz uma requisição GET para buscar todas as tarefas no servidor.
  const tasks = await response.json()
  // Converte a resposta em JSON.
  return tasks;
  // Retorna a lista de tarefas.
}

const addTask = async (event) => {
  event.preventDefault();
  // Impede o comportamento padrão do formulário (recarregar a página).

  const task = { title: inputTask.value };
  // Cria um objeto tarefa com o título digitado pelo usuário.

  await fetch('http://localhost:8080/tasks', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  // Envia a nova tarefa para o servidor usando POST.

  loadTasks();
  // Atualiza a lista de tarefas na tela.
  inputTask.value = '';
  // Limpa o campo de entrada.
}

const deleteTask = async (id) => {
  await fetch(`http://localhost:8080/tasks/${id}`, {
    method: 'delete',
  });
  // Faz uma requisição DELETE para remover a tarefa pelo ID.

  loadTasks();
  // Atualiza a lista de tarefas na tela.
}

const updateTask = async ({ id, title, status }) => {
  await fetch(`http://localhost:8080/tasks/${id}`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, status }),
  });
  // Faz uma requisição PUT para atualizar título e status da tarefa.

  loadTasks();
  // Atualiza a lista de tarefas na tela.
}

const formatDate = (dateUTC) => {
  const options = { dateStyle: 'long', timeStyle: 'short' };
  // Define formato de data e hora.
  const date = new Date(dateUTC).toLocaleString('pt-br', options);
  // Converte a data para o formato brasileiro.
  return date;
}

const createElement = (tag, innerText = '', innerHTML = '') => {
  const element = document.createElement(tag);
  // Cria um elemento HTML com a tag especificada.

  if (innerText) {
    element.innerText = innerText;
    // Define o texto interno do elemento.
  }

  if (innerHTML) {
    element.innerHTML = innerHTML;
    // Define o HTML interno do elemento.
  }

  return element;
}

const createSelect = (value) => {
  const options = `
    <option value="pendente">pendente</option>
    <option value="em andamento">em andamento</option>
    <option value="concluída">concluída</option>
  `;
  // Define as opções do select para status da tarefa.

  const select = createElement('select', '', options);
  // Cria o elemento <select> com as opções.

  select.value = value;
  // Define o valor inicial do select conforme o status da tarefa.

  return select;
}

const createRow = (task) => {
  const { id, title, created_at, status } = task;
  // Desestrutura os dados da tarefa.

  const tr = createElement('tr');
  // Cria uma linha da tabela.
  const tdTitle = createElement('td', title);
  // Cria célula com o título da tarefa.
  const tdCreatedAt = createElement('td', formatDate(created_at));
  // Cria célula com a data formatada.
  const tdStatus = createElement('td');
  // Cria célula para o status.
  const tdActions = createElement('td');
  // Cria célula para os botões de ação.

  const select = createSelect(status);
  // Cria o select com o status atual.

  select.addEventListener('change', ({ target }) => updateTask({ ...task, status: target.value }));
  // Atualiza a tarefa no servidor quando o status é alterado.

  const editButton = createElement('button', '', '<span class="material-symbols-outlined">edit</span>');
  // Cria botão de edição com ícone de lápis.
  const deleteButton = createElement('button', '', '<span class="material-symbols-outlined">delete</span>');
  // Cria botão de exclusão com ícone de lixeira.

  const editForm = createElement('form');
  // Cria formulário para edição do título.
  const editInput = createElement('input');
  // Cria campo de texto para editar título.

  editInput.value = title;
  // Define valor inicial do input como título atual.
  editForm.appendChild(editInput);
  // Adiciona input dentro do formulário.

  editForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // Impede recarregar página ao enviar formulário.
    updateTask({ id, title: editInput.value, status });
    // Atualiza tarefa com novo título.
  });

  editButton.addEventListener('click', () => {
    tdTitle.innerText = '';
    // Limpa célula do título.
    tdTitle.appendChild(editForm);
    // Substitui título pelo formulário de edição.
  });

  editButton.classList.add('btn-action');
  deleteButton.classList.add('btn-action');
  // Adiciona classes CSS para estilizar os botões.

  deleteButton.addEventListener('click', () => deleteTask(id));
  // Remove tarefa ao clicar no botão de excluir.

  tdStatus.appendChild(select);
  // Adiciona select na célula de status.

  tdActions.appendChild(editButton);
  tdActions.appendChild(deleteButton);
  // Adiciona botões na célula de ações.

  tr.appendChild(tdTitle);
  tr.appendChild(tdCreatedAt);
  tr.appendChild(tdStatus);
  tr.appendChild(tdActions);
  // Adiciona todas as células na linha.

  return tr;
}

const loadTasks = async () => {
  const tasks = await fetchTasks();
  // Busca todas as tarefas no servidor.

  tbody.innerHTML = '';
  // Limpa o conteúdo atual da tabela.

  tasks.forEach((task) => {
    const tr = createRow(task);
    // Cria uma linha para cada tarefa.
    tbody.appendChild(tr);
    // Adiciona a linha na tabela.
  });
}

addForm.addEventListener('submit', addTask);
// Adiciona evento para criar nova tarefa ao enviar formulário.

loadTasks();
// Carrega todas as tarefas ao iniciar a aplicação.
