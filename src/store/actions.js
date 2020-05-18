import * as types from './mutation-types'

const actions = {
	addCart(context, payload) {
		return new Promise((resolve) => {
			let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
			if (oldProduct) {
				oldProduct.count += 1;
				context.commit(types.INCREMENT_COUNT, oldProduct);
				resolve('商品添加成功')
			} else {
				// payload.count = 1;
				// context.cartList.push(payload);
				payload.checked = true;
				context.commit(types.ADD_TO_CART, payload)
			}
		})
	}
}

export default actions