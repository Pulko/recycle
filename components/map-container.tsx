import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Point } from "pigeon-maps"

import MapControls from './map-controls'
import Credentials from './credentials'

import { Position, FeatureType, OptionType } from 'types'

import { turnPositionToPoint } from 'helpers/position'
import { defaultError, options } from 'helpers/constants'
import { getApiUrl } from 'helpers/api'

const Map = dynamic(() => import('components/map'), {
  ssr: false
})

const MapLoader: React.FC = () => {
  const [type, setType] = useState<OptionType | "">("")
  const [error, setError] = useState("")
  const [position, setPosition] = useState<Position>()
  const [features, setFeatures] = useState<Array<FeatureType>>([])

  useEffect(() => {
    if (type) {
      const apiUrl = getApiUrl(options[type])

      fetch(apiUrl)
        .then(res => res.json())
        .then(data => setFeatures(data.features))
        .catch((error) => setError(error || defaultError))
    } else {
      setFeatures([])
    }
  }, [type])

  const currentUserPosition: Point | undefined = position ? turnPositionToPoint(position) : undefined

  return (
    <div>
      <Map
        features={features}
        currentUserPosition={currentUserPosition}
      />

      <div className="pb-3 px-6 md:px-24">
        <div className="flex md:flex-row flex-col justify-between grow">
          <MapControls
            setPosition={setPosition}
            defaultType={type}
            setType={setType}
            error={error}
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
