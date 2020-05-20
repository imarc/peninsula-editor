<template>
    <section class="cms-prompt">
        <div class="cms-prompt-info">
            <h2 class="title">
                Update Settings for this Module
            </h2>
            <section class="cms-attribute-fields">
                <div class="text">
                    <label for="name">Enter a unique name for this module</label>
                    <input id="name" v-model="moduleAttributeData.name" type="text" />
                </div>
                <span
                    v-for="(value, key) in availibleModules[currentModuleType].attributes"
                    :key="key"
                >
                    <div
                        v-if="isArray(value.options) && moduleAttributeData[key]"
                        class="select"
                    >
                        <label for="cardReference">Pick a custom style</label>
                        <span>
                            <select
                                :id="moduleAttributeData[key]"
                                v-model="moduleAttributeData[key]"
                                name="cardReference"
                            >
                                <option
                                    v-for="option in value.options"
                                    :key="option.class"
                                    :value="option.class"
                                    v-text="option.label"
                                ></option>
                            </select>
                        </span>
                    </div>
                    <div v-else-if="moduleAttributeData[key]" class="text">
                        <label :for="key" v-text="value.label"></label>
                        <p
                            v-if="moduleAttributeData[key].note"
                            class="note -info"
                            v-text="moduleAttributeData[key].note"
                        ></p>
                        <input :id="key" v-model="moduleAttributeData[key]" type="text" />
                    </div>
                </span>
            </section>
            <button class="link" @click="updateModuleAttributes">
                Update Module
            </button>
            <a href="#" class="cms-prompt-cancel" @click="closeSettings">
                Cancel
            </a>
        </div>
    </section>
</template>

<script>
import { mapState } from 'vuex';
import { startCase, isArray } from 'lodash';
import attributeGetters from '../store/modules/_attributeGetters';
import attributeHandlers from '../store/modules/_attributeHandlers';

import store from '../store/index';

export default {
    data() {
        return {
            moduleAttributeData: {
                name: null,
            },
            customClass: null,
            initialClass: null,
            classNode: null,
        };
    },
    computed: {
        ...mapState(['currentModule', 'availibleModules']),
        currentModuleType() {
            return this.currentModule.node.dataset.module;
        },
    },
    mounted() {
        this.moduleAttributeData.name = this.currentModule.node.dataset.moduleName;

        const moduleAttributes = this.availibleModules[this.currentModuleType].attributes;

        Object.keys(moduleAttributes).forEach(key => {
            const handler =
                typeof moduleAttributes[key].handler !== 'undefined'
                    ? moduleAttributes[key].handler
                    : 'default';
            try {
                this.moduleAttributeData[key] = attributeGetters[handler](
                    this.currentModule.node,
                    moduleAttributes[key],
                    key
                );
            } catch (error) {
                store.dispatch('throwError', `${error}`);
            }
        });
    },
    methods: {
        applyStartCase(string) {
            return startCase(string);
        },
        updateModuleAttributes() {
            this.currentModule.node.dataset.moduleName = this.moduleAttributeData.name;

            const moduleAttributes = this.availibleModules[this.currentModuleType]
                .attributes;
            const errors = [];

            /**
             * Look for additional attributes besides name and apply them
             */
            Object.keys(moduleAttributes).forEach(key => {
                const moduleConfig = moduleAttributes[key];

                const handler =
                    typeof moduleConfig.handler !== 'undefined'
                        ? moduleConfig.handler
                        : 'default';

                try {
                    /**
                     * Check if unique handler has been defined.
                     */
                    attributeHandlers[handler](
                        this.currentModule.node,
                        this.availibleModules[this.currentModuleType],
                        this.moduleAttributeData[key],
                        key
                    );
                } catch (error) {
                    store.dispatch('throwError', error);
                    errors.push(error);
                }
            });

            if (errors.length > 0) {
                return false;
            }

            store.dispatch('setIsEditing', true);
            store.dispatch('closeModuleSettings');
            store.dispatch('resetListContext');

            return true;
        },
        closeSettings(event) {
            event.preventDefault();
            store.dispatch('closeModuleSettings');
        },
        isArray(value) {
            return isArray(value);
        },
    },
};
</script>
