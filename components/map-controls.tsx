import React from 'react'

import { OptionType, Position } from 'types'

import { hamburgPostcodes, options } from 'helpers/constants'

type OptionTypeSelect = OptionType | ""

type MapControlsProps = {
  setValidatedPostcode: (postcode: string) => void
  setPosition: (position: Position) => void
  setError: (error: string) => void
  setType: (type: OptionTypeSelect) => void
  defaultType: OptionTypeSelect
  type: OptionTypeSelect
  error: string
}

const MapControls: React.FC<MapControlsProps> = (props) => {
  const {
    setValidatedPostcode,
    setPosition,
    setError,
    setType,
    error,
    type,
    defaultType,
  } = props

  const [postcode, setPostcode] = React.useState("")

  const checkGeoPosition = () => {
    navigator.geolocation.getCurrentPosition((position: Position) => {
      setPosition(position)
    });
  }

  const searchByPostcode = () => {
    setValidatedPostcode(postcode)
  }

  const onPostcodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value

    setError("")
    setPostcode(value)

    if (!value) {
      setValidatedPostcode("")
    }
  }

  return (
    <>
      <div className="lg:whitespace-nowrap flex flex-col lg:block">
        <label htmlFor="recycle" className="text-emerald-200 mr-2">
          {"Recycling-Typ/PLZ"}
        </label>

        <select
          name="recycle"
          id="recycle"
          defaultValue={defaultType}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value as OptionTypeSelect)}
          value={type}
          className="rounded px-4 py-2 h-full mt-2 lg:mt-0"
        >
          {Object.keys(options).map(name => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
          <option value="">-</option>
        </select>

        <select
          onChange={onPostcodeChange}
          className="px-4 py-2 text-white h-full rounded lg:ml-1 mt-2 lg:mt-0"
          value={postcode}
          defaultValue=""
          placeholder="PLZ einstellen"
        >
          {hamburgPostcodes.map(postcode => (
            <option key={postcode} value={postcode}>
              {postcode}
            </option>
          ))}
          <option key="none" value="">-</option>
        </select>

        {(postcode || type) && (
          <button
            onClick={() => {
              setPostcode("")
              setValidatedPostcode("")
              setType("")
            }}
            className="text-emerald-200 ml-1"
          >
            {"Abbrechen"}
          </button>
        )}
      </div>

      {error && (
        <div className="text-red-500 inline-flex md:w-1/2 whitespace-nowrap overflow-hidden mt-6 md:mt-0 items-center lg:ml-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>

          <p className="ml-1 text-ellipsis ">
            {error}
          </p>
        </div>
      )}

      <div className="whitespace-nowrap mt-4 md:mt-0">
        <button
          onClick={postcode ? searchByPostcode : checkGeoPosition}
          className="px-4 py-2 bg-emerald-900 text-white rounded"
        >
          {postcode ? "Suche nach PLZ" : "Standort teilen"}
        </button>
      </div>
    </>
  )
}

export default MapControls
