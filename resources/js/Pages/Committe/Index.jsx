import React, { useEffect, useState } from 'react'
import { router, Head } from '@inertiajs/react'
import { usePrevious } from 'react-use'
import { HiPencil, HiTrash } from 'react-icons/hi'
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

export default function Index(props) {
    const {
        data: { links, data },
    } = props

    const [search, setSearch] = useState('')
    const preValue = usePrevious(search)

    const confirmModal = useModalState()
    const formModal = useModalState()

    const toggleFormModal = (committe = null) => {
        formModal.setData(committe)
        formModal.toggle()
    }

    const handleDeleteClick = (committe) => {
        confirmModal.setData(committe)
        confirmModal.toggle()
    }

    const onDelete = () => {
        if (confirmModal.data !== null) {
            router.delete(route('committes.destroy', confirmModal.data.id))
        }
    }

    const params = { q: search }
    useEffect(() => {
        if (preValue) {
            router.get(
                route(route().current()),
                { q: search },
                {
                    replace: true,
                    preserveState: true,
                }
            )
        }
    }, [search])

    return (
        <AuthenticatedLayout page={'Data Panitia'} action={''}>
            <Head title="Panitia" />

            <div>
                <Card>
                    <div className="flex flex-col md:flex-row gap-1 justify-between mb-4">
                        <HasPermission p="create-committe">
                            <Button
                                size="sm"
                                onClick={() => toggleFormModal()}
                                type="primary"
                            >
                                Tambah
                            </Button>
                        </HasPermission>
                        <div className="flex gap-1 items-end">
                            <SearchInput
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                            />
                            <a href={route('committes.export')} target="_blank">
                                <Button type="secondary">Export</Button>
                            </a>
                            <a href={route('committes.print')} target="_blank">
                                <Button type="secondary">Print</Button>
                            </a>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table mb-4">
                            <thead>
                                <tr>
                                    <th>Nama</th>
                                    <th>No. Telp</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((committe, index) => (
                                    <tr key={committe.id}>
                                        <td>{committe.name}</td>
                                        <td>{committe.phone}</td>
                                        <td className="text-end">
                                            <Dropdown label={'Opsi'}>
                                                <HasPermission p="update-committe">
                                                    <Dropdown.Item
                                                        onClick={() =>
                                                            toggleFormModal(
                                                                committe
                                                            )
                                                        }
                                                    >
                                                        <div className="flex space-x-1 items-center">
                                                            <HiPencil />
                                                            <div>Ubah</div>
                                                        </div>
                                                    </Dropdown.Item>
                                                </HasPermission>
                                                <HasPermission p="delete-committe">
                                                    <Dropdown.Item
                                                        onClick={() =>
                                                            handleDeleteClick(
                                                                committe
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
