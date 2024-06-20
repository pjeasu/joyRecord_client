<template>
    <div>
        <i class="bi bi-list h1 float-start" v-if="!hiddenElement" @click="toggleSidebar"
            style="font-size:3em; line-height:3em; padding-left:1em"></i>
        <!-- joy record logo  -->
        <svg :style="logoStyle" width="300" height="120" viewBox="0 0 602 220" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="301" cy="110" rx="293" ry="102" fill="#FFFCF2" stroke="#217844" stroke-width="15" />
            <path
                d="M213 102V94H205V86H221V94H245V46H261V94H253V102H213ZM277 102V94H269V54H277V46H317V54H325V94H317V102H277ZM285 94H309V54H285V94ZM357 102V78H349V70H341V46H357V70H373V46H389V70H381V78H373V102H357Z"
                fill="black" />
            <path
                d="M109 166V110H157V118H165V142H149V150H157V158H165V166H141V158H133V150H125V166H109ZM125 142H141V134H149V118H125V142ZM173 166V110H229V118H189V134H221V142H189V158H229V166H173ZM253 166V158H245V150H237V126H245V118H253V110H285V118H293V126H277V118H261V126H253V150H261V158H277V150H293V158H285V166H253ZM309 166V158H301V118H309V110H349V118H357V158H349V166H309ZM317 158H341V118H317V158ZM365 166V110H413V118H421V142H405V150H413V158H421V166H397V158H389V150H381V166H365ZM381 142H397V134H405V118H381V142ZM429 166V110H469V118H477V126H485V150H477V158H469V166H429ZM445 158H461V150H469V126H461V118H445V158Z"
                fill="black" />
        </svg>
        <!-- /joy record logo  -->
        <i class="bi bi-person-circle h1 float-end" v-if="!hiddenElement"
            style="font-size:3em; line-height:3em; padding-right:1em"></i>
        <Sidebar v-if="isSidebarOpen" @close-sidebar="toggleSidebar" />
    </div>
</template>

<script>
import Sidebar from './sidebar.vue'; // Sidebar 컴포넌트를 임포트합니다.

export default {
    name: 'mainHeader',
    components: {
        Sidebar
    },
    data() {
        return {
            isSidebarOpen: false
        };
    },
    computed: {
        hiddenElement() {
            // 특정 라우트에서 요소를 숨기기 위한 조건을 정의합니다.
            const hiddenRoutes = ['loginPage', 'signUp'];
            return hiddenRoutes.includes(this.$route.name); // 로그인, 회원가입 페이지에서는 헤더 아이콘 숨김
        },
        logoStyle() {
            // 특정 라우트에 따라 로고의 margin-top을 조정
            switch (this.$route.name) {
                case 'loginPage':
                    return { marginTop: '5em' };
                default:
                    return { marginTop: '1em' };
            }
        }
    },
    methods: {
        toggleSidebar() {
            this.isSidebarOpen = !this.isSidebarOpen;
        }
    }
}
</script>

<style scoped>
.logo {
    /* 추가 스타일링 */
}
</style>