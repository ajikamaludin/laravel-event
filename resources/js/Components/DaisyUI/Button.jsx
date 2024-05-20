import React from 'react'
import Spinner from './Spinner'

export default function Button(props) {
    const { type } = props

    const types = {
        default: 'btn-primary',
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        error: 'btn-error',
        sm_primary: 'btn-primary btn-sm',
    }

    return (
        <button
            type="button"
            disabled={props.disabled || props.processing || false}
            onClick={props.onClick}
            className={`btn ${!type ? types.default : types[type]}`}
        >
            {props.processing ? (
                <>
                    <Spinner />
                    Loading
                </>
            ) : (
                props.children
            )}
        </button>
    )
}
