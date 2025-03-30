// Variables globales
let totalTareas = 0;
let tareasCompletadas = 0;

// Acceso al campo de entrada
const input = document.querySelector('#todo-input');

// Acceso a los contadores en el DOM
const totalElement = document.querySelector('#total');
const completadosElement = document.querySelector('#completados');

// Función para actualizar los contadores
function actualizarContadores() {
  totalElement.textContent = `Total: ${totalTareas}`;
  completadosElement.textContent = `Completadas: ${tareasCompletadas}`;
}

// Escuchando al evento click del botón "Añadir"
document.querySelector('#submit').addEventListener('click', () => {
  // Obtener el valor del campo de entrada
  const inputData = input.value;
  input.value = "";

  // Crear el elemento de la tarea
  const todo_el = document.createElement('div');
  todo_el.classList.add('todo-item');

  const todo_content_el = document.createElement('div');
  todo_el.appendChild(todo_content_el);

  const todo_input_el = document.createElement('input');
  todo_input_el.classList.add('text');
  todo_input_el.type = 'text';
  todo_input_el.value = inputData;
  todo_input_el.setAttribute('readonly', 'readonly');

  todo_content_el.appendChild(todo_input_el);

  const todo_actions_el = document.createElement('div');
  todo_actions_el.classList.add('action-items');

  const todo_done_el = document.createElement('i');
  todo_done_el.classList.add('fa-solid', 'fa-check');

  const todo_edit_el = document.createElement('i');
  todo_edit_el.classList.add('fa-solid', 'fa-pen-to-square', 'edit');

  const todo_delete_el = document.createElement('i');
  todo_delete_el.classList.add('fa-solid', 'fa-trash');

  todo_actions_el.appendChild(todo_done_el);
  todo_actions_el.appendChild(todo_edit_el);
  todo_actions_el.appendChild(todo_delete_el);

  todo_el.appendChild(todo_actions_el);

  // Añadir la tarea a la lista de tareas
  document.querySelector('.todo-lists').appendChild(todo_el);

  // Aumentar el contador de tareas totales
  totalTareas++;
  actualizarContadores();

  // Funcionalidad de marcar como completada
  todo_done_el.addEventListener('click', () => {
    if (!todo_input_el.classList.contains('done')) {
      todo_input_el.classList.add('done'); // Marcar la tarea como completada
      tareasCompletadas++; // Aumentar el contador de tareas completadas
    } else {
      todo_input_el.classList.remove('done'); // Desmarcar la tarea
      tareasCompletadas--; // Disminuir el contador de tareas completadas
    }
    actualizarContadores();
  });

  // Funcionalidad de editar la tarea
  todo_edit_el.addEventListener('click', () => {
    if (todo_edit_el.classList.contains("edit")) {
      todo_edit_el.classList.remove("edit");
      todo_edit_el.classList.remove("fa-pen-to-square");
      todo_edit_el.classList.add("fa-x");
      todo_edit_el.classList.add("save");
      todo_input_el.removeAttribute("readonly");
      todo_input_el.focus();
    } else {
      todo_edit_el.classList.remove("save");
      todo_edit_el.classList.remove("fa-x");
      todo_edit_el.classList.add("fa-pen-to-square");
      todo_edit_el.classList.add("edit");
      todo_input_el.setAttribute("readonly", "readonly");
    }
  });

  // Funcionalidad de eliminar la tarea
  todo_delete_el.addEventListener('click', () => {
    document.querySelector('.todo-lists').removeChild(todo_el);
    totalTareas--; // Decrementar el contador de tareas totales
    if (todo_input_el.classList.contains('done')) {
      tareasCompletadas--; // Decrementar el contador de tareas completadas si se eliminó una tarea completada
    }
    actualizarContadores(); // Actualizar los contadores
  });
});
