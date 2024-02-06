<template>
    <div class="container">
        <h1>회원 정보 수정</h1>
        <div class="row">    
            <table class="table">
                <tr>
                    <th class="text-right table-primary">No.</th>
                    <td>{{userInfo.user_no}}</td>
                </tr>
                <tr>
                    <th class="text-right table-primary">ID</th>
                    <td>{{userInfo.user_id}}</td>
                </tr>
                <tr>
                    <th class="text-right table-primary">비밀번호</th>
                    <input class="form-control" type="password" v-model="userInfo.user_pwd">
                </tr>
                <tr>
                    <th class="text-right table-primary">이름</th>
                    <input class="form-control" type="text" v-model="userInfo.user_name">
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
                    <input class="form-control" type="number" v-model="userInfo.user_age" min="0" max="150">
                </tr>
                <tr>
                    <th class="text-right table-primary">가입날짜</th>
                    <input class="form-control" type="date" v-model="userInfo.join_date">
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
            userInfo : {}
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
        updateInfo() {
            if(!this.validation()) return;

            let data = this.getSendData();

            axios
            .put('/api/users', data)
            .then(result => {
                console.log(result);
                let user_no = result.data.insertId;
                if(user_no == 0) {
                    alert(`등록되지 않았습니다\n 메세지를 확인해주세요\n${result.data.message}`);
                }else {
                    alert(`정상적으로 등록되었습니다.`);
                    this.userInfo.user_no = user_no;
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
            let delData = ["user_no"];
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