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
import Dropdown from '@/Components/DaisyUI/Dropdown'
import { HiDotsVertical } from 'react-icons/hi'

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
                    <div className="flex flex-col md:flex-row gap-1 justify-between mb-4 items-end md:items-center">
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
                        <Dropdown label={<HiDotsVertical />} with_icon={false}>
                            <Dropdown.Item>
                                <a
                                    href={route(
                                        'report.event-speaker.export',
                                        params
                                    )}
                                    target="_blank"
                                >
                                    <div className="flex space-x-1 items-center">
                                        <div>Export</div>
                                    </div>
                                </a>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <a
                                    href={route(
                                        'report.event-speaker.print',
                                        params
                                    )}
                                    target="_blank"
                                >
                                    <div className="flex space-x-1 items-center">
                                        <div>Print</div>
                                    </div>
                                </a>
                            </Dropdown.Item>
                        </Dropdown>
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
