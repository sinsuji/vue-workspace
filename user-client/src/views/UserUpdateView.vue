<template>
    <div class="container">
        <h1>회원 정보 수정</h1>
        <div class="row">    
            <table class="table">
                <tr>
                    <th class="text-right table-primary">No.</th>
                    <td class="text-center">
                        <input class="form-control" type="number" v-model="userInfo.user_no" readonly>
                    </td>
                </tr>
                <tr>
                    <th class="text-right table-primary">ID</th>
                    <td>
                        <input class="form-control" type="text" v-model="userInfo.user_id" readonly>
                    </td>
                </tr>
                <tr>
                    <th class="text-right table-primary">비밀번호</th>
                    <td class="text-center">
                        <input class="form-control" type="password" v-model="userInfo.user_pwd">
                    </td>
                </tr>
                <tr>
                    <th class="text-right table-primary">이름</th>
                    <td class="text-center">
                        <input class="form-control" type="text" v-model="userInfo.user_name">
                    </td>
                </tr>
                <tr>
                    <th class="text-right table-primary">성별</th>
                    <td class="text-center">
                        <input type="radio" value="M" v-model="userInfo.user_gender"> 남
                        <input type="radio" value="F" v-model="userInfo.user_gender"> 여
                    </td>
                </tr>
                <tr>
                    <th class="text-right table-primary">나이</th>
                    <td class="text-center">
                        <input class="form-control" type="number" v-model="userInfo.user_age" min="0" max="150">
                    </td>
                </tr>
                <tr>
                    <th class="text-right table-primary">가입날짜</th>
                    <td class="text-center">
                        <input class="form-control" type="date" v-model="userInfo.join_date">
                    </td>
                </tr>
            </table>
        </div>
        <div class="row">
            <button class="btn btn-info" @click="updateInfo()">저장</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            userInfo : {
                user_no : null,
                user_id : "",
                user_pwd : "",
                user_name : "",
                user_gender : "",
                user_age : null,
                join_date : null
            }
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

            let newDate = this.dateFormat(info.join_date);
            info.join_date = newDate;

            this.userInfo = info;
        },
        dateFormat(value){
            let result = null;
            if(value != null) {
                let date = new Date(value);
                let year = date.getFullYear();
                let month = ('0' + (date.getMonth() + 1)).slice(-2);
                let day = ('0' + date.getDate()).slice(-2);
                result = `${year}-${month}-${day}`;
            }
            return result;
        },
        updateInfo() {
            // 1) 유효성 체크 -> DB에 not null 제약조건 때문에, 필수값이 입려된 상태라 공백이 들어가지 않음
            if(!this.validation()) return;
            
            // 2) ajax
            // 2-1) 실제 보낼 데이터 선별
            let data = this.getSendData();

            // 2-2) axios를 이용해 ajax
            axios
            .put(`/api/users/${this.userInfo.user_id}`, data) // 누구걸 수정할건지 반드시 경로에 붙여야함
            .then(result => {
                // 3) 결과처리
                let count = result.changedRows; // changedRows -> 수정에만 쓰임
                if(count == 0) {
                    alert(`수정되지 않았습니다\n 메세지를 확인해주세요\n${result.data.message}`);
                }else {
                    alert(`정상적으로 수정되었습니다.`);
                    this.$router.push({ path : '/userInfo', query : { "userId" : this.userInfo.user_id }}); // push를 해서 component를 불러오는걸 재확인
                }
            })
            .catch(err => console.log(err));
        },
        validation() {
            if(this.userInfo.user_pwd == ""){
                alert('비밀번호가 입력되지 않았습니다.');
                return false;
            }

            if(this.userInfo.user_name == ""){
                alert('이름이 입력되지 않았습니다.');
                return false;
            }

            return true;
        },
        getSendData() {
            let obj = this.userInfo;
            let delData = ["user_no", "user_id"]; // update되면 안되는 대상(body에 들어가면 안됨)
            let newObj = {};
            let isTargeted = null;    
            for( let field in obj){ 
                isTargeted = false;
                for(let target of delData){
                    if(field == target) {
                        isTargeted = true;
                        break;
                    }            
                }
                if(!isTargeted){
                    newObj[field] = obj[field];
                }
            }

            let sendData = {
                "param" : newObj
            }
            return sendData;
        }
    }
}
</script>