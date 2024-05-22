import React, { useEffect, useState } from 'react'
import { router } from '@inertiajs/react'
import { usePrevious } from 'react-use'
import { Head } from '@inertiajs/react'

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Pagination from '@/Components/DaisyUI/Pagination'

import SearchInput from '@/Components/DaisyUI/SearchInput'
import Card from '@/Components/DaisyUI/Card'
import { formatDate } from '@/utils'
import FormInputDateRanger from '@/Components/DaisyUI/FormInputDateRange'
import { Option, Select } from '@/Components/DaisyUI/SelectInput'

export default function Index(props) {
    const {
        data: { links, data },
        categories,
        _start_date,
        _end_date,
    } = props

    const [category, setCategory] = useState('')
    const [dates, setDates] = useState({
        startDate: _start_date,
        endDate: _end_date,
    })
    const [search, setSearch] = useState('')
    const preValue = usePrevious(`${search}${dates}${category}`)

    const params = { q: search, category, ...dates }
    useEffect(() => {
        if (preValue) {
            router.get(
                route(route().current()),
                { q: search, category, ...dates },
                {
                    replace: true,
                    preserveState: true,
                }
            )
        }
    }, [search, category, dates])

    return (
        <AuthenticatedLayout
            page={'Report'}
            action={'Rekapitulasi Kegiatan Marketing'}
        >
            <Head title="Report" />

            <div>
                <Card>
                    <div className="flex flex-col md:flex-row gap-1 justify-between mb-4">
                        <SearchInput
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                        />
                        <Select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <Option value={''}>--filter kategori--</Option>
                            {categories.map((c) => (
                                <Option value={c.id} key={c.id}>
                                    {c.name}
                                </Option>
                            ))}
                        </Select>
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
                                    <th>Jenis</th>
                                    <th>Lembaga</th>
                                    <th>Tempat</th>
                                    <th>Panitia</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{formatDate(item.date)}</td>
                                        <td>{item.category.name}</td>
                                        <td>{item.client.company_name}</td>
                                        <td>{item.place}</td>
                                        <td>{item.committee.name}</td>
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
