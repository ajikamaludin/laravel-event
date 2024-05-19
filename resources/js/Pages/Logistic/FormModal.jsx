import React, { useEffect } from 'react'
import { useForm, usePage } from '@inertiajs/react'
import { isEmpty } from 'lodash'

import Modal from '@/Components/DaisyUI/Modal'
import Button from '@/Components/DaisyUI/Button'
import TextInput from '@/Components/DaisyUI/TextInput'
import { Option, Select } from '@/Components/DaisyUI/SelectInput'

export default function FormModal(props) {
    const {
        props: { categories },
    } = usePage()
    const { modalState } = props
    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm({
            name: '',
            category_id: '',
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
        const logistic = modalState.data
        if (logistic !== null) {
            put(route('logistics.update', logistic), {
                onSuccess: () => handleClose(),
            })
            return
        }
        post(route('logistics.store'), {
            onSuccess: () => handleClose(),
        })
    }

    useEffect(() => {
        const logistic = modalState.data
        if (isEmpty(logistic) === false) {
            setData({
                name: logistic.name,
                category_id: logistic.category_id,
            })
            return
        }
    }, [modalState])

    return (
        <Modal
            isOpen={modalState.isOpen}
            onClose={handleClose}
            title={'Logistik'}
        >
            <div className="form-control space-y-2.5">
                <Select
                    value={data.category_id}
                    name="category_id"
                    onChange={handleOnChange}
                    label="Kategori"
                    error={errors.category_id}
                >
                    <Option value={''}></Option>
                    {categories.map((c) => (
                        <Option value={c.id} key={c.name}>
                            {c.name}
                        </Option>
                    ))}
                </Select>
                <TextInput
                    name="name"
                    value={data.name}
                    onChange={handleOnChange}
                    label="Jenis"
                    error={errors.name}
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
