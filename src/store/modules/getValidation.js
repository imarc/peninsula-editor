/**
 * @function getValidation
 * @param Object commit event object for Vuex commit
 */

// Dependencies
import axios from 'axios';

export default function getValidation({ commit }) {
    axios.get('/api/v1/csrf').then(response => {
        commit('setToken', response.data);
    });
}
