import { defineStore } from 'pinia'
import axios from 'axios'

export const useTodosStore = defineStore('todos', {
  state: () => ({
    todos: []
  }),
  getters: {},
  actions: {
    async getTodos() {
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos')
      this.todos = data
    }
  }
})
