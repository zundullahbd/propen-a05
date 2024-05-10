import React from 'react'

function SecondaryButton(props: { text: string, onClick: React.MouseEventHandler<HTMLButtonElement>; }) {
    return (
    <button  onClick={props.onClick} className='bg-red-500 border-white-700 font-medium text-white rounded-lg px-4 py-2'>{props.text}</button>
  )
}

export default SecondaryButton