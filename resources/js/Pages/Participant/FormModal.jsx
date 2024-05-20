import React, { useEffect } from 'react'
import { useForm, usePage } from '@inertiajs/react'
import { isEmpty } from 'lodash'

import Modal from '@/Components/DaisyUI/Modal'
import Button from '@/Components/DaisyUI/Button'
import TextInput from '@/Components/DaisyUI/TextInput'
import FormInputDate from '@/Components/DaisyUI/FormInputDate'
import { Option, Select } from '@/Components/DaisyUI/SelectInput'
import FormFile from '@/Components/DaisyUI/FormFile'
import { converToDate, formatDate } from '@/utils'

export default function FormModal(props) {
    const {
        props: { clients },
    } = usePage()
    const { modalState } = props
    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm({
            name: '',
            phone: '',
            address: '',
            email: '',
            photo: '',
            gender: '',
            city: '',
            dob: '',
            client_id: '',
            photo_url: null,
        })

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === 'checkbox'
                ? event.target.checked
                    ? 1
                    : 0
                : event.target.value
        )
    }

    const handleReset = () => {
        modalState.setData(null)
        reset()
        clearErrors()
    }

    const handleClose = () => {
        handleReset()
        modalState.toggle()
    }

    const handleSubmit = () => {
        const participant = modalState.data
        if (participant !== null) {
            put(route('participants.update', participant), {
                onSuccess: () => handleClose(),
            })
            return
        }
        post(route('participants.store'), {
            onSuccess: () => handleClose(),
        })
    }

    useEffect(() => {
        const participant = modalState.data
        if (isEmpty(participant) === false) {
            setData({
                name: participant.name,
                phone: participant.phone,
                address: participant.address,
                email: participant.email,
                photo: participant.photo,
                gender: participant.gender,
                city: participant.city,
                dob: participant.dob,
                client_id: participant.client_id,
                photo_url: participant.photo_url,
            })
            return
        }
    }, [modalState])

    return (
        <Modal
            isOpen={modalState.isOpen}
            onClose={handleClose}
            title={'Peserta'}
        >
            <div className="form-control space-y-2.5">
                <TextInput
                    name="name"
                    value={data.name}
                    onChange={handleOnChange}
                    label="Nama"
                    error={errors.name}
                />
                <TextInput
                    name="phone"
                    value={data.phone}
                    onChange={handleOnChange}
                    label="No.Telp"
                    error={errors.phone}
                />
                <TextInput
                    name="address"
                    value={data.address}
                    onChange={handleOnChange}
                    label="Alamat"
                    error={errors.address}
                />
                <TextInput
                    name="email"
                    value={data.email}
                    onChange={handleOnChange}
                    label="Email"
                    error={errors.email}
                />
                <TextInput
                    name="city"
                    value={data.city}
                    onChange={handleOnChange}
                    label="Kota"
                    error={errors.city}
                />
                <FormFile
                    label={'Photo'}
                    onChange={(file_path) => setData('photo', file_path)}
                    error={errors.photo}
                    url={data.photo_url}
                    download_name={data.photo}
                    filemimes="image/jpg,image/jpeg,image/png"
                />
                <Select
                    value={data.gender}
                    onChange={handleOnChange}
                    name="gender"
                    label="Jenis Kelamin"
                >
                    <Option value={''}></Option>
                    {['Laki-laki', 'Perempuan'].map((c) => (
                        <Option value={c} key={c}>
                            {c}
                        </Option>
                    ))}
                </Select>
                <FormInputDate
                    value={data.dob}
                    onChange={(d) => setData('dob', d['startDate'])}
                    label="Tanggal Lahir"
                />
                <Select
                    value={data.client_id}
                    onChange={handleOnChange}
                    name="client_id"
                    label="Klien"
                    error={errors.client_id}
                >
                    <Option value={''}></Option>
                    {clients.map((c) => (
                        <Option value={c.id} key={c.id}>
                            {c.company_name}
                        </Option>
                    ))}
                </Select>

                <div className="flex items-center space-x-2 mt-4">
                    <Button
                        onClick={handleSubmit}
                        processing={processing}
                        type="primary"
                    >
                        Simpan
                    </Button>
                    <Button onClick={handleClose} type="secondary">
                        Batal
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
