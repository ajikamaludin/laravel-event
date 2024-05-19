import { HiChartPie, HiUser, HiCog, HiViewList } from 'react-icons/hi'

export default [
    {
        name: 'Dashboard',
        show: true,
        icon: HiChartPie,
        route: route('dashboard'),
        active: 'dashboard',
        permission: 'view-dashboard',
    },
    {
        name: 'Data Klien',
        show: true,
        icon: HiViewList,
        route: route('clients.index'),
        active: 'clients.*',
        permission: 'view-client',
    },
    {
        name: 'Data Pemateri',
        show: true,
        icon: HiViewList,
        route: route('speakers.index'),
        active: 'speakers.*',
        permission: 'view-speaker',
    },
    {
        name: 'Data Panitia',
        show: true,
        icon: HiViewList,
        route: route('committes.index'),
        active: 'committes.*',
        permission: 'view-committe',
    },
    {
        name: 'Data Logistik',
        show: true,
        icon: HiViewList,
        route: route('logistics.index'),
        active: 'logistics.*',
        permission: 'view-logistic',
    },
    {
        name: 'User Management',
        show: true,
        icon: HiUser,
        items: [
            {
                name: 'Roles',
                show: true,
                route: route('roles.index'),
                active: 'roles.*',
                permission: 'view-role',
            },
            {
                name: 'Users',
                show: true,
                route: route('user.index'),
                active: 'user.index',
                permission: 'view-user',
            },
        ],
    },
    {
        name: 'Setting',
        show: true,
        icon: HiCog,
        route: route('setting.index'),
        active: 'setting.index',
        permission: 'view-setting',
    },
]
