<template>
    <div>

        <!-- joy record logo  -->
        <svg @click="logoClick" :style="logoStyle" style=" cursor: pointer;" width="300" height="120"
            viewBox="0 0 602 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="301" cy="110" rx="293" ry="102" fill="#FFFCF2" stroke="#217844" stroke-width="15" />
            <path
                d="M213 102V94H205V86H221V94H245V46H261V94H253V102H213ZM277 102V94H269V54H277V46H317V54H325V94H317V102H277ZM285 94H309V54H285V94ZM357 102V78H349V70H341V46H357V70H373V46H389V70H381V78H373V102H357Z"
                fill="black" />
            <path
                d="M109 166V110H157V118H165V142H149V150H157V158H165V166H141V158H133V150H125V166H109ZM125 142H141V134H149V118H125V142ZM173 166V110H229V118H189V134H221V142H189V158H229V166H173ZM253 166V158H245V150H237V126H245V118H253V110H285V118H293V126H277V118H261V126H253V150H261V158H277V150H293V158H285V166H253ZM309 166V158H301V118H309V110H349V118H357V158H349V166H309ZM317 158H341V118H317V158ZM365 166V110H413V118H421V142H405V150H413V158H421V166H397V158H389V150H381V166H365ZM381 142H397V134H405V118H381V142ZM429 166V110H469V118H477V126H485V150H477V158H469V166H429ZM445 158H461V150H469V126H461V118H445V158Z"
                fill="black" />
        </svg>

        <!--         <svg :style="logoStyle" width="221" height="81" viewBox="0 0 221 81" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="110.5" cy="40.5397" rx="107.5" ry="37.5397" fill="#FFFCF2" stroke="#217844" stroke-width="5" />
            <path
                d="M62.4437 57V43H74.4437V45H76.4437V51H72.4437V53H74.4437V55H76.4437V57H70.4437V55H68.4437V53H66.4437V57H62.4437ZM66.4437 51H70.4437V49H72.4437V45H66.4437V51ZM78.4437 57V43H92.4437V45H82.4437V49H90.4437V51H82.4437V55H92.4437V57H78.4437ZM98.4437 57V55H96.4437V53H94.4437V47H96.4437V45H98.4437V43H106.444V45H108.444V47H104.444V45H100.444V47H98.4437V53H100.444V55H104.444V53H108.444V55H106.444V57H98.4437ZM112.444 57V55H110.444V45H112.444V43H122.444V45H124.444V55H122.444V57H112.444ZM114.444 55H120.444V45H114.444V55ZM126.444 57V43H138.444V45H140.444V51H136.444V53H138.444V55H140.444V57H134.444V55H132.444V53H130.444V57H126.444ZM130.444 51H134.444V49H136.444V45H130.444V51ZM142.444 57V43H152.444V45H154.444V47H156.444V53H154.444V55H152.444V57H142.444ZM146.444 55H150.444V53H152.444V47H150.444V45H146.444V55Z"
                fill="black" />
            <path
                d="M88.2218 37V35H86.2218V33H90.2218V35H96.2218V23H100.222V35H98.2218V37H88.2218ZM104.222 37V35H102.222V25H104.222V23H114.222V25H116.222V35H114.222V37H104.222ZM106.222 35H112.222V25H106.222V35ZM124.222 37V31H122.222V29H120.222V23H124.222V29H128.222V23H132.222V29H130.222V31H128.222V37H124.222Z"
                fill="black" />
        </svg>
 -->


        <!-- 좌측 메뉴 아이콘 -->
        <b-dropdown class="float-start custom-dropdown" size="lg" variant="link" toggle-class="text-decoration-none"
            no-caret offset="70,-50">
            <template #button-content>
                <i class="bi bi-list h1 " v-if="!hiddenElement" @click="roleCheck"
                    style="font-size:2.5em; line-height:2.5em; margin-left:1em"></i>
            </template>
            <b-dropdown-text style="width: 240px; font-size: 1em;">
                MENU
            </b-dropdown-text>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item style="font-size:2em" :to="{ path: 'joyChart' }">
                Joy Record
            </b-dropdown-item>
            <b-dropdown-item :to="{ path: 'joyRecordInfo' }">
                info
            </b-dropdown-item>
            <b-dropdown-item v-show="isAdm" :to="{ path: 'joyMng' }">
                취미관리
            </b-dropdown-item>
            <b-dropdown-item v-show="isAdm" :to="{ path: 'memberMng' }">
                회원관리
            </b-dropdown-item>
            <b-dropdown-item v-show="isAdm" :to="{ path: 'mainList' }">
                게시글관리
            </b-dropdown-item>
        </b-dropdown>

        <!-- 우측 회원 아이콘 -->
        <b-dropdown class="float-end custom-dropdown" size="lg" variant="link" toggle-class="text-decoration-none"
            no-caret offset="-60,-60">
            <template #button-content>
                <i class="bi bi-person-circle h1 float-end" v-if="!hiddenElement"
                    style="font-size:2.5em; line-height:2.5em; padding-right:1em"></i>
            </template>
            <b-dropdown-item :to="{ path: 'memberInfo' }">Member Info</b-dropdown-item>
            <b-dropdown-item @click="fnLogout">Logout</b-dropdown-item>
        </b-dropdown>

    </div>
</template>

<script>

export default {
    name: 'mainHeader',
    components: {
    },

    data() {
        return {
            isAdm: false,
        };
    },
    mounted: function () {
        this.roleCheck();
    },
    computed: {
        hiddenElement() {
            // 로그인, 회원가입 페이지에서는 헤더 아이콘 숨김
            const hiddenRoutes = ['loginPage', 'signUp'];
            return hiddenRoutes.includes(this.$route.name);
        },
        logoStyle() {
            // 특정 라우트에 따라 로고의 margin-top을 조정
            switch (this.$route.name) {
                case 'loginPage':
                    return { marginTop: '5em' };
                default:
                    return { marginTop: '1em', width: '15em' };
            }
        }
    },

    methods: {
        /* 로고 클릭시 메인 화면으로 이동 */
        logoClick() {
            let pageName = this.isAdm ? 'memberMng' : 'mainCalendar';
            this.$router.push({
                name: pageName
            })
        },
        /* 권한 체크 */
        roleCheck() {
            const role = localStorage.getItem('user_role');
            this.isAdm = role == 'ADM' ? true : false;
        },
        /* 로그아웃  */
        fnLogout() {
            localStorage.removeItem("user_token");
            localStorage.removeItem("user_role");
            this.$store.state.isLogin = false;
            this.$store.state.user = null;

            alert('로그아웃 되었습니다.')
            this.$router.push({
                name: 'loginPage'
            })
        },
    }
}
</script>

<style>
/* 상단 아이콘 색상 */
.bi-list::before,
.bi-person-circle::before {
    color: rgb(84, 84, 84)
}

.dropdown-item {
    font-size: 1.2em !important;
    font-family: 'DungGeunMo';
    --bs-dropdown-link-active-bg: #fbc99d;
}

.dropdown-item:hover,
.dropdown-item:focus {
    background-color: #fbc99d !important;
}

.dropdown-menu {
    font-size: 1.5em !important;
    font-family: 'DungGeunMo';
    --bs-dropdown-bg: #FFD6B1 !important;
    border: none !important;
}

.dropdown-menu:hover {
    --bs-dropdown-bg: #FFD6B1 !important;
}
</style>