import React, { useEffect } from 'react'
import ApplicationLogo from '@/Components/Defaults/ApplicationLogo'
import { Link } from '@inertiajs/react'
import { themeChange } from 'theme-change'

export default function Guest({ children }) {
    useEffect(() => {
        themeChange(false)
        // 👆 false parameter is required for react project
    }, [])

    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center md:pt-6 bg-base-300">
            {/* card */}
            <div className="w-full h-screen md:h-fit bg-base-100 shadow-xl max-w-md flex flex-col md:rounded-xl">
                <div className="p-4 md:p-5">
                    <div className="flex justify-center py-4">
                        <Link href="/">
                            <ApplicationLogo className="w-auto h-20 fill-current text-base-content text-5xl font-bold" />
                        </Link>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}
