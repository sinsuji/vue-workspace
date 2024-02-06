<!-- UserInfoView.vue -->
<template>
    <div class="container">
        <h1>회원 정보 조회</h1>
        <div class="row">    
            <table class="table">
                <tr>
                    <th class="text-right table-primary">No.</th>
                    <td class="text-center">{{ userInfo.user_no }}</td>
                </tr>
                <tr>
                    <th class="text-right table-primary">ID</th>
                    <td class="text-center">{{ userInfo.user_id }}</td>
                </tr>
                <tr>
                    <th class="text-right table-primary">비밀번호</th>
                    <td class="text-center">{{ userInfo.user_pwd }}</td>
                </tr>
                <tr>
                    <th class="text-right table-primary">이름</th>
                    <td class="text-center">{{ userInfo.user_name }}</td>
                </tr>
                <tr>
                    <th class="text-right table-primary">성별</th>
                    <td class="text-center">{{ userGender }}</td>
                </tr>
                <tr>
                    <th class="text-right table-primary">나이</th>
                    <td class="text-center">{{ userInfo.user_age }}</td>
                </tr>
                <tr>
                    <th class="text-right table-primary">가입날짜</th>
                    <td class="text-center">{{ joinDate }}</td>
                </tr>
            </table>
        </div>
        <div class="row">
            <button class="btn btn-info col-4" @click="goToUpdate(userInfo.user_id)">수정</button> <!-- router를 동작시킴(새로운 페이지가 필요하기 때문) -->
            <router-link to="/" class="btn btn-success col-4">목록</router-link> <!-- 값 넘길 필요가 없어서 router-link를 사용 -->
            <button class="btn btn-warning col-4" @click="deleteInfo(userInfo.user_id)">삭제</button> <!-- axios를 동작시킴(새로운 페이지가 필요없어서) -->
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            userInfo : {}
        }
    },
    computed : {
        // 성별
        userGender() {
            let gender = null; 
            if(this.userInfo.user_gender == 'F'){
                gender = '여';
            } else if(this.userInfo.user_gender == 'M') {
                gender = '남';
            }
            return gender;
        },
        // userGender(){ // 이렇게도 가능하다는걸 보여주는 정도로 생각하면 됨, 정확하게 이해를 못한다면 쓰지않길
        //     let map = {
        //         "M" : "남",
        //         "F" : "여"
        //     };

        //     return map[this.userInfo.user_gender];
        // },

        // 가입날짜 : 년 월 일
        joinDate() {
            let result = null;
            if(this.userInfo.join_date != null){
                let date = new Date(this.userInfo.join_date);
                let year = date.getFullYear();
                let month = ('0' + (date.getMonth() + 1)).slice(-2);
                let day = ('0' + date.getDate()).slice(-2);             
                
                result = `${year}년${month}월${day}일`;
            }
            return result;
        }
        
    },
    created() { // 쿼리 정보를 받아옴 (query : { "userId" : userId })
        let searchNo = this.$route.query.userId; // 받는건 route, router 아님 주의
        this.getUserInfo(searchNo);
    },
    methods: {
        async getUserInfo(userId) {
            // http://localhost:3000/users/admin
            // api/users/admin -> "/api/users/" + userId 또는 `/api/users/${userId}`
            let result = await axios.get(`/api/users/${userId}`) 
                                    .catch(err => console.log(err)); // catch -> 오류가 나지 않으면 실행이 안되고 
            let info = result.data;
            this.userInfo = info;
        },
        goToUpdate(userId){
            this.$router.push({ path : '/userUpdate', query : { "userId" : userId } });
        },
        deleteInfo(userId){
            // 서버에 해당 데이터를 삭제
            console.log(userId);
        }
    }
}   
</script>