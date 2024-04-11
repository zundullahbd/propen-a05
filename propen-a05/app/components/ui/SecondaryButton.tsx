import React from 'react'

function SecondaryButton(props: { text: string, onClick: React.MouseEventHandler<HTMLButtonElement>; }) {
    return (
    <button className='bg-indigo-100 border-indigo-200 font-medium text-indigo-700 rounded-lg px-6 py-2'>{props.text}</button>
  )
}

export default SecondaryButton