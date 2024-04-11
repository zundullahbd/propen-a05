import React from 'react'

function GrayButton(props: { text: string, onClick: React.MouseEventHandler<HTMLButtonElement>; }) {
  return (
    <button onClick={props.onClick} className='bg-gray-100 border-gray-300 text-gray-700 rounded-lg px-6 py-2'>{props.text}</button>
  )
}

export default GrayButton