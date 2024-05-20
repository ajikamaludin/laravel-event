import React, { useEffect, useState } from 'react'
import { router, Head } from '@inertiajs/react'
import { usePrevious } from 'react-use'
import { HiDotsVertical, HiPencil, HiTrash } from 'react-icons/hi'
import { useModalState } from '@/hooks'

import HasPermission from '@/Components/Common/HasPermission'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Pagination from '@/Components/DaisyUI/Pagination'
import ModalConfirm from '@/Components/DaisyUI/ModalConfirm'
import SearchInput from '@/Components/DaisyUI/SearchInput'
import Button from '@/Components/DaisyUI/Button'
import Dropdown from '@/Components/DaisyUI/Dropdown'
import Card from '@/Components/DaisyUI/Card'
import FormModal from './FormModal'
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
    const formModal = useModalState()

    const toggleFormModal = (marketingactivity = null) => {
        formModal.setData(marketingactivity)
        formModal.toggle()
    }

    const handleDeleteClick = (marketingactivity) => {
        confirmModal.setData(marketingactivity)
        confirmModal.toggle()
    }

    const onDelete = () => {
        if (confirmModal.data !== null) {
            router.delete(
                route('marketingactivities.destroy', confirmModal.data.id)
            )
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
        <AuthenticatedLayout page={'Kegiatan Marketing'} action={''}>
            <Head title="Kegiatan Marketing" />

            <div>
                <Card>
                    <div className="flex flex-col md:flex-row gap-1 justify-between mb-4">
                        <HasPermission p="create-marketingactivity">
                            <Button
                                size="sm"
                                onClick={() => toggleFormModal()}
                                type="primary"
                            >
                                Tambah
                            </Button>
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
                                        href={route(
                                            'marketingactivities.export'
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
                                            'marketingactivities.print'
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
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table mb-4">
                            <thead>
                                <tr>
                                    <th>Tanggal</th>
                                    <th>Nama Lembaga</th>
                                    <th>Tempat</th>
                                    <th>Jenis</th>
                                    <th>Panitia</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((marketingactivity, index) => (
                                    <tr key={marketingactivity.id}>
                                        <td>
                                            {formatDate(marketingactivity.date)}
                                        </td>
                                        <td>
                                            {
                                                marketingactivity.client
                                                    .company_name
                                            }
                                        </td>
                                        <td>{marketingactivity.place}</td>
                                        <td>
                                            {marketingactivity.category.name}
                                        </td>
                                        <td>
                                            {marketingactivity.committee.name}
                                        </td>
                                        <td className="text-end">
                                            <Dropdown label={'Opsi'}>
                                                <HasPermission p="update-marketingactivity">
                                                    <Dropdown.Item
                                                        onClick={() =>
                                                            toggleFormModal(
                                                                marketingactivity
                                                            )
                                                        }
                                                    >
                                                        <div className="flex space-x-1 items-center">
                                                            <HiPencil />
                                                            <div>Ubah</div>
                                                        </div>
                                                    </Dropdown.Item>
                                                </HasPermission>
                                                <HasPermission p="delete-marketingactivity">
                                                    <Dropdown.Item
                                                        onClick={() =>
                                                            handleDeleteClick(
                                                                marketingactivity
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
            <ModalConfirm onConfirm={onDelete} modalState={confirmModal} />
            <FormModal modalState={formModal} />
        </AuthenticatedLayout>
    )
}
