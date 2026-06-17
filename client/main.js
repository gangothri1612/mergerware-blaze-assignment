import './main.html';
import './main.css';
import Sortable from 'sortablejs';

const tasks = [];

Meteor.startup(() => {

  const form = document.getElementById('taskForm');
  const taskList = document.getElementById('taskList');

  form.addEventListener('submit', (e) => {

    e.preventDefault();

    const text = document.getElementById('taskInput').value;

    const category =
      document.getElementById('category').value;

    tasks.push({
      text,
      category
    });

    renderTasks();

    form.reset();

  });

  function renderTasks() {

    taskList.innerHTML = '';

    tasks.forEach((task, index) => {

      const li = document.createElement('li');

      li.innerHTML = `

        <div class="task-left">

          <span class="task-text">
            ${task.text}
          </span>

          <span class="badge ${task.category.toLowerCase()}">
            ${task.category}
          </span>

        </div>

        <button
          class="delete-btn"
          onclick="deleteTask(${index})">
          🗑
        </button>

      `;

      taskList.appendChild(li);

    });

  }

  window.deleteTask = function(index){

    tasks.splice(index,1);

    renderTasks();

  };

  Sortable.create(taskList,{
    animation:150
  });

});