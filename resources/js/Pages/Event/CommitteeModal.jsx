import React from 'react'
import { useForm } from '@inertiajs/react'
import { isEmpty } from 'lodash'

import Modal from '@/Components/DaisyUI/Modal'
import Button from '@/Components/DaisyUI/Button'
import TextInput from '@/Components/DaisyUI/TextInput'
import FormInputDate from '@/Components/DaisyUI/FormInputDate'
import SelectionInput from '@/Components/Common/SelectionInput'
import { toast } from 'sonner'

export default function CommitteModal(props) {
    const { modalState, onSave } = props
    const { data, setData, reset } = useForm({
        committe: null,
        task: null,
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
        if (isEmpty(data.committe)) {
            toast.error('panitia wajib di input')
            return false
        }
        if (isEmpty(data.task)) {
            toast.error('tugas wajib di input')
            return false
        }
        return true
    }

    return (
        <Modal
            isOpen={modalState.isOpen}
            onClose={handleClose}
            title={'Panitia'}
        >
            <div className="form-control space-y-2.5">
                <SelectionInput
                    label="Panitia"
                    itemSelected={data.committe}
                    onItemSelected={(item) =>
                        setData('committe', item ? item : null)
                    }
                    placeholder="panitia"
                    data={{
                        table: 'committes',
                        display_name: 'name',
                        orderby: 'name.asc',
                    }}
                />
                <SelectionInput
                    label="Tugas"
                    itemSelected={data.task}
                    onItemSelected={(item) =>
                        setData('task', item ? item : null)
                    }
                    placeholder="tugas"
                    data={{
                        table: 'committe_tasks',
                        display_name: 'name',
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
