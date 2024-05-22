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
import { Option, Select } from '@/Components/DaisyUI/SelectInput'
import ImportModal from './ImportModal'

export default function Index(props) {
    const {
        data: { links, data },
        cities,
        clients,
    } = props

    const [city, setCity] = useState(null)
    const [company, setCompany] = useState(null)
    const [search, setSearch] = useState('')
    const preValue = usePrevious(`${search}${city}${company}`)

    const importModal = useModalState()
    const confirmModal = useModalState()
    const formModal = useModalState()

    const toggleFormModal = (participant = null) => {
        formModal.setData(participant)
        formModal.toggle()
    }

    const handleDeleteClick = (participant) => {
        confirmModal.setData(participant)
        confirmModal.toggle()
    }

    const onDelete = () => {
        if (confirmModal.data !== null) {
            router.delete(route('participants.destroy', confirmModal.data.id))
        }
    }

    const params = { q: search, city, company }
    useEffect(() => {
        if (preValue) {
            router.get(
                route(route().current()),
                { q: search, city, company },
                {
                    replace: true,
                    preserveState: true,
                }
            )
        }
    }, [search, city, company])

    return (
        <AuthenticatedLayout page={'Data Peserta'} action={''}>
            <Head title="Data Peserta" />

            <div>
                <Card>
                    <div className="flex flex-col md:flex-row gap-1 justify-between mb-4">
                        <HasPermission p="create-participant">
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
                            <div className="w-full">
                                <Select
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                >
                                    <Option value={''}>--filter kota--</Option>
                                    {cities.map((c) => (
                                        <Option value={c.city} key={c.city}>
                                            {c.city}
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                            <div className="w-full">
                                <Select
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                >
                                    <Option value={''}>
                                        --filter lembaga--
                                    </Option>
                                    {clients.map((c) => (
                                        <Option
                                            value={c.id}
                                            key={c.company_name}
                                        >
                                            {c.company_name}
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                            <Dropdown
                                label={<HiDotsVertical />}
                                with_icon={false}
                            >
                                <Dropdown.Item onClick={importModal.toggle}>
                                    <div className="flex space-x-1 items-center">
                                        <div>Import</div>
                                    </div>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <a
                                        href={route('participants.export')}
                                        target="_blank"
                                    >
                                        <div className="flex space-x-1 items-center">
                                            <div>Export</div>
                                        </div>
                                    </a>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <a
                                        href={route('participants.print')}
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
                                    <th>ID</th>
                                    <th>Nama</th>
                                    <th>Nama Lembaga</th>
                                    <th>No.Telp</th>
                                    <th>Kota</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((participant, index) => (
                                    <tr key={participant.id}>
                                        <td>{participant.code}</td>
                                        <td>{participant.name}</td>
                                        <td>
                                            {participant.client.company_name}
                                        </td>
                                        <td>{participant.phone}</td>
                                        <td>{participant.city}</td>
                                        <td className="text-end">
                                            <Dropdown label={'Opsi'}>
                                                <HasPermission p="update-participant">
                                                    <Dropdown.Item
                                                        onClick={() =>
                                                            toggleFormModal(
                                                                participant
                                                            )
                                                        }
                                                    >
                                                        <div className="flex space-x-1 items-center">
                                                            <HiPencil />
                                                            <div>Ubah</div>
                                                        </div>
                                                    </Dropdown.Item>
                                                </HasPermission>
                                                <HasPermission p="delete-participant">
                                                    <Dropdown.Item
                                                        onClick={() =>
                                                            handleDeleteClick(
                                                                participant
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
            <ImportModal modalState={importModal} />
        </AuthenticatedLayout>
    )
}
