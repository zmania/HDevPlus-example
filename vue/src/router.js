import { createRouter, createWebHistory } from 'vue-router';
import NotFound from '@/components/NotFound.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import("@/view/Home.vue"),
    },
    {
        path: '/post/list',
        name: 'PostList',
        component: () => import("@/view/Post/PostList.vue"),
    },
    {
        path: '/post/view',
        name: 'PostView',
        component: () => import("@/view/Post/PostView.vue"),
    },
    {
        path: '/post/add',
        name: 'PostAdd',
        component: () => import("@/view/Post/AddPost.vue"),
    },
    {
        path: '/member/login',
        name: 'MemberLogin',
        component: () => import("@/view/Member/Login.vue"),
    },
    {
        path: '/member/join',
        name: 'MemberJoin',
        component: () => import("@/view/Member/Join.vue"),
    },
    {
        path: '/member/mypage',
        name: 'MyPage',
        component: () => import("@/view/Member/MyPage.vue"),
    },
    {
        path: '/member/auth',
        name: 'MemberAuth',
        component: () => import("@/view/Member/Auth.vue"),
    },
    {
        path: '/member/modify',
        name: 'MemberModify',
        component: () => import("@/view/Member/Modify.vue"),
    },
    {
        path: '/member/change-password',
        name: 'ChangePassword',
        component: () => import("@/view/Member/changePassword.vue"),
    },
    {
        path: '/form/contact',
        name: 'ContactForm',
        component: () => import("@/view/WebForm/ContactForm.vue"),
    }
]

const router = createRouter({
    // history: createWebHistory(process.env.BASE_URL),
    history: createWebHistory('/'),
    routes
})

export default router;