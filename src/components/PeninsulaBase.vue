<template>
    <div>
        <div class="cms-inline-file js-fileUploadUi">
            <input type="file" class="js-fileUpload">
            <button class="confirm-upload js-confirmUpload">Confirm</button>
            <button class="cancel-upload js-cancelUpload">Cancel</button>
        </div>
        <div class="js-adminBar">
            <section class="cms-admin">
                <section class="cms-frontend-admin js-toolbar" :class="{ '-open': adminBarIsOpen, '-mac': isMacOS
            }" >
                <section class="cms-toolbar">
                    <section class="cms-toobar-column">
                        <header class="cms-profile">
                            <div v-if="avatar" class="cms-avatar">
                                <img :src="avatar" alt="">
                            </div>
                            <div>
                                <p  v-if="userName" class="cms-name">
                                    {{ userName }}
                                </p>
                                <a v-if="homeUrl" :href="homeUrl" class="cms-home">
                                    Home
                                </a>
                                <a v-if="adminUrl" :href="adminUrl" class="cms-admin-home">
                                    Dashboard
                                </a>
                                <a v-if="logoutUrl" :href="logoutUrl" class="cms-logout">
                                    Log Out
                                </a>
                            </div>
                        </header>
                        <main>
                            <section>
                                <div class="cms-content">
                                    <div class="cms-alert -success" v-if="editingIsAvailible">
                                        <h2 class="title">Content Editing is Available</h2>
                                        <p class="description">
                                            Click on any content block to update its content
                                        </p>
                                    </div>
                                    <div class="cms-alert -error" v-else>
                                        <h2 class="title">Content Editing is Unavailable</h2>
                                    </div>
                                    <frontend-nav v-if="!isModuleMode"></frontend-nav>
                                    <modules-list v-if="isModuleMode"></modules-list>
                                </div>
                            </section>
                            <a href="" class="cms-action js-edit -close" @click="closeAdminBar" data-toggle="toolbar">Close Admin Panel</a>
                        </main>
                    </section>
                </section>
            </section>

                <a href="#" class="cms-edit js-edit" @click="openAdminBar">Edit Content</a>
                <a v-if="backendUrl" :href="backendUrl" class="cms-settings">Edit Details</a>

                <a :href="adminUrl" class="cms-controlpanel">Dashboard</a>

                <transition name="slide-down">
                    <editing-content v-if="isEditing"></editing-content>
                </transition>
                <transition name="fade-in">
                    <module-prompt v-if="isSelectingModule"></module-prompt>
                </transition>
                <transition name="fade-in">
                    <module-settings v-if="isUpdatingModule"></module-settings>
                </transition>
                <transition name="fade-in">
                    <image-prompt v-if="photoSelection.isSelecting"></image-prompt>
                </transition>
                <transition name="slide-up">
                    <error v-if="error"></error>
                </transition>
            </section>
            <module-highlight v-if="highlightedNode"></module-highlight>
            <transition name="fade-in">
                <editor-highlight v-if="adminBarIsOpen && !isEditing"></editor-highlight>
            </transition>
        </div>
    </div>
</template>

<script>
import store from '../store'
import adminBarData from '../-adminBarData'
import adminBarMethods from '../-adminBarMethods'
import adminBarComputed from '../-adminBarComputed'
import FrontendNav from './FrontendNav.vue'
import EditingContent from './EditingContent.vue'
import ModulesList from './ModulesList.vue'
import ModulePrompt from './ModulePrompt.vue'
import ModuleSettings from './ModuleSettings.vue'
import ModuleHighlight from './ModuleHighlight.vue'
import EditorHighlight from './EditorHighlight.vue'
import ImagePrompt from './ImagePrompt.vue'
import Error from './Error.vue'

export default {
  props: {
    initialConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    FrontendNav,
    EditingContent,
    ModulesList,
    ModulePrompt,
    ModuleSettings,
    ModuleHighlight,
    EditorHighlight,
    ImagePrompt,
    Error
  },
  data: adminBarData,
  computed: adminBarComputed,
  mounted () {
    store.dispatch('setBackendUrl', this.initialConfig.backendUrl)
    store.dispatch('setCanEdit', this.initialConfig.canEdit)
    store.dispatch('setAdminUrl', this.initialConfig.adminUrl)
    store.dispatch('setAvatar', this.initialConfig.avatar)
    store.dispatch('setUserName', this.initialConfig.userName)
    store.dispatch('setHomeUrl', this.initialConfig.homeUrl)
    store.dispatch('setLogoutUrl', this.initialConfig.logoutUrl)
    store.dispatch('getValidation')
    store.dispatch('getModules')
    store.dispatch('initialDataConstruct')
    store.dispatch('setLatestSavedData', this.collections)
    store.dispatch('editorApply')
    store.dispatch('moduleCollect')
    store.dispatch('setVueInstance', this)
    this.isMacOS = navigator.platform.toUpperCase().indexOf('MAC') >= 0

    if (window.location.hash.indexOf('#edit') !== -1) {
      store.dispatch('setAdminBarIsOpen', true)
    }
  },
  methods: adminBarMethods,
  store
}
</script>
