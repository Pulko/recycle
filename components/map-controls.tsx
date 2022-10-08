import React from 'react'

import { Position } from 'types'

import { options } from 'helpers/constants'

type MapControlsProps = {
  setPosition: (position: Position) => void
  setType: (type: string) => void
  defaultType: string
  error: string
}

const MapControls: React.FC<MapControlsProps> = (props) => {
  const {
    setPosition,
    setType,
    error,
    defaultType,
  } = props

  const checkGeoPosition = () => {
    navigator.geolocation.getCurrentPosition((position: Position) => {
      setPosition(position)
    });
  }

  return (
    <>
      <div className="whitespace-nowrap">
        <label htmlFor="recycle" className="text-emerald-200 mr-2">Recyclingprodukten:</label>

        <select
          name="recycle"
          id="recycle"
          defaultValue={defaultType}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value)}
          className="p-1 rounded"
        >
          {Object.keys(options).map(name => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
          <option value="">-</option>
        </select>
      </div>

      {error && (
        <div className="text-red-500 inline-flex md:w-1/2 whitespace-nowrap overflow-hidden mt-6 md:mt-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>

          <p className="ml-1 text-ellipsis ">
            {error}
          </p>
        </div>
      )}

      <button
        onClick={checkGeoPosition}
        className="whitespace-nowrap mt-8 md:mt-0 bg-emerald-900 text-white px-4 py-2 rounded"
      >
        Aktueller Standort
      </button>
    </>
  )
}

export default MapControls
