import React, { useEffect, useState } from 'react'
import { router } from '@inertiajs/react'
import { usePrevious } from 'react-use'
import { Head } from '@inertiajs/react'

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Pagination from '@/Components/DaisyUI/Pagination'

import SearchInput from '@/Components/DaisyUI/SearchInput'
import Card from '@/Components/DaisyUI/Card'
import { formatDate, formatIDR } from '@/utils'
import FormInputDateRanger from '@/Components/DaisyUI/FormInputDateRange'
import SelectionInput from '@/Components/Common/SelectionInput'

export default function Index(props) {
    const {
        data: { links, data },
        _start_date,
        _end_date,
    } = props

    const [committe, setCommitte] = useState(null)
    const [task, setTask] = useState(null)
    const [dates, setDates] = useState({
        startDate: _start_date,
        endDate: _end_date,
    })
    const [search, setSearch] = useState('')
    const preValue = usePrevious(`${search}${dates}${committe}${task}`)

    const params = { q: search, committe, task, ...dates }
    useEffect(() => {
        if (preValue) {
            router.get(
                route(route().current()),
                { q: search, committe, task, ...dates },
                {
                    replace: true,
                    preserveState: true,
                }
            )
        }
    }, [search, committe, task, dates])

    return (
        <AuthenticatedLayout
            page={'Report'}
            action={'Rekapitulasi Penugasan Panitia'}
        >
            <Head title="Report" />

            <div>
                <Card>
                    <div className="flex flex-col md:flex-row gap-1 justify-between mb-4">
                        <SearchInput
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                        />
                        <div className="w-full">
                            <SelectionInput
                                itemSelected={committe}
                                onItemSelected={(item) =>
                                    setCommitte(item ? item.id : null)
                                }
                                placeholder="-- filter panitia --"
                                data={{
                                    table: 'committes',
                                    display_name: 'name',
                                    orderby: 'name.asc',
                                }}
                            />
                        </div>
                        <div className="w-full">
                            <SelectionInput
                                itemSelected={task}
                                onItemSelected={(item) =>
                                    setTask(item ? item.id : null)
                                }
                                placeholder="-- filter tugas --"
                                data={{
                                    table: 'committe_tasks',
                                    display_name: 'name',
                                    orderby: 'name.asc',
                                }}
                            />
                        </div>
                        <div className="w-full">
                            <FormInputDateRanger
                                value={dates}
                                onChange={(d) => setDates(d)}
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Tanggal Awal</th>
                                    <th>Tanggal Akhir</th>
                                    <th>Nama Kegiatan</th>
                                    <th>Lembaga</th>
                                    <th>Panitia</th>
                                    <th>Tugas</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>
                                            {formatDate(item.event.start_date)}
                                        </td>
                                        <td>
                                            {formatDate(item.event.end_date)}
                                        </td>
                                        <td>{item.event.name}</td>
                                        <td>
                                            {item.event.client.company_name}
                                        </td>
                                        <td>{item.committe.name}</td>
                                        <td>{item.task.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="w-full overflow-x-auto flex lg:justify-center">
                        <Pagination links={links} params={params} />
                    </div>
                </Card>
            </div>
        </AuthenticatedLayout>
    )
}
