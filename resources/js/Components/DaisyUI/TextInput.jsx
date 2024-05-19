import React, { forwardRef } from 'react'

const Label = ({ label }) => {
    if (!label) return null

    return <label className="label-text">{label}</label>
}

const BottomTextHelper = ({ error }) => {
    if (!error) return null

    return <p className="label-text text-red-600">{error}</p>
}

const TextInput = forwardRef((props, ref) => {
    const { label, error, ...inputProps } = props

    const defaultClassName = `input input-bordered w-full`

    const errorClassName = `input input-bordered input-error w-full`

    const className = error ? errorClassName : defaultClassName

    return (
        <div>
            <Label label={label} />
            <input
                ref={ref}
                {...inputProps}
                className={`${className} ${
                    props.className ? props.className : ''
                }`}
            />
            <BottomTextHelper error={error} />
        </div>
    )
})

export default TextInput
