/**
 * @function getModules
 * @param Object commit event object for Vuex commit
 */

// Dependencies
import axios from 'axios';

export default function getModules({ commit }) {
    axios.get('/api/v1/cms/modules/').then(response => {
        commit('setModules', response.data);
    });
}
