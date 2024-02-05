<template>
    <div>
        <form>
            <label>
                제품ID:
                <input type="text" v-model="productInfo.product_id">
            </label>
            <br>
            <label>
                제품명:
                <input type="text" v-model="productInfo.product_name">
            </label>
            <br>
            <label>
                카테고리:
                <input type="radio" value="A" v-model="productInfo.category"> A
                <input type="radio" value="B" v-model="productInfo.category"> B
            </label>
            <br>
            <button type="button" @click="addCart">추가</button>
        </form>
    <table>
        <thead>
            <caption>total : {{ total }}</caption>
            <tr>
                <th>카테고리</th>
                <th>제품ID</th>
                <th>제품명</th>
            </tr>
        </thead>
        <tbody>
            <tr :key="idx" v-for="(info, idx) in productList">
                <td>{{ info.category }}</td>
                <td>{{ info.product_id }}</td>
                <td>{{ info.product_name }}</td>
            </tr>
        </tbody>
    </table>
    </div>    
</template>

<script>
    export default {
        data() {
            return {
                productInfo: {
                    product_id : "",
                    product_name : "",
                    category: "A"
                }
            }
        },
        computed: { // readonly, data 옵션을 기준으로 연산된 결과를 가지고 있음
            productList() {
                return this.$store.state.cart; // cart 정보 전체가 필요할 때
            },
            total() {
                return this.$store.getters.cartCount; // 특정한 대상에 정의되어있는 정보가 필요할 때
            }
        },
        methods: {
            addCart() { // 기능
                let obj = {
                    product_id: this.productInfo.product_id,
                    product_name: this.productInfo.product_name,
                    category:this.productInfo.category
                }
                // this.$store.commit('addProduct', obj); // commit을 사용했다면, mutations을 사용하겠다는 것임, 첫번째영역은 함수영역, addProduct는 commit에 의존해서 들어감
                // obj 대신 this.productInfo 사용하면 안되는 이유는 참조타입이므로 값을 보내고자할 때 새로운 대상을 만들고 그 대상을 기반으로 값을 복사한 다음에 넘겨주어야 함
                // this.$store.commit('increment');
                this.$store.dispatch('addProduct', obj); // actions를 사용하려면 dispatch
            }
        }
    }
</script>

<style scoped>
    table, th, td{
        border:1px solid #000;
    }
</style>