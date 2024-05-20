import React, { useEffect, useState } from 'react'
import { router, Head, Link } from '@inertiajs/react'
import { isEmpty } from 'lodash'

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import TextInput from '@/Components/DaisyUI/TextInput'
import Button from '@/Components/DaisyUI/Button'
import Card from '@/Components/DaisyUI/Card'
import SelectionInput from '@/Components/Common/SelectionInput'
import FormInputDate from '@/Components/DaisyUI/FormInputDate'
import SpeakerModal from './SpeakerModal'
import { HiXCircle } from 'react-icons/hi'
import { formatDate } from '@/utils'
import { useModalState } from '@/hooks'
import CommitteModal from './CommitteeModal'
import ParticipantModal from './ParticipantModal'
import LogisticModal from './LogisticModal'
import { Option, Select } from '@/Components/DaisyUI/SelectInput'
import FormFile from '@/Components/DaisyUI/FormFile'

export default function Form(props) {
    const { event, rstatuses, errors } = props

    const speakerModal = useModalState()
    const committeModal = useModalState()
    const participantModal = useModalState()
    const logisticModal = useModalState()

    const [processing, setProcessing] = useState(false)

    const [name, setName] = useState('')
    const [place, setPlace] = useState('')
    const [type_id, setTypeId] = useState(null)
    const [client_id, setClientId] = useState(null)
    const [start_date, setStartDate] = useState(null)
    const [end_date, setEndDate] = useState(null)

    const [speakers, setSpeakers] = useState([])
    const [committes, setCommittes] = useState([])
    const [participants, setParticipants] = useState([])
    const [logistics, setLogistics] = useState([])

    const [report_date, setReportDate] = useState(null)
    const [file_finance, setFileFinance] = useState(null)
    const [file_event, setFileEvent] = useState(null)
    const [file_finance_url, setFileFinanceUrl] = useState(null)
    const [file_event_url, setFileEventUrl] = useState(null)
    const [status, setStatus] = useState(0)

    const handleAddSpeaker = ({ speaker, sdate, title }) => {
        const exists = speakers.find((sp) => sp.speaker.id === speaker.id)
        if (exists) {
            return
        }
        setSpeakers(
            speakers.concat({
                speaker,
                sdate,
                title,
            })
        )
    }

    const handleRemoveSpeaker = (index) => {
        setSpeakers(speakers.filter((_, i) => i !== index))
    }

    const handleAddCommitte = (committe) => {
        const exists = committes.find((sp) => sp.committe.id === committe.id)
        if (exists) {
            return
        }
        setCommittes(committes.concat(committe))
    }

    const handleRemoveCommitte = (index) => {
        setCommittes(committes.filter((_, i) => i !== index))
    }

    const handleAddParticipant = (participant) => {
        const exists = participants.find(
            (sp) => sp.participant.id === participant.participant.id
        )
        if (exists) {
            return
        }
        setParticipants(participants.concat(participant))
    }

    const handleRemoveParticipant = (index) => {
        setParticipants(participants.filter((_, i) => i !== index))
    }

    const handleAddLogistic = (logistic) => {
        const exists = logistics.find(
            (sp) => sp.logistic.id === logistic.logistic.id
        )
        if (exists) {
            return
        }
        setLogistics(logistics.concat(logistic))
    }

    const handleRemoveLogistic = (index) => {
        setLogistics(logistics.filter((_, i) => i !== index))
    }

    const handleSubmit = () => {
        const payload = {
            name,
            place,
            type_id,
            client_id,
            start_date,
            end_date,
            speakers,
            committes,
            participants,
            logistics,
            report_date,
            file_finance,
            file_event,
            status,
        }
        if (isEmpty(event) === false) {
            router.put(route('events.update', event), payload, {
                onStart: () => setProcessing(true),
                onFinish: (e) => {
                    setProcessing(false)
                },
            })
            return
        }
        router.post(route('events.store'), payload, {
            onStart: () => setProcessing(true),
            onFinish: (e) => {
                setProcessing(false)
            },
        })
    }

    useEffect(() => {
        if (!isEmpty(event)) {
            setName(event.name)
            setPlace(event.place)
            setTypeId(event.type_id)
            setClientId(event.client_id)
            setStartDate(event.start_date)
            setEndDate(event.end_date)
            setSpeakers(event.speakers)
            setCommittes(event.committes)
            setParticipants(event.participants)
            setLogistics(event.logistics)
            setReportDate(event.report.rdate)
            setFileFinance(event.report.file_finance)
            setFileEvent(event.report.file_event)
            setFileFinanceUrl(event.report.file_finance_url)
            setFileEventUrl(event.report.file_event_url)
            setStatus(event.report.status)
        }
    }, [event])

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            flash={props.flash}
            page={'Data Even'}
            action={''}
        >
            <Head title="Data Even" />

            <div>
                <div className="flex flex-col gap-1">
                    <Card>
                        <div className="flex flex-col gap-2 justify-between">
                            <SelectionInput
                                label="Jenis"
                                itemSelected={type_id}
                                onItemSelected={(item) =>
                                    setTypeId(item ? item.id : null)
                                }
                                error={errors.type_id}
                                placeholder="jenis"
                                data={{
                                    table: 'event_types',
                                    display_name: 'name',
                                    orderby: 'name.asc',
                                }}
                            />
                            <SelectionInput
                                label="Lembaga"
                                itemSelected={client_id}
                                onItemSelected={(item) =>
                                    setClientId(item ? item.id : null)
                                }
                                error={errors.client_id}
                                placeholder="lembaga"
                                data={{
                                    table: 'clients',
                                    display_name: 'company_name',
                                    orderby: 'company_name.asc',
                                }}
                            />
                            <FormInputDate
                                value={start_date}
                                onChange={(d) => setStartDate(d['startDate'])}
                                label="Tanggal Awal"
                                error={errors.start_date}
                            />
                            <FormInputDate
                                value={end_date}
                                onChange={(d) => setEndDate(d['startDate'])}
                                label="Tanggal Akhir"
                                error={errors.end_date}
                            />
                            <TextInput
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                label="Nama"
                                error={errors.name}
                            />
                            <TextInput
                                name="place"
                                value={place}
                                onChange={(e) => setPlace(e.target.value)}
                                label="Tempat"
                                error={errors.place}
                            />
                        </div>
                    </Card>
                    <Card>
                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Pemateri</th>
                                        <th>Materi</th>
                                        <th>Tanggal</th>
                                        <th />
                                    </tr>
                                </thead>
                                <tbody>
                                    {speakers.map((sp, index) => (
                                        <tr key={index} data={sp}>
                                            <td>{sp.speaker?.name}</td>
                                            <td>{sp.title}</td>
                                            <td>{formatDate(sp.sdate)}</td>
                                            <td>
                                                <HiXCircle
                                                    className="text-red-600 h-5 w-5"
                                                    onClick={() =>
                                                        handleRemoveSpeaker(
                                                            index
                                                        )
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <Button
                                type="sm_primary"
                                onClick={speakerModal.toggle}
                            >
                                Tambah
                            </Button>
                        </div>
                    </Card>
                    <Card>
                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Panitia</th>
                                        <th>Tugas</th>
                                        <th />
                                    </tr>
                                </thead>
                                <tbody>
                                    {committes.map((committe, index) => (
                                        <tr key={index} data={committe}>
                                            <td>{committe.committe.name}</td>
                                            <td>{committe.task.name}</td>
                                            <td>
                                                <HiXCircle
                                                    className="text-red-600 h-5 w-5"
                                                    onClick={() =>
                                                        handleRemoveCommitte(
                                                            index
                                                        )
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <Button
                                type="sm_primary"
                                onClick={committeModal.toggle}
                            >
                                Tambah
                            </Button>
                        </div>
                    </Card>
                    <Card>
                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Peserta</th>
                                        <th />
                                    </tr>
                                </thead>
                                <tbody>
                                    {participants.map((participant, index) => (
                                        <tr key={index}>
                                            <td>
                                                {participant.participant.name}
                                            </td>
                                            <td>
                                                <HiXCircle
                                                    className="text-red-600 h-5 w-5"
                                                    onClick={() =>
                                                        handleRemoveParticipant(
                                                            index
                                                        )
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <Button
                                type="sm_primary"
                                onClick={participantModal.toggle}
                            >
                                Tambah
                            </Button>
                        </div>
                    </Card>
                    <Card>
                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Jenis</th>
                                        <th>Jumlah digunakan</th>
                                        <th />
                                    </tr>
                                </thead>
                                <tbody>
                                    {logistics.map((logistic, index) => (
                                        <tr key={index} data={logistic}>
                                            <td>{logistic.logistic.name}</td>
                                            <td>{logistic.qty_used}</td>
                                            <td>
                                                <HiXCircle
                                                    className="text-red-600 h-5 w-5"
                                                    onClick={() =>
                                                        handleRemoveLogistic(
                                                            index
                                                        )
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <Button
                                type="sm_primary"
                                onClick={logisticModal.toggle}
                            >
                                Tambah
                            </Button>
                        </div>
                    </Card>
                    <Card>
                        <FormInputDate
                            value={report_date}
                            onChange={(d) => setReportDate(d['startDate'])}
                            label="Tanggal Laporan"
                            error={errors.report_date}
                        />
                        <FormFile
                            label={'Laporan Keuangan'}
                            onChange={(file_path) => setFileFinance(file_path)}
                            error={errors.file_finance}
                            url={file_finance_url}
                        />
                        <FormFile
                            label={'Laporan Even'}
                            onChange={(file_path) => setFileEvent(file_path)}
                            error={errors.file_event}
                            url={file_event_url}
                        />
                        <Select
                            label="Status Laporan"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            {rstatuses.map((status) => (
                                <Option value={status.id} key={status.id}>
                                    {status.name}
                                </Option>
                            ))}
                        </Select>
                    </Card>
                    <Card>
                        <div className="flex items-center">
                            <div className="flex space-x-2">
                                <Button
                                    onClick={handleSubmit}
                                    processing={processing}
                                    type="primary"
                                >
                                    Simpan
                                </Button>
                                <Link href={route('events.index')}>
                                    <Button type="secondary">Kembali</Button>
                                </Link>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
            <SpeakerModal modalState={speakerModal} onSave={handleAddSpeaker} />
            <CommitteModal
                modalState={committeModal}
                onSave={handleAddCommitte}
            />
            <ParticipantModal
                modalState={participantModal}
                onSave={handleAddParticipant}
            />
            <LogisticModal
                modalState={logisticModal}
                onSave={handleAddLogistic}
            />
        </AuthenticatedLayout>
    )
}
