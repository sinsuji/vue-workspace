<template>
  <ul id="myUL">
    <li v-for="todo in list" v-bind:key="todo.no" @click="checked(todo.no)">{{todo.no}} {{todo.todo}}<span class="close" @click="deleteTodo(todo.no)">x</span></li>
  </ul>
</template>

<script>
export default {
  props: ['list'],
  data() {
    return {

    }
  },
  methods: {
    checked(no) {
      this.$emit('check-list', no)
    },
    deleteTodo(no) {
      this.$emit('delete-todo', no)
    }
  }
}
</script>