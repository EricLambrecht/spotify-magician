import actions from './actions'
import getters from './getters'
import mutations from './mutations'

// initial state
const state = {
  displayOptions: {
    showTimeOfDay: false,
    showTempo: false,
    timeOfDayStartHour: 18,
    timeOfDayStartMinute: 0,
  },
  playlist: null,
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
