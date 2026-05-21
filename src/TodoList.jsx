import TodoItem from './TodoItem';

function TodoList({ tasks, onDelete, onEdit }) {
  return (
    <ul className="todo-list">
      {tasks.map(task => (
        <TodoItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

export default TodoList;
