import React, { useEffect } from 'react'
import { useForm } from '@inertiajs/react'
import { isEmpty } from 'lodash'

import Modal from '@/Components/DaisyUI/Modal'
import Button from '@/Components/DaisyUI/Button'
import TextInput from '@/Components/DaisyUI/TextInput'

export default function FormModal(props) {
    const { modalState } = props
    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm({
            income: '',
            expense: '',
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
        const eventfinances = modalState.data
        if (eventfinances !== null) {
            put(route('eventfinances.update', eventfinances.event_id), {
                onSuccess: () => handleClose(),
            })
            return
        }
    }

    useEffect(() => {
        const committetask = modalState.data
        if (isEmpty(committetask) === false) {
            setData({
                income: committetask.income,
                expense: committetask.expense,
            })
            return
        }
    }, [modalState])

    return (
        <Modal
            isOpen={modalState.isOpen}
            onClose={handleClose}
            title={'Keuangan Event'}
        >
            <div className="form-control space-y-2.5">
                <TextInput
                    name="expense"
                    value={data.expense}
                    onChange={handleOnChange}
                    label="Pengeluaran"
                    error={errors.expense}
                />
                <TextInput
                    name="income"
                    value={data.income}
                    onChange={handleOnChange}
                    label="Pendapatan"
                    error={errors.income}
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
