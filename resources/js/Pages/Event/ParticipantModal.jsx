import React from 'react'
import { useForm } from '@inertiajs/react'
import { isEmpty } from 'lodash'

import Modal from '@/Components/DaisyUI/Modal'
import Button from '@/Components/DaisyUI/Button'
import TextInput from '@/Components/DaisyUI/TextInput'
import FormInputDate from '@/Components/DaisyUI/FormInputDate'
import SelectionInput from '@/Components/Common/SelectionInput'
import { toast } from 'sonner'

export default function ParticipantModal(props) {
    const { modalState, onSave } = props
    const { data, setData, reset } = useForm({
        participant: null,
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
    }

    const handleClose = () => {
        handleReset()
        modalState.toggle()
    }

    const handleSubmit = () => {
        if (!validate()) {
            return
        }
        onSave(data)
        handleClose()
    }

    const validate = () => {
        if (isEmpty(data.participant)) {
            toast.error('peserta wajib di input')
            return false
        }
        return true
    }

    return (
        <Modal
            isOpen={modalState.isOpen}
            onClose={handleClose}
            title={'Peserta'}
        >
            <div className="form-control space-y-2.5">
                <SelectionInput
                    label="Peserta"
                    itemSelected={data.participant}
                    onItemSelected={(item) =>
                        setData('participant', item ? item : null)
                    }
                    placeholder="peserta"
                    data={{
                        table: 'participants',
                        display_name: 'code.name.phone.address.email.city.dob',
                        orderby: 'name.asc',
                    }}
                />
                <div className="flex items-center space-x-2 mt-4">
                    <Button onClick={handleSubmit} type="primary">
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
