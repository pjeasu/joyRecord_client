<template>
    <div class="sidebar">
        <div class="sidebar-content float-end" sidebar-class="border-right border-danger">
            <button @click="$emit('close-sidebar')">X</button>
            <!-- 사이드바의 콘텐츠를 여기에 추가 -->

            <nav class="mb-3">
                <b-nav vertical>
                    <b-nav-item @click="toPage">info</b-nav-item>
                    <b-nav-item href="#link-2" @click="hide">Another Link</b-nav-item>
                </b-nav>
            </nav>

        </div>
    </div>
</template>

<script>
export default {
    name: 'mainSidebar',
    methods: {
        toPage() {

            this.$router.push({
                name: 'joyRecordInfo'
            });
            this.$emit('close-sidebar');

        }
    }
}

</script>

<style scoped>
.sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 250px;
    height: 100%;
    background: #B4D7C2;
    color: white;
    padding: 1em;
    z-index: 1000;
    transition: transform 0.3s ease;
}
</style>