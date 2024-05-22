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
        categories,
    } = props

    const [category, setCategory] = useState('')
    const [search, setSearch] = useState('')
    const preValue = usePrevious(`${search}${category}`)

    const importModal = useModalState()
    const confirmModal = useModalState()
    const formModal = useModalState()

    const toggleFormModal = (client = null) => {
        formModal.setData(client)
        formModal.toggle()
    }

    const handleDeleteClick = (client) => {
        confirmModal.setData(client)
        confirmModal.toggle()
    }

    const onDelete = () => {
        if (confirmModal.data !== null) {
            router.delete(route('clients.destroy', confirmModal.data.id))
        }
    }

    const params = { q: search, company_category: category }
    useEffect(() => {
        if (preValue) {
            router.get(
                route(route().current()),
                { q: search, company_category: category },
                {
                    replace: true,
                    preserveState: true,
                }
            )
        }
    }, [search, category])

    return (
        <AuthenticatedLayout page={'Data Lembaga'} action={''}>
            <Head title="Lembaga" />

            <div>
                <Card>
                    <div className="flex flex-col md:flex-row gap-1 justify-between mb-4">
                        <HasPermission p="create-client">
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
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <Option value={''}>--filter kategori--</Option>
                                {categories.map((c) => (
                                    <Option
                                        value={c.company_category}
                                        key={c.company_category}
                                    >
                                        {c.company_category}
                                    </Option>
                                ))}
                            </Select>
                            {/*  */}
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
                                        href={route('clients.export')}
                                        target="_blank"
                                    >
                                        <div className="flex space-x-1 items-center">
                                            <div>Export</div>
                                        </div>
                                    </a>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <a
                                        href={route('clients.print')}
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
                                    <th>Nama Lembaga</th>
                                    <th>Kategori</th>
                                    <th>Contact Person</th>
                                    <th>No.Telp Contact Person</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((client, index) => (
                                    <tr key={client.id}>
                                        <td>{client.company_name}</td>
                                        <td>{client.company_category}</td>
                                        <td>{client.pic_name}</td>
                                        <td>{client.pic_phone}</td>
                                        <td className="text-end">
                                            <Dropdown label={'Opsi'}>
                                                <HasPermission p="update-client">
                                                    <Dropdown.Item
                                                        onClick={() =>
                                                            toggleFormModal(
                                                                client
                                                            )
                                                        }
                                                    >
                                                        <div className="flex space-x-1 items-center">
                                                            <HiPencil />
                                                            <div>Ubah</div>
                                                        </div>
                                                    </Dropdown.Item>
                                                </HasPermission>
                                                <HasPermission p="delete-client">
                                                    <Dropdown.Item
                                                        onClick={() =>
                                                            handleDeleteClick(
                                                                client
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
