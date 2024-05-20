import React, { useEffect, useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, router } from '@inertiajs/react'
import Card from '@/Components/DaisyUI/Card'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import FormInputDateRanger from '@/Components/DaisyUI/FormInputDateRange'
import { usePrevious } from 'react-use'
import { formatDate, formatIDR } from '@/utils'
import Chart from 'react-apexcharts'

export default function Dashboard({
    events,
    _start_date,
    _end_date,
    types,
    eventcats,
    finances,
    eventparticipants,
    eventlasts,
}) {
    const [dates, setDates] = useState({
        startDate: _start_date,
        endDate: _end_date,
    })

    const preValue = usePrevious(dates)
    const calenderEvents = events.map((e) => {
        return {
            title: `${e.name} - ${e.place}`,
            start: e.start_date,
            end: e.end_date,
            id: e.id,
            url: route('events.edit', e.id),
        }
    })

    const options = {
        labels: eventparticipants.map((e) => e.name),
    }
    const series = eventparticipants.map((e) => e.count)

    useEffect(() => {
        if (preValue) {
            router.get(
                route(route().current()),
                { ...dates },
                {
                    replace: true,
                    preserveState: true,
                }
            )
        }
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
                    <div className="w-full gap-3 flex flex-col">
                        <FormInputDateRanger
                            value={dates}
                            onChange={setDates}
                        />
                        <div>
                            <div>Kegiatan Marketing</div>
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
                        <div>
                            <div>Ketegori Event</div>
                            <div className="grid grid-flow-col gap-1">
                                {eventcats.map((ec) => (
                                    <div className="p-3 rounded-md shadow-sm border">
                                        <div className="font-semibold">
                                            {ec.count}
                                        </div>
                                        <div className="opacity-55">
                                            {ec.name.toUpperCase()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div>Pendapatan, Biaya dan Laba</div>
                            <div className="grid grid-flow-col gap-1">
                                <div className="p-3 rounded-md shadow-sm border">
                                    <div className="font-semibold">
                                        {formatIDR(finances.income)}
                                    </div>
                                    <div className="opacity-55">Pendapatan</div>
                                </div>
                                <div className="p-3 rounded-md shadow-sm border">
                                    <div className="font-semibold">
                                        {formatIDR(finances.expense)}
                                    </div>
                                    <div className="opacity-55">Biaya</div>
                                </div>
                                <div className="p-3 rounded-md shadow-sm border">
                                    <div className="font-semibold">
                                        {formatIDR(finances.profit)}
                                    </div>
                                    <div className="opacity-55">Laba</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>Jumlah Peserta</div>
                            <div className="w-full grid grid-flow-col gap-1">
                                <Chart
                                    options={options}
                                    series={series}
                                    type="pie"
                                    height="300px"
                                />
                            </div>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div>Event Terakhir</div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Tanggal Awal</th>
                                    <th>Tanggal Akhir</th>
                                    <th>Nama</th>
                                    <th>Lembaga</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {eventlasts.map((event, index) => (
                                    <tr key={event.id}>
                                        <td>{index + 1}</td>
                                        <td>{formatDate(event.start_date)}</td>
                                        <td>{formatDate(event.end_date)}</td>
                                        <td>{event.name}</td>
                                        <td>{event.client.company_name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </AuthenticatedLayout>
    )
}
