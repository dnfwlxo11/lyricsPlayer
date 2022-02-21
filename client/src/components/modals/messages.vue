<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header d-block">
            <div class="row">
              <div class="col-8 col-form-label">
                <i class="mdi mdi-email-multiple-outline"></i> 메세지함
              </div>
              <div class="col-4 text-right">
                <a href="javascript:;" class="btn text-dark" @click="$emit('on-close')">
                  <i class="mdi mdi-close"></i>
                </a>
              </div>
            </div>
          </div>
          <div class="modal-body p-5 text-center text-secondary" v-if="!messageList">
            <i class="mdi mdi-loading mdi-spin"></i> 로딩중...
          </div>
          <div class="modal-body p-5 text-center text-secondary" v-else-if="messageList.length == 0">
            등록된 메세지가 없습니다.
          </div>
          <div class="modal-body" v-else style="height: 500px; overflow: auto;">
            <div class="card message-item mb-2" v-for="(item, index) of messageList" :key="index">
              <div class="card-body p-2">
                <div class="row mb-1">
                  <div class="col-8 col-form-label">
                    <!-- 발신자가 사용자일 경우 -->
                    <span v-if="item.tb_from_user_pid==userProfile.pid" class="badge badge-success mr-1">
                      보냄
                    </span>
                    <!-- 수신자가 사용자일 경우 -->
                    <span v-else class="badge badge-danger mr-1">
                      받음
                    </span>
                    <span class="mr-1">
                      <span v-if="item.from_user==userProfile.name&&item.to_user">{{ item.to_user }}</span>
                      <span v-else-if="item.from_user==userProfile.name&&!item.to_user">전체</span>
                      <span v-else>{{ item.from_user }}</span>
                      &nbsp;<small class="text-secondary">
                        <vue-timeago :datetime="new Date(item.date * 1000)"/>                        
                      </small>
                    </span>
                    <span class="badge badge-warning mr-1">순번: {{ item.tb_origin_rows_pid }}</span>
                    <span v-if="item.is_new" class="badge badge-danger">N</span>
                  </div>
                  <div class="col-4 text-right">
                    <button v-if="item.tb_from_user_pid==userProfile.pid" type="button" class="btn"
                      @click="onClickRemoveMessage(index)">
                      <i class="mdi mdi-close"></i>
                    </button>
                  </div>
                </div>
                <div>
                  <div class="row mb-1">
                    <button type="button" class="btn btn-sm" v-if="item.from_user_pid == userProfile.pid">
                      <i class="mdi mdi-close"></i>
                    </button>
                  </div>
                </div>
                <div>
                  <a href="javascript:;" class="d-block" @click="onClickGotoPage(`/origin/${item.tb_origin_rows_pid}/${userProfile.role.toLowerCase()}`)">
                    <div class="d-flex w-100" style="overflow-wrap: anywhere;">
                      <i class="mdi mdi-chevron-right"></i> {{ item.content }}
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 ml-auto mr-auto">
                <button class="btn btn-block btn-success" @click="pageNo++;loadMessages()">
                  <i class="mdi mdi-plus"></i> 더보기
                </button>              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'MessagesModal',
    data() {
      return {
        messageList: null,
        pageNo: 1,    
        pageSize: 10        
      }
    },
    created() {
      this.loadMessages()
    },
    mounted() {
      this.loadMessages()
    },
    methods: {
      async loadMessages() {
        let reqParams = {
          page_no: this.pageNo,
          page_size: this.pageSize,
          mode: 'msgBox'
        }

        let response = await this.$Api.get(`/api/messages`, { params: reqParams })        
        const messages = response.items.reduce((acc, item)=>{
          item.is_new = this.$Utils.dateDiff(new Date(), new Date(item.date * 1000)) == 0
          acc.push(item)
          return acc
        }, [])        
        if (!this.messageList) {          
          this.messageList = messages
        } else {
          if(messages.length == 0){
            this.$toasted.show('마지막 메세지 입니다.')
            return
          }
          this.messageList = this.messageList.concat(messages)          
        }
      },

      escCloseListener(evt) {
        if (evt.key != 'Escape') return false
        this.$emit('on-close')
      },
      onClickGotoPage(pagePath) {
        if (this.$route.path != pagePath) {
          this.$router.push(pagePath)
        }
        this.$emit('on-close')
      },            
      async onClickRemoveMessage(index) {
        let response = await this.$Api.delete(`/api/messages/${this.messageList[index].msg_pid}`)
        this.$delete(this.messageList, index)
      },
    },
    mounted() {
      window.addEventListener('keydown', this.escCloseListener)
      document.documentElement.style.overflowY = 'hidden'
    },
    destroyed() {
      window.removeEventListener('keydown', this.escCloseListener, false)
      document.documentElement.style.overflowY = 'auto'
    },
    computed: {
      userProfile() {
        return this.$store.getters.getUserProfile
      },
    },
  }
</script>


<style lang="scss" scoped>
  .modal-container {
    max-width: 600px;
    font-weight: 400;

    .message-item {
      font-size: .8rem;
    }
  }
</style>