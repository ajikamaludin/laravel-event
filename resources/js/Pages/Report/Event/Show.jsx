import React, { useState } from 'react'
import { router } from '@inertiajs/react'
import { Head } from '@inertiajs/react'

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'

import Card from '@/Components/DaisyUI/Card'
import { formatDate, formatIDR } from '@/utils'
import SelectionInput from '@/Components/Common/SelectionInput'
import Button from '@/Components/DaisyUI/Button'

export default function Index(props) {
    const { _event } = props

    const [event, setEvent] = useState(null)

    const handleChange = () => {
        router.get(
            route(route().current()),
            { event },
            {
                replace: true,
                preserveState: true,
            }
        )
    }

    return (
        <AuthenticatedLayout page={'Report'} action={'Detail Event'}>
            <Head title="Report" />

            <div>
                <Card>
                    <div className="flex flex-col md:flex-row gap-1 mb-4">
                        <SelectionInput
                            itemSelected={event}
                            onItemSelected={(item) =>
                                setEvent(item ? item.id : null)
                            }
                            placeholder="-- filter event --"
                            data={{
                                table: 'events',
                                display_name: 'name',
                                orderby: 'name.asc',
                            }}
                        />
                        <Button onClick={handleChange}>Tampil</Button>
                        {_event && (
                            <a
                                href={route(
                                    'report.detail-event.print',
                                    _event.id
                                )}
                                target="_blank"
                                className="btn btn-secondary"
                            >
                                Print
                            </a>
                        )}
                    </div>
                    {_event && (
                        <>
                            <div className="w-full">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="font-bold py-2">
                                                Tanggal Awal
                                            </td>
                                            <td className="px-10">:</td>
                                            <td>
                                                {formatDate(_event.start_date)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-bold py-2">
                                                Tanggal Awal
                                            </td>
                                            <td className="px-10">:</td>
                                            <td>
                                                {formatDate(_event.end_date)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-bold py-2">
                                                Nama Kegiatan
                                            </td>
                                            <td className="px-10">:</td>
                                            <td>{_event.name}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-bold py-2">
                                                Tempat
                                            </td>
                                            <td className="px-10">:</td>
                                            <td>{_event.place}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-bold py-2">
                                                Jumlah Peserta
                                            </td>
                                            <td className="px-10">:</td>
                                            <td>{_event.participant_count}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-bold py-2">
                                                Lembaga
                                            </td>
                                            <td className="px-10">:</td>
                                            <td>
                                                {_event.client.company_name}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-bold py-2">
                                                Pendapatan
                                            </td>
                                            <td className="px-10">:</td>
                                            <td>
                                                {formatIDR(
                                                    _event.finance.income
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-bold py-2">
                                                Pengeluaran
                                            </td>
                                            <td className="px-10">:</td>
                                            <td>
                                                {formatIDR(
                                                    _event.finance.expense
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-bold py-2">
                                                Laba
                                            </td>
                                            <td className="px-10">:</td>
                                            <td>
                                                {formatIDR(
                                                    _event.finance.profit
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-bold py-2">
                                                Status Laporan
                                            </td>
                                            <td className="px-10">:</td>
                                            <td>{_event.report.status_text}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="overflow-x-auto">
                                <div className="font-bold">Pemateri</div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Tanggal</th>
                                            <th>Pemateri</th>
                                            <th>Judul</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {_event.speakers.map(
                                            (
                                                { speaker, sdate, title },
                                                index
                                            ) => (
                                                <tr
                                                    key={`${speaker.id}${sdate}`}
                                                >
                                                    <td>
                                                        {sdate &&
                                                            formatDate(sdate)}
                                                    </td>
                                                    <td>{speaker.name}</td>
                                                    <td>{title}</td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="overflow-x-auto">
                                <div className="font-bold">Panitia</div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Panitia</th>
                                            <th>Tugas</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {_event.committes.map(
                                            ({ committe, task }, index) => (
                                                <tr
                                                    key={`${committe.id}${task.id}`}
                                                >
                                                    <td>{committe.name}</td>
                                                    <td>{task.name}</td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="overflow-x-auto">
                                <div className="font-bold">Fasilitas</div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Fasilitas</th>
                                            <th>Jumlah digunakan</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {_event.logistics.map(
                                            ({ logistic, qty_used }, index) => (
                                                <tr key={`${logistic.id}`}>
                                                    <td>{logistic.name}</td>
                                                    <td>{qty_used}</td>
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
