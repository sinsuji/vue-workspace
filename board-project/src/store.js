// store.js
import { createStore } from 'vuex'; // 저장소를 생성할 때 사용하는 함수
import createPersistedState from 'vuex-persistedstate';

export default createStore ({
    state() {  // 함수형태, 저장소, data 옵션이랑 같다, data 옵션처럼 crud는 가능하지만 직접적인 조작은 안함
        return {
            cart : [
                {
                    product_id : 1,
                    product_name : '아이폰 거치대',
                    category : 'A'
                }
            ],
            count : 0
        }
    },
    getters: { // 객체형태, computed와 비슷, this를 사용하지 않음
        cartCount : (state) => {
            return state.cart.length;
        }
    },
    mutations: { // 실질적인 데이터 조작(state가 가지고 있는 값을 조작), 단일건 처리
        increment(state) {
            state.count++;
        },
        addProduct(state, info) {
            state.cart.push(info);

        }
    },
    actions: { // mutations에 선언되어진 기능을 한꺼번에 사용, 저장소 정보 전체를 불러옴
        addProduct(context, info) {
            context.commit('addProduct', info); // 매개변수 값이 mutations와 다르게 context
            setTimeout(() => { // 비동기 작업을 진행해야 할 때 사용
                context.commit('increment');
            }, 1000);
        }
    },
    plugins: [ createPersistedState() ]
})
