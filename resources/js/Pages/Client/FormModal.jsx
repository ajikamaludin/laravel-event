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
            company_category: '',
            company_name: '',
            company_address: '',
            company_logo: '',
            company_phone: '',
            pic_name: '',
            pic_phone: '',
            company_logo_url: null,
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
        const client = modalState.data
        if (client !== null) {
            put(route('clients.update', client), {
                onSuccess: () => handleClose(),
            })
            return
        }
        post(route('clients.store'), {
            onSuccess: () => handleClose(),
        })
    }

    useEffect(() => {
        const client = modalState.data
        if (isEmpty(client) === false) {
            setData({
                company_category: client.company_category,
                company_name: client.company_name,
                company_address: client.company_address,
                company_logo: client.company_logo,
                company_phone: client.company_phone,
                pic_name: client.pic_name,
                pic_phone: client.pic_phone,
                company_logo_url: client.company_logo_url,
            })
            return
        }
    }, [modalState])

    return (
        <Modal
            isOpen={modalState.isOpen}
            onClose={handleClose}
            title={'Lembaga'}
        >
            <div className="form-control space-y-2.5">
                <TextInput
                    name="company_category"
                    value={data.company_category}
                    onChange={handleOnChange}
                    label="Kategori"
                    error={errors.company_category}
                />
                <TextInput
                    name="company_name"
                    value={data.company_name}
                    onChange={handleOnChange}
                    label="Nama Lembaga"
                    error={errors.company_name}
                />
                <TextInput
                    name="company_address"
                    value={data.company_address}
                    onChange={handleOnChange}
                    label="Alamat Lembaga"
                    error={errors.company_address}
                />
                <TextInput
                    name="company_phone"
                    value={data.company_phone}
                    onChange={handleOnChange}
                    label="No.Telp Lembaga"
                    error={errors.company_phone}
                />
                <FormFile
                    label={'Logo Lembaga'}
                    onChange={(file_path) => setData('company_logo', file_path)}
                    error={errors.company_logo}
                    url={data.company_logo_url}
                    download_name={data.company_logo}
                    filemimes="image/jpg,image/jpeg,image/png"
                />
                <TextInput
                    name="pic_name"
                    value={data.pic_name}
                    onChange={handleOnChange}
                    label="Nama Contact Person"
                    error={errors.pic_name}
                />
                <TextInput
                    name="pic_phone"
                    value={data.pic_phone}
                    onChange={handleOnChange}
                    label="No. Telp Contact Person"
                    error={errors.pic_phone}
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
