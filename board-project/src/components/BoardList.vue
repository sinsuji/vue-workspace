<template>
  <div>
    <table id="list">
      <thead>
        <tr>
          <th>글번호</th>
          <th>글제목</th>
          <th>조회수</th>
          <th>삭제</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="board in list" v-bind:key="board.no">
          <td>{{board.no}}</td>
          <td @click="showRead(board)">{{board.title}}</td>
          <td>{{board.view}}</td>
          <td><button @click="deleteBoard(board.no)">삭제</button></td>
        </tr>
      </tbody>
    </table>
    <button style="float:right;" @click="showWrite">글쓰기</button>
  </div>
</template>

<script>
export default {
  props: ['list'], // props -> 부모컴포넌트의 전달값을 받는 속성
  data() {
    return {

    }
  },
  methods: {
    showWrite() {
      // 부모컴포넌트 데이터를 변경(부모에게 이벤트 요청)
      console.log(this);
      this.$emit('show-write') // 부모컴포넌트의 이벤트를 실행하기위한 호출 
      // 아래의 방식으로도 가능하지만 중복코드를 방지하기 위해 위의 방식처럼 처리하길
      // this.$parent.listView = false; 
      // this.$parent.wirteView = true;
    },
    showRead(board) {
      // 상세화면 보여주기
      this.$emit('show-read', board);
    },
    deleteBoard(no) { // 파라미터 전달
      this.$emit('board-delete', no);
    }
  }
}
</script>