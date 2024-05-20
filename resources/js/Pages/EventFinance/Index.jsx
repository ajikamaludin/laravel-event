import React, { useEffect, useState } from 'react'
import { router } from '@inertiajs/react'
import { usePrevious } from 'react-use'
import { Head } from '@inertiajs/react'
import { HiDotsVertical, HiPencil } from 'react-icons/hi'

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Pagination from '@/Components/DaisyUI/Pagination'
import SearchInput from '@/Components/DaisyUI/SearchInput'
import Dropdown from '@/Components/DaisyUI/Dropdown'
import Card from '@/Components/DaisyUI/Card'
import { formatDate, formatIDR } from '@/utils'
import { Option, Select } from '@/Components/DaisyUI/SelectInput'
import { useModalState } from '@/hooks'
import FormModal from './FormModal'

export default function Index(props) {
    const {
        data: { links, data },
        months,
        years,
    } = props

    const [m, setM] = useState(null)
    const [y, setY] = useState(null)
    const [search, setSearch] = useState('')
    const preValue = usePrevious(`${search}${m}${y}`)

    const formModal = useModalState()

    const toggleFormModal = (finance = null) => {
        formModal.setData(finance)
        formModal.toggle()
    }

    const params = { q: search, m, y }
    useEffect(() => {
        if (preValue) {
            router.get(
                route(route().current()),
                { q: search, m, y },
                {
                    replace: true,
                    preserveState: true,
                }
            )
        }
    }, [search, m, y])

    return (
        <AuthenticatedLayout page={'Data Keuangan Even'} action={''}>
            <Head title="Data Keuangan Even" />

            <div>
                <Card>
                    <div className="flex flex-col md:flex-row gap-1 justify-between mb-4">
                        <div className="flex flex-col md:flex-row gap-1 items-end md:items-center">
                            <SearchInput
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                            />
                            <Select
                                value={m}
                                onChange={(e) => setM(e.target.value)}
                            >
                                <Option value={''}>--filter bulan--</Option>
                                {months.map((m) => (
                                    <Option value={m.id} key={m.id}>
                                        {m.name}
                                    </Option>
                                ))}
                            </Select>
                            <Select
                                value={y}
                                onChange={(e) => setY(e.target.value)}
                            >
                                <Option value={''}>--filter tahun--</Option>
                                {years.map((y) => (
                                    <Option value={y} key={y}>
                                        {y}
                                    </Option>
                                ))}
                            </Select>
                            {/*  */}
                            <Dropdown
                                label={<HiDotsVertical />}
                                with_icon={false}
                            >
                                <Dropdown.Item>
                                    <a
                                        href={route('eventfinances.export')}
                                        target="_blank"
                                    >
                                        <div className="flex space-x-1 items-center">
                                            <div>Export</div>
                                        </div>
                                    </a>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <a
                                        href={route('eventfinances.print')}
                                        target="_blank"
                                    >
                                        <div className="flex space-x-1 items-center">
                                            <div>Print</div>
                                        </div>
                                    </a>
                                </Dropdown.Item>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Tanggal Awal</th>
                                    <th>Nama</th>
                                    <th>Lembaga</th>
                                    <th>Pendapatan</th>
                                    <th>Laba</th>
                                    <th>Persen</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((event, index) => (
                                    <tr key={event.id}>
                                        <td>{formatDate(event.start_date)}</td>
                                        <td>{event.name}</td>
                                        <td>{event.client.company_name}</td>
                                        <td>
                                            {formatIDR(event.finance.income)}
                                        </td>
                                        <td>
                                            {formatIDR(event.finance.profit)}
                                        </td>
                                        <td>{event.finance.profit_percent}</td>
                                        <td className="text-right">
                                            <Dropdown label={'Opsi'}>
                                                <Dropdown.Item
                                                    onClick={() =>
                                                        toggleFormModal(
                                                            event.finance
                                                        )
                                                    }
                                                >
                                                    <div className="flex space-x-1 items-center">
                                                        <HiPencil />
                                                        <div>Ubah</div>
                                                    </div>
                                                </Dropdown.Item>
                                            </Dropdown>
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
            <FormModal modalState={formModal} />
        </AuthenticatedLayout>
    )
}
