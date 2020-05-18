import * as types from './mutation-types'

const mutations = {
	[types.INCREMENT_COUNT](state,payload){
		payload.count ++
	},
	[types.ADD_TO_CART](state,payload){
		payload.count = 1;
		state.cartList.push(payload);
	}
}
export default mutations
