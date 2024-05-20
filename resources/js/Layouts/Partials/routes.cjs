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
        name: 'Data Even',
        show: true,
        icon: HiViewList,
        route: route('events.index'),
        active: 'events.*',
        permission: 'view-event',
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
        name: 'Data Peserta',
        show: true,
        icon: HiViewList,
        route: route('participants.index'),
        active: 'participants.*',
        permission: 'view-participant',
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
        name: 'Kegiatan Marketing',
        show: true,
        icon: HiViewList,
        route: route('marketingactivities.index'),
        active: 'marketingactivities.*',
        permission: 'view-marketingactivity',
    },
    {
        name: 'Kegiatan Logistik',
        show: true,
        icon: HiViewList,
        route: route('logisticreceptions.index'),
        active: 'logisticreceptions.*',
        permission: 'view-logisticreception',
    },
    {
        name: 'Keuangan Event',
        show: true,
        icon: HiViewList,
        route: route('eventfinances.index'),
        active: 'eventfinances.*',
        permission: 'view-eventfinance',
    },
    {
        name: 'Status Logistik',
        show: true,
        icon: HiViewList,
        route: route('statuslogistics.index'),
        active: 'statuslogistics.*',
        permission: 'view-statuslogistic',
    },
    {
        name: 'Pengaturan Jenis Event',
        show: true,
        icon: HiViewList,
        route: route('eventtypes.index'),
        active: 'eventtypes.*',
        permission: 'view-eventtype',
    },
    {
        name: 'Pengaturan Tugas Panitia',
        show: true,
        icon: HiViewList,
        route: route('committetasks.index'),
        active: 'committetasks.*',
        permission: 'view-committetask',
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
