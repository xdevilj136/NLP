import App from '../App'

export default [{
    path: '/',
    component: App,
    redirect: '/login',
    children: [{
        path: '/login',
        component:  r => require.ensure([], () => r(require('../page/login')), 'login')
    }, {
        path: '/main',
        component: r => require.ensure([], () => r(require('../page/index')), 'main'),
        redirect:'/main/task-manage',
        children: [{
            path: 'not-found',
            component : r => require.ensure([], () => r(require('../page/main/not-found')), 'not-found')
        }, {
            path: 'task-manage',
            component : r => require.ensure([], () => r(require('../page/main/task-manage/index')), 'task-manage')
        }, {
            path: 'task-manage/create',
            component : r => require.ensure([], () => r(require('../page/main/task-manage/create')), 'task-manage-create'),
            name:'task-manage-create'
        },{
            path: 'task-manage/edit/:id',
            component : r => require.ensure([], () => r(require('../page/main/task-manage/create')), 'task-manage-edit'),
            name:'task-manage-edit'
        },{
            path: 'task-manage/detail/:id',
            component : r => require.ensure([], () => r(require('../page/main/task-manage/detail')), 'task-manage-detail')
        },{
            path: 'task-manage/log/:id',
            component : r => require.ensure([], () => r(require('../page/main/task-manage/log')), 'task-manage-log')
        },{
            path: 'task-manage/result/:id',
            component : r => require.ensure([], () => r(require('../page/main/task-manage/result')), 'task-manage-result')
        },{
            path: 'data-source-config',
            component : r => require.ensure([], () => r(require('../page/main/data-source-config/index')), 'data-source-config')
        },{
            path: 'data-source-config/create',
            component : r => require.ensure([], () => r(require('../page/main/data-source-config/create')), 'data-source-config-create'),
            name:'data-source-config-create'
        },{
            path: 'data-source-config/edit/:id',
            component : r => require.ensure([], () => r(require('../page/main/data-source-config/create')), 'data-source-config-edit'),
            name:'data-source-config-edit'
        },{
            path: 'data-source-config/detail/:id',
            component : r => require.ensure([], () => r(require('../page/main/data-source-config/detail')), 'data-source-config-detail')
        },{
            path: 'authority-manage',
            component : r => require.ensure([], () => r(require('../page/main/authority-manage/index')), 'authority-manage')
        }, {
            path: 'info-extra',
            component: r => require.ensure([], () => r(require('../page/main/info-extra/index')), 'info-extra'),
            children: [{
                path: '',
                component : r => require.ensure([], () => r(require('../page/main/info-extra/list')), 'info-extra-list'),
                name: 'info-extra-list'
            }, {
                path: ':config/detail/:id',
                component : r => require.ensure([], () => r(require('../page/main/info-extra/detail')), 'info-extra-detail'),
                name: 'info-extra-detail'
            }, {
                path: 'add',
                component : r => require.ensure([], () => r(require('../page/main/info-extra/edit')), 'info-extra-add'),
                name: 'info-extra-add'
            },{
                path: ':config/edit/:id',
                component : r => require.ensure([], () => r(require('../page/main/info-extra/edit')), 'info-extra-edit'),
                name: 'info-extra-edit'
            }]
        }, {
            path: 'function-display',
            component : r => require.ensure([], () => r(require('../page/main/function-display/index')), 'function-display'),
            children: [{
                path: 'machanism-ident',
                component : r => require.ensure([], () => r(require('../page/main/function-display/machanism-ident')), 'machanism-ident'),
            }, {
                path: 'analysis',
                component : r => require.ensure([], () => r(require('../page/main/function-display/analysis')), 'analysis'),
            },{
                path: 'article-analysis',
                component : r => require.ensure([], () => r(require('../page/main/function-display/article-analysis')), 'article-analysis'),
            }, {
                path: 'sentence-similarity',
                component : r => require.ensure([], () => r(require('../page/main/function-display/sentence-similarity')), 'sentence-similarity'),
            },{
                path: 'data-extract',
                component : r => require.ensure([], () => r(require('../page/main/function-display/data-extract')), 'data-extract'),
            },
            {
                path: 'industry-category',
                component : r => require.ensure([], () => r(require('../page/main/function-display/industry-category')), 'industry-category'),
            },{
                path: 'zsbank-credit',
                component : r => require.ensure([], () => r(require('../page/main/function-display/zsbank-credit')), 'zsbank-credit'),
            }]
        }, {
            path: '*',
            redirect: 'not-found'
        }]
    }, {
        path: '*',
        redirect: 'login'
    }]
}]
