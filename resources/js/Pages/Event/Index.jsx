import React, { useEffect, useState } from 'react'
import { router } from '@inertiajs/react'
import { usePrevious } from 'react-use'
import { Head, Link } from '@inertiajs/react'
import { HiDotsVertical, HiPencil, HiTrash } from 'react-icons/hi'
import { useModalState } from '@/hooks'

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Pagination from '@/Components/DaisyUI/Pagination'
import ModalConfirm from '@/Components/DaisyUI/ModalConfirm'
import SearchInput from '@/Components/DaisyUI/SearchInput'
import HasPermission from '@/Components/Common/HasPermission'
import Dropdown from '@/Components/DaisyUI/Dropdown'
import Button from '@/Components/DaisyUI/Button'
import Card from '@/Components/DaisyUI/Card'
import { formatDate } from '@/utils'
import { Option, Select } from '@/Components/DaisyUI/SelectInput'

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

    const confirmModal = useModalState()

    const handleDeleteClick = (event) => {
        confirmModal.setData(event)
        confirmModal.toggle()
    }

    const onDelete = () => {
        if (confirmModal.data !== null) {
            router.delete(route('events.destroy', confirmModal.data.id))
        }
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
        <AuthenticatedLayout page={'Data Event'} action={''}>
            <Head title="Data Event" />

            <div>
                <Card>
                    <div className="flex flex-col md:flex-row gap-1 justify-between mb-4">
                        <HasPermission p="create-event">
                            <Link href={route('events.create')}>
                                <Button size="sm" type="primary">
                                    Tambah
                                </Button>
                            </Link>
                        </HasPermission>

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
                                        href={route('events.export')}
                                        target="_blank"
                                    >
                                        <div className="flex space-x-1 items-center">
                                            <div>Export</div>
                                        </div>
                                    </a>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <a
                                        href={route('events.print')}
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
                                    <th>Lokasi</th>
                                    <th>Status</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((event, index) => (
                                    <tr key={event.id}>
                                        <td>{formatDate(event.start_date)}</td>
                                        <td>{event.name}</td>
                                        <td>{event.client.company_name}</td>
                                        <td>{event.place}</td>
                                        <td>{event.report.status_text}</td>
                                        <td className="text-right">
                                            <Dropdown label={'Opsi'}>
                                                <HasPermission p="update-event">
                                                    <Dropdown.Item
                                                        onClick={() =>
                                                            router.visit(
                                                                route(
                                                                    'events.edit',
                                                                    event
                                                                )
                                                            )
                                                        }
                                                    >
                                                        <div className="flex space-x-1 items-center">
                                                            <HiPencil />
                                                            <div>Ubah</div>
                                                        </div>
                                                    </Dropdown.Item>
                                                </HasPermission>
                                                <HasPermission p="delete-event">
                                                    <Dropdown.Item
                                                        onClick={() =>
                                                            handleDeleteClick(
                                                                event
                                                            )
                                                        }
                                                    >
                                                        <div className="flex space-x-1 items-center">
                                                            <HiTrash />
                                                            <div>Hapus</div>
                                                        </div>
                                                    </Dropdown.Item>
                                                </HasPermission>
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
            <ModalConfirm modalState={confirmModal} onConfirm={onDelete} />
        </AuthenticatedLayout>
    )
}
