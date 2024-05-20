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
        const eventtype = modalState.data
        if (eventtype !== null) {
            put(route('eventtypes.update', eventtype), {
                onSuccess: () => handleClose(),
            })
            return
        }
        post(route('eventtypes.store'), {
            onSuccess: () => handleClose(),
        })
    }

    useEffect(() => {
        const eventtype = modalState.data
        if (isEmpty(eventtype) === false) {
            setData({
                name: eventtype.name,
                category_id: eventtype.category_id,
            })
            return
        }
    }, [modalState])

    return (
        <Modal
            isOpen={modalState.isOpen}
            onClose={handleClose}
            title={'Jenis Event'}
        >
            <div className="form-control space-y-2.5">
                <TextInput
                    name="name"
                    value={data.name}
                    onChange={handleOnChange}
                    label="Jenis"
                    error={errors.name}
                />
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
