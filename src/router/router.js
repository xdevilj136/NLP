import App from '../App'

export default [{
    path: '/',
    component: App,
    redirect: '/main',
    children: [{
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
            path: 'data-config',
            component : r => require.ensure([], () => r(require('../page/main/data-config/index')), 'data-config')
        },{
            path: 'authority-manage',
            component : r => require.ensure([], () => r(require('../page/main/authority-manage/index')), 'authority-manage')
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
        redirect: 'main'
    }]
}]
