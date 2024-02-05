<template>
  <div>
    <input type="text" v-model="todo">
    <button @click="addTodo">추가</button>
  </div>
  <div>
    <ul>
      <li v-for="todo in todoList" 
          v-bind:key="todo.no">{{`${todo.no} -  ${todo.text}`}}
          <button v-on:click="deleteTodo(todo.no)">삭제</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todo: '그담할일', // {no: 3, text: '그담할일'},
      todoList: [{no: 1, text: '할일1'}, {no: 2, text: '할일2'}]
    }
  },
  methods: {
    addTodo() {
      let no, text;
      // no = this.todoList.length + 1; 
      no = this.todoList[this.todoList.length - 1].no + 1; // 마지막 idx
      text = this.todo;
      this.todoList.splice(no - 1, 0, {no, text}); // splice(idx, 1, 데이터) // (idx, 0, 데이터) -> 추가, (idx, 1, 데이터) -> 수정, (idx, 1) -> 삭제
      this.todo = '';
    },
    deleteTodo(no) {
      console.log('no:', no);
      this.todoList = this.todoList.filter(todo => todo.no == no ? false : true); // filter : true만 새로운 값에 담아줌 
    }
  }
}
</script>
