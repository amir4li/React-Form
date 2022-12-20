import React from 'react'

function Input(props) {

    return (
        <>
        <input
            name={props.name}
            value={props.debitAmount}
            onChange={(e)=> {
                props.changeHandler(e, props.index)
            }}
            onBlur={(e)=> {
                e.target.value = props.formatAmount(Number(e.target.value))
            }}
        />
        </>
    )
}

export default Input;

