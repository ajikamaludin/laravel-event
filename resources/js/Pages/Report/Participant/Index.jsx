import React, { useState } from 'react'
import { router } from '@inertiajs/react'
import { Head } from '@inertiajs/react'

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'

import Card from '@/Components/DaisyUI/Card'
import { formatDate } from '@/utils'
import SelectionInput from '@/Components/Common/SelectionInput'
import Button from '@/Components/DaisyUI/Button'

export default function Index(props) {
    const { _participant } = props

    const [client, setClient] = useState(null)
    const [participant, setParticipant] = useState(null)

    const handleChange = () => {
        router.get(
            route(route().current()),
            { client, participant },
            {
                replace: true,
                preserveState: true,
            }
        )
    }

    return (
        <AuthenticatedLayout page={'Report'} action={'Detail Peserta'}>
            <Head title="Report" />

            <div>
                <Card>
                    <div className="flex flex-col md:flex-row gap-1 mb-4">
                        <SelectionInput
                            itemSelected={client}
                            onItemSelected={(item) =>
                                setClient(item ? item.id : null)
                            }
                            placeholder="-- filter lembaga --"
                            data={{
                                table: 'clients',
                                display_name: 'company_name',
                                orderby: 'company_name.asc',
                            }}
                        />
                        <SelectionInput
                            itemSelected={participant}
                            onItemSelected={(item) =>
                                setParticipant(item ? item.id : null)
                            }
                            placeholder="-- filter peserta --"
                            data={{
                                table: 'participants',
                                display_name:
                                    'code.name.phone.address.email.city.dob',
                                orderby: 'name.asc',
                            }}
                        />
                        <Button onClick={handleChange}>Tampil</Button>
                        {_participant && (
                            <a
                                href={route('report.detail-participan.print', {
                                    participant: _participant,
                                    client: _participant.client,
                                })}
                                target="_blank"
                                className="btn btn-secondary"
                            >
                                Print
                            </a>
                        )}
                    </div>
                    {_participant && (
                        <>
                            <div className="w-full flex flex-row gap-6">
                                <div className="w-1/2">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className="font-bold py-2">
                                                    ID
                                                </td>
                                                <td className="px-10">:</td>
                                                <td>{_participant.code}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-bold py-2">
                                                    Nama
                                                </td>
                                                <td className="px-10">:</td>
                                                <td>{_participant.name}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-bold py-2">
                                                    Email
                                                </td>
                                                <td className="px-10">:</td>
                                                <td>{_participant.email}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-bold py-2">
                                                    No.Telp
                                                </td>
                                                <td className="px-10">:</td>
                                                <td>{_participant.phone}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-bold py-2">
                                                    Alamat
                                                </td>
                                                <td className="px-10">:</td>
                                                <td>{_participant.address}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-bold py-2">
                                                    Kota
                                                </td>
                                                <td className="px-10">:</td>
                                                <td>{_participant.city}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-bold py-2">
                                                    Tanggal Lahir
                                                </td>
                                                <td className="px-10">:</td>
                                                <td>{_participant.dob}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-bold py-2">
                                                    Jenis Kelamin
                                                </td>
                                                <td className="px-10">:</td>
                                                <td>{_participant.gender}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-bold py-2">
                                                    Lembaga
                                                </td>
                                                <td className="px-10">:</td>
                                                <td>
                                                    {
                                                        _participant.client
                                                            .company_name
                                                    }
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div>
                                    {_participant.photo !== null && (
                                        <img
                                            src={_participant.photo_url}
                                            className="w-48"
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Tanggal Awal</th>
                                            <th>Tanggal Akhir</th>
                                            <th>Nama Kegiatan</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {_participant.events.map(
                                            ({ event }, index) => (
                                                <tr key={event.id}>
                                                    <td>
                                                        {formatDate(
                                                            event.start_date
                                                        )}
                                                    </td>
                                                    <td>
                                                        {formatDate(
                                                            event.end_date
                                                        )}
                                                    </td>
                                                    <td>{event.name}</td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </Card>
            </div>
        </AuthenticatedLayout>
    )
}
