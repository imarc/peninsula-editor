import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'

const store = Vuex.createStore({
  state,
  actions,
  mutations
})

export default store
