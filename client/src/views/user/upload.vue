<template>
    <div class="upload">
        <top></top>
        <div class="container pt-5 pb-5">
            <div class="w-75 m-auto">
                <div class="mb-3" @click="onSongClick" type="fileUpload" @dragenter="onDragenter" 
                    @dragover="onDragover" @dragleave="onDragleave" @drop="onDrop">
                    <div class="card" style="height: 400px;">
                        <div v-if="!song" class="m-auto">
                            <div>
                                <i class="mdi mdi-plus" style="font-size: 65px;"></i>
                            </div>
                            <div>
                                노래 업로드
                            </div>
                        </div>
                        <div v-else class="h-100 justify-content-center d-flex align-items-center" style="background-repeat: no-repeat;background-size: contain;background-position: center" :style="{ 'background-image': `url(${thumbnail})` }">
                            <div class="">
                                <strong style="font-size: 30px;">{{ thumbnail ? '' : song.name }}</strong>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="song">
                    <div v-if="song" class="text-left">
                        <button v-if="song"  class="btn mr-3" @click="removeSong">노래 지우기</button>
                        <button v-if="!thumbnail" class="btn mr-3" @click="onThumbClick">노래 썸네일 업로드</button>
                        <button v-else class="btn" @click="removeThumb">썸네일 지우기</button>
                    </div>
                </div>
                <hr>
                <div class="text-left form-group mb-5">
                    <div class="mb-3">
                        <div class="mb-2">Title</div>
                        <input type="text" class="form-control" v-model="metadata.title" placeholder="노래 제목을 입력해주세요.">
                    </div>
                    <div class="mb-3">
                        <div class="mb-2">Artist</div>
                        <input type="text" class="form-control" v-model="metadata.artist" placeholder="노래를 부른 가수를 입력해주세요.">
                    </div>
                    <div class="mb-3">
                        <div class="mb-2">Album</div>
                        <input type="text" class="form-control" v-model="metadata.album" placeholder="노래가 수록된 앨범명을 입력해주세요 (앨범이 없다면 제목과 똑같이 채워주세요)">
                    </div>
                    <div class="mb-3">
                        <div class="mb-2">Genre</div>
                        <input type="text" class="form-control" v-model="metadata.genre" placeholder="노래 장르를 입력해주세요.">
                    </div>
                    <div>
                        <div class="mb-2">Lyrics</div>
                        <textarea class="form-control" style="min-height: 100px;" v-model="metadata.lyrics" placeholder="노래 가사를 입력해주세요."></textarea>
                    </div>
                </div>
                <input type="file" ref="coverInput" style="display: none;" @change="onThumbChange" accept="image/*">
                <input type="file" ref="fileInput" style="display: none;" @change="onSongChange" accept="audio/*, video/*">
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <button class="btn-reverse w-75" @click="$router.push('/')">취소</button>
                    </div>
                    <div class="col-md-6">
                        <button class="btn w-75" @click="submitSong">등록</button>
                    </div>
                </div>
            </div>
        </div>
        <progress-modal v-if="isProgress" :msg="'파일을 업로드 중입니다.\n잠시만 기다려주세요.'"></progress-modal>
    </div>    
</template>

<script>
import top from '@/components/Nav.vue'

export default {
    name: 'Upload',
    components: {
        top,
    },
    data() {
        return {
            tmpAudio: null,
            isProgress: false,
            isDragged: false,
            song: null,
            thumbnail: null,
            metadata: {
                title: null,
                duration: null,
                genre: null,
                artist: null,
                album: null,
                lyrics: null,
            }
        }
    },
    beforeDestoy() {
        if (this.tmpAudio) this.tmpAudio.removeEventListener('loadedmetadata');
        this.tmpAudio = null;
    },
    methods: {
        onSongClick() {
            this.$refs.fileInput.click();
        },

        onThumbClick() {
            this.$refs.coverInput.click();
        },

        onDragenter() {
            this.isDragged = true;
        },

        onDragleave() {
            this.isDragged = false;
        },

        onDragover(e) {
            e.preventDefault();
        },

        onDrop(e) {
            e.preventDefault();
            this.isDragged = false;
            const files = e.dataTransfer.files;
            this.song = files;

        },

        loadAudioMetadata() {
            return new Promise((resolve, reject) => {
                let audioBlob = window.URL.createObjectURL(this.song);
                this.tmpAudio = new Audio();

                this.tmpAudio.addEventListener("loadedmetadata", () => {
                    resolve(this.tmpAudio.duration);
                })

                this.tmpAudio.src = audioBlob;
            })
        },

        async onSongChange(e) {
            console.log('노래 변경')

            this.thumbnail = null;
            const file = e.target.files;

            if (file.length) {
                this.song = file[0];
                this.metadata.title = this.song.name.split('.')[0];

                this.metadata.duration = Math.floor(await this.loadAudioMetadata());

                e.target.value = '';
            }
        },        

        async onThumbChange(e) {
            const file = e.target.files;

            this.thumbnail = await this.readFile(file[0]);
            e.target.value = '';
        },

        removeThumb() {
            this.thumbnail = null;
        },

        removeSong() {
            this.song = null;
            this.thumbnail = null;
            this.metadata.title = null;
            this.tmpAudio = null;
        },

        async readFile(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();

                reader.onload = async (e) => {
                    resolve(e.target.result);
                }

                reader.readAsDataURL(file);
            })
        },

        async submitSong() {
            this.isProgress = true;

            if (!this.song || !this.metadata.title || !this.metadata.artist || !this.metadata.album) {
                this.isProgress = false;
                return false;
            }

            let formData = new FormData();
            formData.append('song', this.song);
            formData.append('metadata', JSON.stringify(this.metadata));
            formData.append('thumbnail', this.thumbnail);

            let res = await this.$Api.post('/api/music/upload', formData);

            if (res.data.success) {
                this.isProgress = false;
                window.alert('등록 신청이 완료되었습니다.\n노래의 음질, 길이 등에 따라 서버에 등록되는 시간이 다를 수 있습니다.');
                this.$router.push('/');
            } else {
                this.isProgress = false;
                window.alert('등록 신청이 실패했습니다.\n다시 시도하거나 새로고침 후 작업을 진행해주세요.');
            }
        },
    }
}
</script>

<style lang="scss">

</style>