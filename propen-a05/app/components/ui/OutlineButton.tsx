import React from 'react'

function OutlineButton(props: { text: string, onClick: React.MouseEventHandler<HTMLButtonElement>;}) {
  return (
    <button onClick={props.onClick} className='bg-transparent font-medium border-indigo-700 border-2 text-semibold text-indigo-700 rounded-lg px-6 py-1.5'>{props.text}</button>
  )
}

export default OutlineButton