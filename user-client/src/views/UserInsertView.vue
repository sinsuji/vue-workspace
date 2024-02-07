<!-- UserInsertView.vue -->
<template>
    <div class="container">
        <h1>회원 정보 등록</h1>
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
                    <td class="text-center">
                        <input class="form-control" type="text" v-model="userInfo.user_id">
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
                        <!-- <input type="checkbox" true-value="예" false-value="아니오" v-model="chkVal"> -->
                    </td>
                </tr>
                <tr>
                    <th class="text-right table-primary">나이</th>
                    <td class="text-center">
                        <input class="form-control" type="number" v-model="userInfo.user_age" min="0" max="150">
                    </td>
                </tr>
                <tr>
                    <th class="text-right table-primary">가입일자</th>
                    <td class="text-center">
                        <input class="form-control" type="date" v-model="userInfo.join_date"> <!-- yyyy-MM-dd -->
                    </td>
                </tr>
            </table>
        </div>
        <div class="row">
            <button class="btn btn-info" @click="insertInfo()">저장</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            // chkVal: "아니오",
            userInfo : { // 서버와 통신을 하기 위해서 서버측이 요구하는(서버측에서 받는) 형태의 이름으로 지정함 
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
    created(){ // 기본 세팅을 할 때도 created 훅을 사용함
        this.userInfo.join_date = this.getToday();
    },
    methods : {
        getToday() {
            let date = new Date();
            let year = date.getFullYear();
            let month = ('0' + (date.getMonth() + 1)).slice(-2);
            let day = ('0' + date.getDate()).slice(-2);
            return `${year}-${month}-${day}`;
        },
        insertInfo() {
            // 1) 유효성 체크
            if(!this.validation()) return; // 논리부정연산자 -> 원래값을 반대로 부정

            // 2) ajax
            // 2-1) 실제 보낼 데이터 선별
            let data = this.getSendData();

            // 2-2) axios를 이용해서 ajax 실행 // 비동기로 진행
            // /api/users
            axios
            .post('/api/users', data) // data는 반드시 배열 아니면 객체여야 함 -> axios는 default가 JSON으로 되어있음
            .then(result => {
                // 3) 결과처리
                console.log(result);
                let user_no = result.data.insertId; // insertId는 AUTO_INCREMENT가 사용됐다는 가정하에 쓰임
                if(user_no == 0) {
                    alert(`등록되지 않았습니다\n 메세지를 확인해주세요\n${result.data.message}`);
                }else {
                    alert(`정상적으로 등록되었습니다.`);
                    this.userInfo.user_no = user_no;
                    this.$router.push({ path : '/'});
                }
            })
            .catch(err => console.log(err));
        },
        validation() {
            if(this.userInfo.user_id == ""){
                alert('아이디가 입력되지 않았습니다.');
                return false;
            }    

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