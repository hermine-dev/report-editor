import axiosApi from '../../axiosApi'

// initial state
const state = {
  userData: {},
  token: null
}

// getters
const getters = {
  /* Partially Implemented not for production use */
  loggedIn: state => !!state.token
}

// actions
const actions = {
  signIn ({ commit, state }, payload) {
    return axiosApi.post('/login', {
      data: payload
    })
      .then(response => {
        if (response.data.token) {
          commit('setUserData', response.data)
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('userData', JSON.stringify(response.data))
        }
        return response.data
      })
      .catch(e => {
        return e.response
      })
  },
  userInfo ({ commit }) {
    const token = localStorage.getItem('token')
    if (!token) {
      return
    }
    // todo actually need get user data from api
    const userData = localStorage.getItem('userData')
    let _userData = null
    if (userData) {
      _userData = JSON.parse(userData)
      commit('setUserData', JSON.parse(userData))
    }
    return _userData
  },
  signOut ({ commit }) {
    commit('setUserData', {})
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
    return true
  }
}

// mutations
const mutations = {
  setUserData (state, user) {
    state.userData = user
    state.token = user.token
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
