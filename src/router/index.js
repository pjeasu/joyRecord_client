import { createMemoryHistory, createRouter } from 'vue-router';
import store from '@/vuex/store';

import loginPage from '@/components/loginPage.vue';
import signUp from '@/components/signUp.vue';
import mainCalendar from '@/components/mainCalendar.vue';
import mainList from '@/components/mainList.vue';
import memberInfo from '@/components/memberInfo.vue';
import joyRecordInfo from '@/components/joyRecordInfo.vue';
import notFound from '@/components/notFound.vue';




const requireAuth = () => (from, to, next) => {
    const token = localStorage.getItem('user_token');

    if (token) {
        // 토큰이 있을 경우, 메인 페이지로 이동
        store.state.isLogin = true
        return next()
    } else{
        //토큰이 없을 경우
        console.log('token X')
        next('/loginPage') // isLogin === false면 다시 로그인 화면으로 이동

    }
  }

  
const routes = [
    /** 메인 **/

    // 로그인
    {
        path: '/',
        redirect: localStorage.getItem('user_token') ? 'mainCalendar' : 'loginPage'
    },
    { 
        path: '/loginPage',
        name: 'loginPage',
        component : loginPage
    }, 
    // 회원가입
    { 
        path: '/signUp',
        name: 'signUp',
        component : signUp
    }, 

    //메인 화면 - 캘린더
    {   path: '/mainCalendar', 
        name: 'mainCalendar',
        component : mainCalendar,
        beforeEnter: requireAuth()
    }, 
    //메인 화면 - 글 목록
    {   path: '/mainList', 
        name: 'mainList',
        component : mainList,
        beforeEnter: requireAuth()
    }, 
    // 회원정보
    {   path: '/memberInfo', 
        name: 'memberInfo',
        component : memberInfo,
        beforeEnter: requireAuth()
    }, 
    // 웹사이트 설명 
    { 
        path: '/joyRecordInfo',
        name: 'joyRecordInfo',
        component : joyRecordInfo
    }, 


    /** 기타 **/
    //에러페이지
    {
        path: "/notFound",
        name: "notFound",
        component: notFound 
    },
    {
        path: "/:pathMatch(.*)",
        redirect: "/notFound"
    }
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
});

export default router;