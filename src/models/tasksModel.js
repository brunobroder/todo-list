const connection = require('./connection');
// Está importando o arquivo de conexão

// Busca todas as tasks no banco
const getAll = async () => {
    const [tasks] = await connection.execute('SELECT * FROM tasks');
    return tasks;
};

// Cadastra uma nova tarefa no banco de dados
const createTask = async (task) => {
    const { title } = task;
    const dateUTC = new Date(Date.now()).toUTCString();

    const query = 'INSERT INTO tasks(title, status, created_at) VALUES (?,?,?)';
    const [createdTask] = await connection.execute(query, [title, 'pendente', dateUTC]);

    return {
        id: createdTask.insertId,
        title,
        status: 'pendente',
        created_at: dateUTC
    };
};

const deleteTask = async (id) => {
    const [removedTask] = await connection.execute('DELETE FROM tasks WHERE id = ?', [id]);
    return removedTask;
};

const updateTask = async (id, task) => {
    const { title, status } = task;

    const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?';

    const [updatedTask] = await connection.execute(query, [title, status, id]);
    return updatedTask;
};

module.exports = {
    getAll,
    createTask,
    deleteTask,
    updateTask
};
