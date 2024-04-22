<script setup>
import { useTodosStore } from '@/stores/todos';
import { onMounted } from 'vue'
const todoStore = useTodosStore();
onMounted(() => {
  todoStore.getTodos();
})
</script>

<template>
  <main>
    <div class="container">
      <h1 class="text-center mb-4">Todo App</h1>
      <!-- Todo Form -->
      <div class="mb-4">
        <div class="input-group">
          <input type="text" v-model="todoStore.todoForm.title" class="form-control" placeholder="Add a new todo">
          <button class="btn btn-primary" v-if="todoStore.isEdit" @click="todoStore.updateTodo()"><i
              class="fa-regular fa-pen-to-square"></i></button>
          <button class="btn btn-primary" @click="todoStore.createTodo()" v-else>Add Todo</button>
        </div>
      </div>
      <!-- Todo List -->
      <div class="todo-list">
        <div v-for="todo in todoStore.todos" :key="todo.id" :class="{ 'border-primary': todo.completed }"
          class="todo-list-item">
          <span class="text-capitalize">{{ todo.title }}</span>
          <div>
            <button v-if="todo.completed" @click="todoStore.undoCompleatTodo(todo.id)"
              class="btn btn-sm btn-dark"><small>Undo</small></button>
            <button v-if="!todo.completed" @click="todoStore.compleatTodo(todo.id)"
              class="btn btn-sm btn-success"><small>complete</small></button>

            <button class="btn btn-sm btn-light ms-2" @click="todoStore.editTodo(todo.id)"><i
                class="fa-regular fa-pen-to-square"></i></button>
            <button class="btn btn-sm btn-danger ms-2" @click="todoStore.deleteTodo(todo.id)"><i
                class="fa-solid fa-trash"></i></button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped>
body {
  padding-top: 50px;
}

.todo-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.completed {
  text-decoration: line-through;
  color: #888;
}
</style>