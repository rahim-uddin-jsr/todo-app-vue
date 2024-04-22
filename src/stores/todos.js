/* eslint-disable no-unused-vars */
import { defineStore } from 'pinia'
import axios from 'axios'

export const useTodosStore = defineStore('todos', {
  state: () => ({
    todos: [],
    todoForm: {
      title: null,
      userId: 1,
      completed: false
    },
    isEdit: null,
    editId: 0
  }),
  getters: {},
  actions: {
    async getTodos() {
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos')
      this.todos = data
    },
    async createTodo() {
      const { data } = await axios.post('https://jsonplaceholder.typicode.com/todos', this.todoForm)
      console.log(data)
      this.todos.push(data)
      this.todos.sort((a, b) => b - a)
      this.todoForm.title = ''
    },
    async deleteTodo(id) {
      const { data } = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      console.log(data)
      const remainingTodos = this.todos.filter((todo) => todo.id !== id)
      this.todos = remainingTodos
    },
    async editTodo(id) {
      const { data } = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`)
      this.isEdit = true
      this.todoForm.title = data.title
      this.editId = id
      //   const remainingTodos = this.todos.filter((todo) => todo.id !== id)
      //   this.todos = remainingTodos
    },
    async updateTodo() {
      const { data } = await axios.put(
        `https://jsonplaceholder.typicode.com/todos/${this.editId}`,
        this.todoForm
      )
      this.isEdit = false

      const selected = this.todos.find((todo) => todo.id == this.editId)
      selected.title = this.todoForm.title
      //   const remainingTodos = this.todos.filter((todo) => todo.id !== id)
      //   this.todos = remainingTodos
      this.todoForm = ''
    },
    async compleatTodo(id) {
      const data1 = { 'completed': true }
      const { data } = await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, data1)

      const selected = this.todos.find((todo) => todo.id == id)
      selected.completed = true
      //   const remainingTodos = this.todos.filter((todo) => todo.id !== id)
      //   this.todos = remainingTodos
    },
    async undoCompleatTodo(id) {
      const data1 = { 'completed': false }
      const { data } = await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, data1)

      const selected = this.todos.find((todo) => todo.id == id)
      selected.completed = false
      //   const remainingTodos = this.todos.filter((todo) => todo.id !== id)
      //   this.todos = remainingTodos
    }
  }
})
