import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import {usePermissStore} from '../store/permiss'
import home from "../views/home.vue";
import login from "../views/login.vue";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/dashboard',
    }, {
        path: "/",
        name: "Home",
        component: home,
        children: [
            {
                path: "/timeline",
                name: "timeline",
                meta: {
                    title: 'timeline'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/timeline.vue")
            }, {
                path: "/backlog",
                name: "backlog",
                meta: {
                    title: 'backlog'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/backlog.vue")
            },  {
                path: "/kanban",
                name: "kanban",
                meta: {
                    title: 'kanban'
                },
                component: () => import ( /* webpackChunkName: "tabs" */ "../views/kanban.vue")
            }, {
                path: '/404',
                name: '404',
                meta: {
                    title: '找不到页面'
                },
                component: () => import (/* webpackChunkName: "404" */ '../views/404.vue')
            }, {
                path: '/issue',
                name: 'issue',
                meta: {
                    title: 'issue'
                },
                component: () => import (/* webpackChunkName: "user" */ '../views/issue.vue')
            }, {
                path: '/settings',
                name: 'settings',
                meta: {
                    title: 'settings'
                },
                component: () => import (/* webpackChunkName: "user" */ '../views/settings.vue')
            }, 
        ]    
    }, {
        path: "/login",
        name: "login",
        meta: {
            title: '登录'
        },
        component: login,
        // component: () => import ( /* webpackChunkName: "login" */ "../views/login.vue"),
    },
    {
        path: "/register",
        name: "register",
        meta: {
            title: '注册'
        },
        component: () => import ("../views/register.vue")
    },
    {
        path: "/dashboard",
        name: "dashboard",
        meta: {
            title: '主页'
        },
        component: () => import ("../views/dashboard.vue")
    },{
        path: '/myhome',
        name: 'myhome',
        meta: {
            title: '个人中心'
        },
        component: () => import (/* webpackChunkName: "user" */ '../views/myhome.vue')
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    //const role = localStorage.getItem('ms_username');
    const permiss = usePermissStore();
    if (to.meta.permiss && !permiss.key.includes(to.meta.permiss)) {
        // 如果没有权限，则进入403
        next('/403');
    } else {
        next();
    }
});

export default router;