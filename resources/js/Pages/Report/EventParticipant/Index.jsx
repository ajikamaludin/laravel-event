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
import SelectionInput from '@/Components/Common/SelectionInput'

export default function Index(props) {
    const {
        data: { links, data },
        _start_date,
        _end_date,
    } = props

    const [event, setEvent] = useState(null)
    const [client, setClient] = useState(null)
    const [dates, setDates] = useState({
        startDate: _start_date,
        endDate: _end_date,
    })
    const [search, setSearch] = useState('')
    const preValue = usePrevious(`${search}${dates}${event}${client}`)

    const params = { q: search, event, client, ...dates }
    useEffect(() => {
        if (preValue) {
            router.get(
                route(route().current()),
                { q: search, event, client, ...dates },
                {
                    replace: true,
                    preserveState: true,
                }
            )
        }
    }, [search, event, client, dates])

    return (
        <AuthenticatedLayout page={'Report'} action={'Buku Peserta'}>
            <Head title="Report" />

            <div>
                <Card>
                    <div className="flex flex-col md:flex-row gap-1 justify-between mb-4 items-end md:items-center">
                        <SearchInput
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                        />
                        <div className="w-full">
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
                        </div>
                        <div className="w-full">
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
                        </div>
                        <div className="w-full">
                            <FormInputDateRanger
                                value={dates}
                                onChange={(d) => setDates(d)}
                            />
                        </div>
                        <a
                            className="btn btn-secondary"
                            href={route(
                                'report.book-participant.print',
                                params
                            )}
                            target="_blank"
                        >
                            Print
                        </a>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nama</th>
                                    <th>Jenis Kelamin</th>
                                    <th>No.Telp</th>
                                    <th>Alamat</th>
                                    <th>Kota</th>
                                    <th>Email</th>
                                    <th>Tanggal Lahir</th>
                                    <th>Foto</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{item.participant.code}</td>
                                        <td>{item.participant.name}</td>
                                        <td>{item.participant.gender}</td>
                                        <td>{item.participant.phone}</td>
                                        <td>{item.participant.address}</td>
                                        <td>{item.participant.city}</td>
                                        <td>{item.participant.email}</td>
                                        <td>
                                            {item.participant.dob &&
                                                formatDate(
                                                    item.participant.dob
                                                )}
                                        </td>
                                        <td>
                                            {item.participant.photo !==
                                                null && (
                                                <img
                                                    src={
                                                        item.participant
                                                            .photo_url
                                                    }
                                                    className="w-24"
                                                />
                                            )}
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
