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
            category_id: null,
            client_id: null,
            committee_id: null,
            date: '',
            place: '',
            notes: '',
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
        const marketingactivity = modalState.data
        if (marketingactivity !== null) {
            put(route('marketingactivities.update', marketingactivity), {
                onSuccess: () => handleClose(),
            })
            return
        }
        post(route('marketingactivities.store'), {
            onSuccess: () => handleClose(),
        })
    }

    useEffect(() => {
        const marketingactivity = modalState.data
        if (isEmpty(marketingactivity) === false) {
            setData({
                category_id: marketingactivity.category_id,
                client_id: marketingactivity.client_id,
                committee_id: marketingactivity.committee_id,
                date: marketingactivity.date,
                place: marketingactivity.place,
                notes: marketingactivity.notes,
            })
            return
        }
    }, [modalState])

    return (
        <Modal
            isOpen={modalState.isOpen}
            onClose={handleClose}
            title={'Kegiatan Marketing'}
        >
            <div className="form-control space-y-2.5">
                <SelectionInput
                    label="Kategori"
                    itemSelected={data.category_id}
                    onItemSelected={(item) =>
                        setData('category_id', item ? item.id : null)
                    }
                    error={errors.category_id}
                    placeholder="kategori"
                    data={{
                        table: 'marketing_activity_categories',
                        display_name: 'name',
                        orderby: 'name.asc',
                    }}
                />
                <SelectionInput
                    label="Lembaga"
                    itemSelected={data.client_id}
                    onItemSelected={(item) =>
                        setData('client_id', item ? item.id : null)
                    }
                    error={errors.client_id}
                    placeholder="lembaga"
                    data={{
                        table: 'clients',
                        display_name: 'company_name',
                        orderby: 'company_name.asc',
                    }}
                />
                <SelectionInput
                    label="Panitia"
                    itemSelected={data.committee_id}
                    onItemSelected={(item) =>
                        setData('committee_id', item ? item.id : null)
                    }
                    error={errors.committee_id}
                    placeholder="panitia"
                    data={{
                        table: 'committes',
                        display_name: 'name',
                        orderby: 'name.asc',
                    }}
                />
                <FormInputDate
                    value={data.date}
                    onChange={(d) => setData('date', d['startDate'])}
                    label="Tanggal"
                    error={errors.date}
                />
                <TextInput
                    name="place"
                    value={data.place}
                    onChange={handleOnChange}
                    label="Tempat"
                    error={errors.place}
                />
                <TextInput
                    name="notes"
                    value={data.notes}
                    onChange={handleOnChange}
                    label="Catatan"
                    error={errors.notes}
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
