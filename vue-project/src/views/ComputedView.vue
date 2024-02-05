<template>
  <div>
    <h1>{{`${lastName} / ${firstName}`}}</h1>
    <h1>{{`${fullName}`}}</h1>
  </div>
  <input type="text" v-model="firstName">
</template>

<script>    
export default {
  data() { 
    return {
      firstName: 'kildong',
      lastName: 'Hong'  
    }
  },
  computed: { // 복합데이터처리 - 데이터가 바뀌면 화면을 refresh 해줌
    fullName() {
      return `${this.lastName} / ${this.firstName}`
    } 
  },
  watch: { // 데이터 변경이전, 이후의 값
    firstName(curr, bef) {
      console.log(curr, bef);
    }
  }
}
</script>
