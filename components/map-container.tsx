import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Point } from "pigeon-maps"

import MapControls from './map-controls'
import Credentials from './credentials'

import { Position, FeatureType, OptionType } from 'types'

import { turnPositionToPoint } from 'helpers/position'
import { options } from 'helpers/constants'
import { fetchData, getApiUrlBy } from 'helpers/api'

const Map = dynamic(() => import('components/map'), { ssr: false })

const MapLoader: React.FC = () => {
  const [type, setType] = useState<OptionType | "">("")
  const [error, setError] = useState("")
  const [position, setPosition] = useState<Position>()
  const [features, setFeatures] = useState<Array<FeatureType>>([])
  const [validatedPostcode, setValidatedPostcode] = useState("")

  useEffect(() => {
    setError("")

    if (type) {
      const apiUrl = getApiUrlBy(options[type], validatedPostcode)

      fetchData(apiUrl, { onReject: setError, onResolve: setFeatures })
    } else if (validatedPostcode) {
      setError("Stellen Sie bitte den Recyclingtyp ein")
    } else {
      setFeatures([])
    }
  }, [type, validatedPostcode])

  const currentUserPosition: Point | undefined = position ? turnPositionToPoint(position) : undefined

  return (
    <div>
      <Map
        features={features}
        currentUserPosition={currentUserPosition}
        type={type}
      />

      <div className="pb-3 px-6 md:px-24">
        <div className="flex md:flex-row flex-col justify-between grow">
          <MapControls
            setPosition={setPosition}
            setValidatedPostcode={setValidatedPostcode}
            setError={setError}
            defaultType={type}
            setType={setType}
            error={error}
            type={type}
          />
        </div>

        <div className="mt-5">
          <Credentials />
        </div>
      </div>
    </div>
  )
}

export default MapLoader
