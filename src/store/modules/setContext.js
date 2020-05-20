/**
 * @function setContext
 * @param Object commit event object for Vuex commit
 * @param Object Object of Module Representation
 */

export default function setContext({ commit }, module) {
    commit('setContext', module);
    commit('setIsModuleMode', true);
}
