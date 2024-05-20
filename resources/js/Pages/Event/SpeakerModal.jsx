import React from 'react'
import { useForm } from '@inertiajs/react'
import { isEmpty } from 'lodash'

import Modal from '@/Components/DaisyUI/Modal'
import Button from '@/Components/DaisyUI/Button'
import TextInput from '@/Components/DaisyUI/TextInput'
import FormInputDate from '@/Components/DaisyUI/FormInputDate'
import SelectionInput from '@/Components/Common/SelectionInput'
import { toast } from 'sonner'

export default function SpeakerModal(props) {
    const { modalState, onSave } = props
    const { data, setData, reset } = useForm({
        title: '',
        sdate: null,
        speaker: null,
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
        if (isEmpty(data.speaker)) {
            toast.error('pemateri wajib di input')
            return false
        }
        return true
    }

    return (
        <Modal
            isOpen={modalState.isOpen}
            onClose={handleClose}
            title={'Pemateri'}
        >
            <div className="form-control space-y-2.5">
                <FormInputDate
                    value={data.sdate}
                    onChange={(d) => setData('sdate', d['startDate'])}
                    label="Tanggal"
                />
                <SelectionInput
                    label="Pemateri"
                    itemSelected={data.speaker}
                    onItemSelected={(item) =>
                        setData('speaker', item ? item : null)
                    }
                    placeholder="pemateri"
                    data={{
                        table: 'speakers',
                        display_name: 'name',
                        orderby: 'name.asc',
                    }}
                />
                <TextInput
                    name="title"
                    value={data.title}
                    onChange={handleOnChange}
                    label="Judul"
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
