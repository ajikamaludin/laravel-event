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

    const [speaker, setSpeaker] = useState(null)
    const [dates, setDates] = useState({
        startDate: _start_date,
        endDate: _end_date,
    })
    const [search, setSearch] = useState('')
    const preValue = usePrevious(`${search}${dates}${speaker}`)

    const params = { q: search, category: speaker, ...dates }
    useEffect(() => {
        if (preValue) {
            router.get(
                route(route().current()),
                { q: search, category: speaker, ...dates },
                {
                    replace: true,
                    preserveState: true,
                }
            )
        }
    }, [search, speaker, dates])

    return (
        <AuthenticatedLayout
            page={'Report'}
            action={'Rekapitulasi Penugasan Pemateri'}
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
                                itemSelected={speaker}
                                onItemSelected={(item) =>
                                    setSpeaker(item ? item.id : null)
                                }
                                placeholder="-- filter pemateri --"
                                data={{
                                    table: 'speakers',
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
                                    <th>Tanggal</th>
                                    <th>Nama Kegiatan</th>
                                    <th>Lembaga</th>
                                    <th>Pemateri</th>
                                    <th>Judul Materi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{formatDate(item.sdate)}</td>
                                        <td>{item.event.name}</td>
                                        <td>
                                            {item.event.client.company_name}
                                        </td>
                                        <td>{item.speaker.name}</td>
                                        <td>{item.title}</td>
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
