const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const statusFilter = document.getElementById('status-filter');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  taskList.innerHTML = '';
  
  const filterValue = statusFilter.value;
  const filteredTasks = tasks.filter(task => {
    if (filterValue === 'completed') {
      return task.completed;
    } else if (filterValue === 'notcompleted') {
      return !task.completed;
    }
    return true;
  });

  filteredTasks.forEach((task, index) => {
    const li = document.createElement('li');
    if (task.completed) li.classList.add('completed');
    
    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    
    const completeButton = document.createElement('button');
    completeButton.classList.add('complete-btn');
    completeButton.textContent = task.completed ? 'Cancel' : 'Complite';
    completeButton.addEventListener('click', () => toggleComplete(index));

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(index));

    li.appendChild(taskText);
    li.appendChild(completeButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
}

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newTask = {
    text: taskInput.value,
    completed: false,
  };
  tasks.push(newTask);
  taskInput.value = '';
  saveTasks();
  renderTasks();
});


function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

statusFilter.addEventListener('change', renderTasks);
renderTasks();