<!-- UserListView.vue -->
<template>
    <div class="container">
        <h1>전체 회원 조회</h1>
        <table class="table">
            <caption>Total : {{ count }}</caption>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>ID</th>
                    <th>이름</th>
                    <th>성별</th>
                    <th>나이</th>
                    <th>가입날짜</th>
                </tr>
            </thead>
            <tbody>
                <!-- for와 if를 함께 사용해야 할 경우 for는 template 태그를 사용하면 됨, template 태그는 html 표준태그임, template 태그는 화면에 출력되지 않음, 보여지지 않을뿐 출력은 됨 -->
                <tr v-bind:key="idx" v-for="(list, idx) in userList"
                    v-on:click="goToUserInfo(list.user_id)" >
                    <td>{{ list.user_no }}</td>
                    <td>{{ list.user_id }}</td>
                    <td>{{ list.user_name }}</td>
                    <td v-text="list.user_gender" />
                    <td>{{ list.user_age }}</td>
                    <td>{{ list.join_date }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            userList : []
        }
    },
    computed : { // 값, data에 정의되어 있는 값을 이용해서 새로운 값을 생성하는 것, 없는 값을 만들어내는 것, 선언된 값이 어딘가에는 쓰임, watch와 비슷함(둘다 감시한다는건 동일)
        count() {
            return this.userList.length;
        }
    },
    watch: { // 값이 아니라 프로세스임, 감시자, 기존에 존재하는 애들을 감시함, watch는 값이 아니기 때문에 return이 없음
        // userList(newQuestion, oldQuestion) {
        //     console.log('이전 : ', oldQuestion);
        //     alert('데이터가 변경되었습니다.');
        //     console.log('이후 : ', newQuestion);
        // }
    },
    created() {
        this.getUserList() // 비동기작업, 랜더링 하기전에 가지고 있어야 하는 데이터, 최초 데이터를 가지고 오는 시점
    },
    methods : {
        async getUserList() { // 반드시 순서대로 진행해줘야 함
            // 동기작업
            // axios는 비동기임 그래서 await을 사용하여 동기작업을 해줌, await는 내부 코드가 동기식으로 진행이 된다는 것
            let result = await axios.get("/api/users") 
                                    .catch(err => console.log(err)); // catch -> 오류가 나지 않으면 실행이 안되고 
            let list = result.data;
            this.userList = list;
        },
        goToUserInfo(userId) {
            this.$router.push({ path : '/userInfo', query : { "userId" : userId } }); // 등록된 라우터한테 요청함, 라우터는 get방식(body가 없음), query는 컴퍼넌트에서 사용함
            // this.$router.push({ name : 'userInfo', query : { "userId" : userId } }); 
            // path든 name이든 둘 중에 하나를 router에게 보내주면 됨(등록만 되어 있으면 됨) 
        }
    }
}
</script>