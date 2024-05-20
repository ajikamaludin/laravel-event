import React from 'react'
import { useForm } from '@inertiajs/react'

import Modal from '@/Components/DaisyUI/Modal'
import Button from '@/Components/DaisyUI/Button'
import FormFile from '@/Components/DaisyUI/FormFile'

export default function ImportModal(props) {
    const { modalState } = props
    const { setData, post, processing, errors, reset, clearErrors } = useForm({
        file: null,
    })

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
        post(route('logisticreceptions.import'), {
            onSuccess: () => handleClose(),
        })
    }

    return (
        <Modal
            isOpen={modalState.isOpen}
            onClose={handleClose}
            title={'Kegiatan Logistik'}
        >
            <div className="form-control space-y-2.5">
                <FormFile
                    label={'File'}
                    onChange={(file_path) => setData('file', file_path)}
                    error={errors.file}
                    filemimes="text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    help={'gunakan export format file untuk import'}
                />

                <div className="flex items-center space-x-2 mt-4">
                    <Button
                        onClick={handleSubmit}
                        processing={processing}
                        type="primary"
                    >
                        Import
                    </Button>
                    <Button onClick={handleClose} type="secondary">
                        Batal
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
