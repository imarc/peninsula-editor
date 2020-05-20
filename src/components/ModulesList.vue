<template>
    <div class="cms-modules">
        <a href="#" class="cms-return" @click="navigateUp">
            Return to
            <span v-text="parentContextName"></span>
        </a>
        <h2 class="title">
            <span v-text="contextName"></span>
            Modules
        </h2>
        <ul v-if="contextModules">
            <li
                v-for="module in contextModules"
                :key="module.id"
                :data-value="module.id"
                @dblclick="setContext(module, $event)"
            >
                <div
                    class="cms-module"
                    @mouseover="highlightModule(module, $event)"
                    @mouseleave="dehighlightModule(module, $event)"
                >
                    <div class="cms-moduleinfo js-dragHandle">
                        <h3 class="title" v-text="module.node.dataset.moduleName"></h3>
                        <p>
                            [
                            <span
                                v-text="applyStartCase(module.node.dataset.module)"
                            ></span>
                            ]
                        </p>
                    </div>
                    <div class="actions">
                        <a
                            v-if="hasNestedModules(module)"
                            href="#"
                            class="context"
                            @click="setContext(module, $event)"
                        >
                            Context
                        </a>
                        <a
                            href="#"
                            class="settings"
                            @click="openModuleSettings(module, $event)"
                        >
                            Settings
                        </a>
                        <a href="#" class="remove" @click="removeModule(module, $event)">
                            Remove
                        </a>
                    </div>
                </div>
            </li>
        </ul>
        <a href="#" class="cms-action" @click="openModuleSelect">+ Add a Module</a>
    </div>
</template>

<script>
import '../../polyfills/append';
import { mapState } from 'vuex';
import { Sortable } from '@shopify/draggable';
import { startCase } from 'lodash';
import store from '../store/index';

export default {
    data() {
        return {
            moduleOrder: [],
            isDragging: false,
        };
    },
    computed: {
        ...mapState(['context', 'modules']),
        contextModules() {
            return this.context.nestedModules.map(contextModule => {
                let correspondingModuleData = {};

                this.modules.forEach(module => {
                    if (module.node === contextModule) {
                        correspondingModuleData = module;
                    }
                });

                return correspondingModuleData;
            });
        },
        parentContextName() {
            return this.context.parentContext
                ? this.context.parentContext.dataset.moduleName
                : 'List';
        },
        contextName() {
            return this.context.node.dataset.moduleName;
        },
    },
    mounted() {
        this.initializeDraggable();
    },
    methods: {
        navigateUp(event) {
            event.preventDefault();

            if (this.context.parentContext) {
                const [parentModule] = this.modules.filter(
                    module => module.node === this.context.parentContext
                );
                store.dispatch('setContext', parentModule);

                return true;
            }

            store.dispatch('setIsModuleMode', false);

            return true;
        },
        hasNestedModules(module) {
            return module.nestedModules.length > 0;
        },
        highlightModule(module) {
            if (!this.isDragging) {
                module.node.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
            }
            module.node.classList.add('-highlight');
        },
        dehighlightModule(module) {
            module.node.classList.remove('-highlight');
        },
        openModuleSelect(event) {
            event.preventDefault();
            store.dispatch('setIsSelectingModule', true);
        },
        applyStartCase(string) {
            return startCase(string);
        },
        removeModule(module, event) {
            event.preventDefault();
            store.dispatch('removeModule', module);
        },
        openModuleSettings(module, event) {
            event.preventDefault();
            store.dispatch('openModuleSettings', module);
        },
        setContext(module, event) {
            if (this.hasNestedModules(module)) {
                event.preventDefault();
                store.dispatch('setContext', module);
                module.node.classList.remove('-highlight');
            }
        },
        initializeDraggable() {
            const draggableContainer = this.$el.querySelector('ul');

            const sortable = new Sortable(draggableContainer, {
                draggable: 'li',
                handle: '.js-dragHandle',
            });

            sortable.on('sortable:stop', () => {
                const moduleElements = sortable.getDraggableElementsForContainer(
                    draggableContainer
                );

                this.moduleOrder = moduleElements.map(
                    moduleElement => moduleElement.dataset.value
                );

                store.dispatch('updateModuleOrder', this.moduleOrder);
            });

            sortable.on('sortable:sort', () => {
                this.isDragging = true;
            });

            sortable.on('sortable:stop', () => {
                this.isDragging = false;
            });
        },
    },
};
</script>
