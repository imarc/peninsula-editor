// Polyfills
import '../../modules/closest';

/**
 * @function initialDataConstruct
 * @param Object commit event object for Vuex commit
 * @param Object instance DOM element for a particular instance of content
 */
export default function initialDataConstruct() {
    // Creates array of availible fields in content instance.
    this.state.fields = [...document.querySelectorAll('[data-field]')];

    /**
     * Loops through each field and commits it's data structure
     * to the state by moving up through its parents, and identifying
     * its closest key and collection names.
     */
    this.state.fields.forEach(field => {
        /**
         * Checks if current field has a key or
         * collection already assigned to it.
         * Otherwise, find next parent that has it assigned.
         */
        const collectionName =
            typeof field.dataset.collection !== 'undefined'
                ? field.dataset.collection
                : field.closest('[data-collection]').dataset.collection;
        const keyName =
            typeof field.dataset.key !== 'undefined'
                ? field.dataset.key
                : field.closest('[data-key]').dataset.key;

        const fieldName = field.dataset.field;

        // Throw error if field doesn't have both a key and collection identifier
        if (typeof collectionName === 'undefined' || typeof keyName === 'undefined') {
            throw new Error(
                `Field ${fieldName} does not have an associated key or collection name, double check your markup for missing attributes.`
            );
        }

        // Create records in state if key value pairs don't yet exist
        this.state.collections[collectionName] =
            this.state.collections[collectionName] || {};

        this.state.collections[collectionName][keyName] =
            this.state.collections[collectionName][keyName] || {};

        this.state.collections[collectionName][keyName][fieldName] = field.innerHTML;
    });
}
