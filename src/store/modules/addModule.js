/**
 * @function addModule
 * @param Object Commit event object for Vuex commit
 * @param Object Data object related to module addition
 */

// Dependencies
import { startCase } from 'lodash';
// eslint-disable-next-line import/no-cycle
import editorOptions from './_editors';
import attributeHandlers from './_attributeHandlers';

export default function addModule({ commit }, moduleData) {
    /**
     * Parses template as html and creates reference to module node
     */
    const domparser = new DOMParser();

    const moduleDocument = domparser.parseFromString(
        moduleData.module.template,
        'text/html'
    );
    const [node] = moduleDocument.body.children;

    /**
     * Set module attributes
     */
    node.dataset.moduleName =
        moduleData.attributes.name || startCase(moduleData.module.key);
    node.dataset.module = moduleData.module.key;

    /**
     * Look for additional attributes besides name and apply them
     */
    const errors = [];

    Object.keys(moduleData.module.attributes).forEach(key => {
        const moduleConfig = moduleData.module.attributes[key];

        const handler =
            typeof moduleConfig.handler !== 'undefined'
                ? moduleConfig.handler
                : 'default';

        try {
            /**
             * Check if unique handler has been defined.
             */
            attributeHandlers[handler](
                node,
                moduleData.module,
                moduleData.attributes[key],
                key
            );
        } catch (error) {
            this.dispatch('throwError', error);
            errors.push(error);
        }
    });

    /**
     * If any errors are thrown on attribute validation, stop module population.
     */
    if (errors.length > 0) {
        return false;
    }

    /**
     * Clear any error if valid.
     */

    this.dispatch('throwError', null);

    /**
     * Update state with new module(s)
     */
    commit('addModuleToContext', node);
    this.dispatch('moduleCollect', node);

    /**
     * If valid, flag that editing has occured.
     */
    commit('setIsEditing', true);

    /**
     * Applies editors if data-editor attributes exist
     */
    if (node.dataset.editor) {
        editorOptions[node.dataset.editor](node, commit);
    } else {
        const newModuleEditors = [...node.querySelectorAll('[data-editor]')];

        newModuleEditors.forEach(editor => {
            const editorType = editor.dataset.editor;

            editorOptions[editorType](editor, commit);
        });
    }

    /**
     * Populates node to current container,
     * closes prompt.
     */
    this.state.context.node.append(node);
    commit('setIsSelectingModule', false);

    return true;
}
