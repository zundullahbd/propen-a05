import React from 'react'

function PrimaryButton(props: { text: string, onClick: React.MouseEventHandler<HTMLButtonElement>; }) {
  return (
    <button onClick={props.onClick} className='bg-indigo-700 text-white text-bold rounded-lg px-6 py-2'>{props.text}</button>
  )
}

export default PrimaryButton