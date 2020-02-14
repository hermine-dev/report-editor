import axiosApi from '../../axiosApi'

// initial state
const state = {
  list: []
}

// getters
const getters = {

}

// actions
const actions = {
  list ({ commit, state }, payload) {
    return axiosApi.get('/v2/reports', {
      params: payload
    })
      .then(response => {
        const _savedReports = localStorage.getItem('savedReports')
        const savedReports = _savedReports ? JSON.parse(_savedReports) : []
        const reportList = [...savedReports, ...response.data].map(item => {
          const { report, sections } = item
          let sectionInfo = sections.filter(section => section.type === 'info')
          if (sectionInfo && sectionInfo.length > 0) {
            sectionInfo = sectionInfo[0]
          }

          const data = {}
          data.reportName = report.name ? report.name : 'no content'
          data.reportStatus = report.status ? report.status : 'no content'
          data.reportType = report.type ? report.type : 'no content'

          if (sectionInfo && sectionInfo.data) {
            data.sectionName = sectionInfo.data.name ? sectionInfo.data.name : 'no content'
            data.sectionArea = sectionInfo.data.area ? sectionInfo.data.area : 'no content'
            data.sectionPhone = sectionInfo.data.phone ? sectionInfo.data.phone : 'no content'
          } else {
            data.sectionName = 'no content'
            data.sectionArea = 'no content'
            data.sectionPhone = 'no content'
          }
          return data
        })
        commit('setReports', reportList)
        return response.data
      })
      .catch(e => {
        return e.response
      })
  },
  create ({ commit, state }, payload) {
    const { type } = payload
    let apiEndpoint = ''
    if (type === 'sales') {
      apiEndpoint = '/reports/sales'
    } else if (type === 'rental') {
      apiEndpoint = '/reports/rental'
    }

    if (apiEndpoint !== '') {
      return axiosApi.post(apiEndpoint, {
        data: payload
      })
        .then(response => {
          return response.data
        })
        .catch(e => {
          return e.response
        })
    }
    return Promise.reject(new Error('Invalid report type'))
  }
}

// mutations
const mutations = {
  setReports (state, reports) {
    state.list = reports
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
