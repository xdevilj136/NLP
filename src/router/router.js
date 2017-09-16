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
        children: [{
            path: 'test',
            component : r => require.ensure([], () => r(require('../page/main/test')), 'test')
        }, {
            path: 'task-manage',
            component : r => require.ensure([], () => r(require('../page/main/task-manage/index')), 'task-manage')
        }, {
            path: 'task-manage/create',
            component : r => require.ensure([], () => r(require('../page/main/task-manage/create')), 'task-manage-create')
        },{
            path: 'task-manage/detail/:id',
            component : r => require.ensure([], () => r(require('../page/main/task-manage/detail')), 'task-manage-detail')
        },{
            path: 'task-manage/log/:id',
            component : r => require.ensure([], () => r(require('../page/main/task-manage/log')), 'log')
        },{
            path: 'data-source-config',
            component : r => require.ensure([], () => r(require('../page/main/data-source-config/index')), 'data-source-config')
        },{
            path: 'authority-manage',
            component : r => require.ensure([], () => r(require('../page/main/authority-manage/index')), 'authority-manage')
        }, {
            path: 'info-extra',
            component: r => require.ensure([], () => r(require('../page/main/info-extra/index')), 'info-extra'),
            children: [{
                path: '',
                component : r => require.ensure([], () => r(require('../page/main/info-extra/list')), 'info-extra-list'),
                name: 'info-extra-detail'
            }, {
                path: ':config/detail',
                component : r => require.ensure([], () => r(require('../page/main/info-extra/detail')), 'info-extra-detail'),
                name: 'info-extra-detail'
            }, {
                path: 'add',
                component : r => require.ensure([], () => r(require('../page/main/info-extra/edit')), 'info-extra-add'),
                name: 'info-extra-add'
            },{
                path: 'edit/:id',
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
            }, {
                path: 'info-get',
                component : r => require.ensure([], () => r(require('../page/main/function-display/info-get')), 'info-get'),
            }]
        }, {
            path: '*',
            redirect: 'test'
        }]
    }, {
        path: '*',
        redirect: 'login'
    }]
}]
