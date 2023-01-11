import axios from 'axios'

export const state = () => ({
  makeupData: '',
  productInfo: '',
  cartItems: [],
  itemsNumber: 0,
  productCategories: [],
})

export const mutations = {
  getResults(state, payload) {
    payload.forEach((item) => (item.itemsNum = 0))
    state.makeupData = payload
  },
  getProductInfo(state, payload) {
    state.productInfo = payload
    console.log('data', payload)
  },
  calcNumberMutation(state) {
    state.itemsNumber = 0
    state.cartItems.forEach((item) => {
      console.log(item)
      state.itemsNumber += item.itemsNum
      console.log(state.itemsNum)
    })
  },
  getCategoriesProduct(state, products) {
    products.forEach((item) => (item.itemsNum = 0))
    state.productCategories = products
  },
  addItem(state, payload) {
    let check = false
    let itemIndex = ''
    for (let i = 0; i < state.cartItems.length; i++) {
      if (state.cartItems[i].id == payload.id) {
        check = true
        itemIndex = i
        break
      }
    }
    if (check) {
      state.cartItems[itemIndex].itemsNum += 1
    } else {
      state.cartItems.push(payload)
    }
    console.log(state.cartItems)
    localStorage.setItem('cart-items', JSON.stringify(state.cartItems))
  },
  deleteItem(state, index) {
    if (state.cartItems[index].itemsNum > 1) {
      state.cartItems[index].itemsNum--
    } else {
      state.cartItems.splice(index, 1)
    }
    localStorage.setItem('cart-items', JSON.stringify(state.cartItems))
    console.log(state.cartItems)
  },
  checkLocalStorage(state, payload) {
    state.cartItems = payload
  },
}

export const actions = {
  doAddItem(context, item) {
    context.commit('addItem', item)
  },
  doDeleteItem(context, index) {
    context.commit('deleteItem', index)
  },
  doCheckLocalStorage(context, payload) {
    context.commit('checkLocalStorage', payload)
  },
  calcNumber(context) {
    context.commit('calcNumberMutation')
  },
  async getAllMakepus(context) {
    await axios
      .get('http://makeup-api.herokuapp.com/api/v1/products.json')
      .then((res) => context.commit('getResults', res.data.slice(0, 9)))
      .catch((err) => console.log(err))
  },
  async getProductDetails(context, payload) {
    await axios
      .get(
        `http://makeup-api.herokuapp.com/api/v1/products.json?brand=${payload.brand}&product_type=${payload.type}`
      )
      .then((res) => context.commit('getProductInfo', res.data))
      .catch((err) => console.log(err))
  },
  //Get Category Products
  async getCatProducts(context, productType) {
    await fetch(
      `http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${productType}`
    )
      .then((res) => res.json())
      .then((data) => {
        context.commit('getCategoriesProduct', data.slice(0, 20))
      })
  },
}
