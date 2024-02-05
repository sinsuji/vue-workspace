<!-- UserListView.vue -->
<template>
    <div class="container">
        <h1>전체 회원 조회</h1>
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
        created() {
            this.getUserList() // 비동기작업, 랜더링 하기전에 가지고 있어야 하는 데이터, 최초 데이터를 가지고 오는 시점
            this.getDataList()
        },
        methods : {
            async getUserList() { // 반드시 순서대로 진행해줘야 함
                // 동기작업
                // axios는 비동기임 그래서 await을 사용하여 동기작업을 해줌, await는 내부 코드가 동기식으로 진행이 된다는 것
                let result = await axios.get('http://localhost:3000/users') 
                                        .catch(err => console.log(err)); // catch -> 오류가 나지 않으면 실행이 안되고 
                let list = result.data;
                this.userList = list;
            }
        }
    }
</script>