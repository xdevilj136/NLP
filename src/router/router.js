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
            path: 'data-config',
            component : r => require.ensure([], () => r(require('../page/main/data-config/index')), 'data-config')
        }, {
            path: '*',
            redirect: 'test'
        }]
    }, {
        path: '*',
        redirect: 'main'
    }]
}]
