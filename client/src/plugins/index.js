import AlertModal from '@/components/modals/alert'
import ConfirmModal from '@/components/modals/confirm'
import ProgressModal from '@/components/modals/progress'

export default {
    install(Vue) {
        // global components
        Vue.component('alert-modal', AlertModal)
        Vue.component('confirm-modal', ConfirmModal)
        Vue.component('progress-modal', ProgressModal)
    }
}