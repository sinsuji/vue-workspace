<template>
  <div>
    <button v-on:click="increaseCounter">Add 1</button>
    <p>Counter is : {{counter}}</p>
    <button v-on:click="increaseCounter2(3)">Increase</button>
    <button v-on:click="one(), two()">다중호출</button>

    <!-- v-on:change -> @:change로 사용 가능 -->
    <select v-model="city" @:change="changeSelect">
      <option value="1">서울</option>
      <option value="2">부산</option>
      <option value="3">제주</option>
    </select>
  </div>
</template>

<script>
export default {
  // 예전ver
  // data: {
  //   counter: 0
  // }
  data() {
    return {
      counter: 5,
      city: '1'
    }
  },
  // 이벤트 핸들러
  methods: {
    increaseCounter() {
      console.log('increaseCounter');
      this.counter = this.counter + parseInt(this.city);
    },
    increaseCounter2(num) {
      this.counter = this.counter + num;
    },
    one() {
      alert('one')
    },
    two() {
      alert('two')
    },
    changeSelect() {
      alert(this.city);
    }
  },
  beforeUpdate() {
    // 변경이전에 필요처리를 구현
    console.log('beforeUpdate');
  },
  updated() {
    // 변경이후에 필요처리를 구현
    console.log('updated');
  }
}
</script>
