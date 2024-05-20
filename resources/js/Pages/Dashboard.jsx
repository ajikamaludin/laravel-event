import React, { useEffect, useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, router } from '@inertiajs/react'
import Card from '@/Components/DaisyUI/Card'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import FormInputDateRanger from '@/Components/DaisyUI/FormInputDateRange'

export default function Dashboard({ events, _start_date, _end_date, types }) {
    const [dates, setDates] = useState({
        startDate: _start_date,
        endDate: _end_date,
    })

    const calenderEvents = events.map((e) => {
        return {
            title: `${e.name} - ${e.place}`,
            start: e.start_date,
            end: e.end_date,
            id: e.id,
            url: route('events.edit', e.id),
        }
    })

    useEffect(() => {
        router.get(
            route(route().current()),
            { ...dates },
            {
                replace: true,
                preserveState: true,
            }
        )
    }, [dates])

    return (
        <AuthenticatedLayout page={'Dashboard'} action={''}>
            <Head title="Dashboard" />

            <div className="w-full gap-1 flex flex-col">
                <Card>
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        events={calenderEvents}
                    />
                </Card>
                <Card>
                    <div className="w-full gap-1 flex flex-col">
                        <FormInputDateRanger
                            value={dates}
                            onChange={setDates}
                        />
                        <div className="grid grid-flow-col gap-1">
                            {types.map((type) => (
                                <div className="p-3 rounded-md shadow-sm border">
                                    <div className="font-semibold">
                                        {type.count}
                                    </div>
                                    <div className="opacity-55">
                                        {type.name.toUpperCase()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>
        </AuthenticatedLayout>
    )
}
