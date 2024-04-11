import React from 'react'

function TextButton(props: { text: string, onClick: React.MouseEventHandler<HTMLButtonElement>; }) {
  return (
    <button onClick={props.onClick} className='bg-transparent font-semibold text-indigo-700 underline rounded-lg px-6 py-2'>{props.text}</button>
  )
}

export default TextButton