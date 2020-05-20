/**
 * @function resetListContext
 * @param Object commit event object for Vuex commit
 */

export default function resetListContext({ commit }) {
    /**
     * NOTE: Yes this is hacky, if I figure out a way to remount
     * the list component in a better way that doesn't require
     * statechange I'll update it.
     */
    const tempContextRef = this.state.context;

    commit('setIsModuleMode', false);
    commit('setContext', tempContextRef);
    setTimeout(() => {
        commit('setIsModuleMode', true);
    }, 0);
}
