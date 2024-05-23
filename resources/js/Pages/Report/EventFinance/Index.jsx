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
import { Option, Select } from '@/Components/DaisyUI/SelectInput'
import Dropdown from '@/Components/DaisyUI/Dropdown'
import { HiDotsVertical } from 'react-icons/hi'

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
            action={'Rekapitulasi Keuangan Event'}
        >
            <Head title="Report" />

            <div>
                <Card>
                    <div className="flex flex-col md:flex-row gap-1 justify-between mb-4 items-end md:items-center">
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
                        <Dropdown label={<HiDotsVertical />} with_icon={false}>
                            <Dropdown.Item>
                                <a
                                    href={route('report.event-finance.export')}
                                    target="_blank"
                                >
                                    <div className="flex space-x-1 items-center">
                                        <div>Export</div>
                                    </div>
                                </a>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <a
                                    href={route('report.event-finance.print')}
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
                                    <th>Tanggal Awal</th>
                                    <th>Tanggal Akhir</th>
                                    <th>Nama Kegiatan</th>
                                    <th>Lembaga</th>
                                    <th>Kategori</th>
                                    <th>Pendapatan</th>
                                    <th>Pengeluaran</th>
                                    <th>Laba</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((event, index) => (
                                    <tr key={event.id}>
                                        <td>{formatDate(event.start_date)}</td>
                                        <td>{formatDate(event.end_date)}</td>
                                        <td>{event.name}</td>
                                        <td>{event.client.company_name}</td>
                                        <td>{event.type.category.name}</td>
                                        <td>
                                            {formatIDR(event.finance.income)}
                                        </td>
                                        <td>
                                            {formatIDR(event.finance.expense)}
                                        </td>
                                        <td>
                                            {formatIDR(event.finance.profit)}
                                        </td>
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
