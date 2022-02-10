import AlertModal from '@/components/modals/alert'
import ConfirmModal from '@/components/modals/confirm'
import ProgressModal from '@/components/modals/progress'
import Utils from './utils'

export default {
    install(Vue) {
        // global components
        Vue.component('alert-modal', AlertModal)
        Vue.component('confirm-modal', ConfirmModal)
        Vue.component('progress-modal', ProgressModal)

        Vue.prototype.$Utils = Utils
    }
}