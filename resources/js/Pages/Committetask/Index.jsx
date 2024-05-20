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

    const toggleFormModal = (committetask = null) => {
        formModal.setData(committetask)
        formModal.toggle()
    }

    const handleDeleteClick = (committetask) => {
        confirmModal.setData(committetask)
        confirmModal.toggle()
    }

    const onDelete = () => {
        if (confirmModal.data !== null) {
            router.delete(route('committetasks.destroy', confirmModal.data.id))
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
        <AuthenticatedLayout page={'Pengaturan Tugas Panitia'} action={''}>
            <Head title="Pengaturan Tugas Panitia" />

            <div>
                <Card>
                    <div className="flex justify-between mb-4">
                        <HasPermission p="create-committetask">
                            <Button
                                size="sm"
                                onClick={() => toggleFormModal()}
                                type="primary"
                            >
                                Tambah
                            </Button>
                        </HasPermission>
                        <div className="flex gap-1 items-center">
                            <SearchInput
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                            />
                            <a
                                href={route('committetasks.export')}
                                target="_blank"
                            >
                                <Button type="secondary">Export</Button>
                            </a>
                            <a
                                href={route('committetasks.print')}
                                target="_blank"
                            >
                                <Button type="secondary">Print</Button>
                            </a>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table mb-4">
                            <thead>
                                <tr>
                                    <th>Tugas</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((committetask, index) => (
                                    <tr key={committetask.id}>
                                        <td>{committetask.name}</td>
                                        <td className="text-end">
                                            <Dropdown label={'Opsi'}>
                                                <HasPermission p="update-committetask">
                                                    <Dropdown.Item
                                                        onClick={() =>
                                                            toggleFormModal(
                                                                committetask
                                                            )
                                                        }
                                                    >
                                                        <div className="flex space-x-1 items-center">
                                                            <HiPencil />
                                                            <div>Ubah</div>
                                                        </div>
                                                    </Dropdown.Item>
                                                </HasPermission>
                                                <HasPermission p="delete-committetask">
                                                    <Dropdown.Item
                                                        onClick={() =>
                                                            handleDeleteClick(
                                                                committetask
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
