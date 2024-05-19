import React, { useEffect } from 'react'
import { useForm } from '@inertiajs/react'
import { isEmpty } from 'lodash'

import Modal from '@/Components/DaisyUI/Modal'
import Button from '@/Components/DaisyUI/Button'
import TextInput from '@/Components/DaisyUI/TextInput'
import FormFile from '@/Components/DaisyUI/FormFile'

export default function FormModal(props) {
    const { modalState } = props
    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm({
            name: '',
            phone: '',
            address: '',
            email: '',
            photo: '',
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
        const committe = modalState.data
        if (committe !== null) {
            put(route('committes.update', committe), {
                onSuccess: () => handleClose(),
            })
            return
        }
        post(route('committes.store'), {
            onSuccess: () => handleClose(),
        })
    }

    useEffect(() => {
        const committe = modalState.data
        if (isEmpty(committe) === false) {
            setData({
                name: committe.name,
                phone: committe.phone,
                address: committe.address,
                email: committe.email,
                photo: committe.photo,
                photo_url: committe.photo_url,
            })
            return
        }
    }, [modalState])
    return (
        <Modal
            isOpen={modalState.isOpen}
            onClose={handleClose}
            title={'Panitia'}
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
                    label="No. Telp"
                    error={errors.phone}
                />
                <TextInput
                    name="email"
                    value={data.email}
                    onChange={handleOnChange}
                    label="Email"
                    error={errors.email}
                />
                <TextInput
                    name="address"
                    value={data.address}
                    onChange={handleOnChange}
                    label="Alamat"
                    error={errors.address}
                />
                <FormFile
                    label={'Photo'}
                    onChange={(file_path) => setData('photo', file_path)}
                    error={errors.photo}
                    url={data.photo_url}
                    download_name={data.photo}
                    filemimes="image/jpg,image/jpeg,image/png"
                />
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
