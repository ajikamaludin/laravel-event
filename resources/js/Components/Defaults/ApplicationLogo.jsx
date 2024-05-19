import { usePage } from '@inertiajs/react'
import React from 'react'

export default function ApplicationLogo({ className }) {
    const {
        props: { app_name, app_logo },
    } = usePage()

    if (app_logo !== null) {
        return <img src={app_logo} className="w-36 h-3w-36" />
    }
    return <h1 className={className}>{app_name}</h1>
}
