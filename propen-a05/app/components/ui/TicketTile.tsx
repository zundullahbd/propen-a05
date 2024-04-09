import React from 'react'

interface TicketTileProps {
  header: String;
  children: React.ReactNode;
}

const TicketTile = ({header, children}: TicketTileProps) => {
  return (
    <div className='bg-white rounded-lg py-7 px-8 space-y-6 w-full'>
      <h1 className='font-semibold text-[#344054]'>{header}</h1>
      {children}
    </div>
  )
}

export default TicketTile