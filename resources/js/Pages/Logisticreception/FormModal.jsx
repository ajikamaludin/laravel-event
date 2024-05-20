import React, { useEffect } from 'react'
import { useForm } from '@inertiajs/react'
import { isEmpty } from 'lodash'

import Modal from '@/Components/DaisyUI/Modal'
import Button from '@/Components/DaisyUI/Button'
import TextInput from '@/Components/DaisyUI/TextInput'
import SelectionInput from '@/Components/Common/SelectionInput'
import FormInputDate from '@/Components/DaisyUI/FormInputDate'

export default function FormModal(props) {
    const { modalState } = props
    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm({
            logistic_id: null,
            commite_id: null,
            rdate: '',
            qty: '',
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
        const logisticreception = modalState.data
        if (logisticreception !== null) {
            put(route('logisticreceptions.update', logisticreception), {
                onSuccess: () => handleClose(),
            })
            return
        }
        post(route('logisticreceptions.store'), {
            onSuccess: () => handleClose(),
        })
    }

    useEffect(() => {
        const logisticreception = modalState.data
        if (isEmpty(logisticreception) === false) {
            setData({
                logistic_id: logisticreception.logistic_id,
                commite_id: logisticreception.commite_id,
                rdate: logisticreception.rdate,
                qty: logisticreception.qty,
            })
            return
        }
    }, [modalState])

    return (
        <Modal
            isOpen={modalState.isOpen}
            onClose={handleClose}
            title={'Kegiatan Logistik'}
        >
            <div className="form-control space-y-2.5">
                <SelectionInput
                    label="Jenis"
                    itemSelected={data.logistic_id}
                    onItemSelected={(item) =>
                        setData('logistic_id', item ? item.id : null)
                    }
                    error={errors.logistic_id}
                    placeholder="jenis"
                    data={{
                        table: 'logistics',
                        display_name: 'name',
                        orderby: 'name.asc',
                    }}
                />
                <SelectionInput
                    label="Panitia"
                    itemSelected={data.commite_id}
                    onItemSelected={(item) =>
                        setData('commite_id', item ? item.id : null)
                    }
                    error={errors.commite_id}
                    placeholder="panitia"
                    data={{
                        table: 'committes',
                        display_name: 'name',
                        orderby: 'name.asc',
                    }}
                />
                <FormInputDate
                    value={data.rdate}
                    onChange={(d) => setData('rdate', d['startDate'])}
                    label="Tanggal"
                    error={errors.rdate}
                />
                <TextInput
                    name="qty"
                    value={data.qty}
                    onChange={handleOnChange}
                    label="Jumlah"
                    error={errors.qty}
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
