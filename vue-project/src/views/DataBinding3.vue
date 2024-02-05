<template>
  <label>선택: <input type="checkbox" true-value="yes" false-value="no" v-model="checked"></label>
  <p>선택값: {{checked}}</p>

  <!-- v-model => value -->
  <label>text속성: <input type="text" v-bind:value="ival"></label> <!-- input타입의 v-model => value라는 속성에 바인딩됨, v-bind => 바인딩하겠다는 지시자 -->
  <p>값: {{ival}}</p>

  <!-- v-bind: attribute의 값을 바인딩 할 때 쓰여짐 -->
  <img v-bind:src="imgSrc" :width="imgWidth">
  <input type="text" v-model="textStr">
  <button v-bind:disabled="textStr == ''">Click</button>
</template>

<script>
export default {
  data() {
    return {
      checked: 'yes',
      ival: 'sample',
      checkVal: true,
      imgSrc: 'https://kr.vuejs.org/images/logo.png',
      imgWidth: '100px',
      isTrue: true,
      textStr: ''
    }
  }
}
</script>

<!-- v-bind는 생략가능, : 만 있으면 됨 -->