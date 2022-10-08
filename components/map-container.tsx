import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Point } from "pigeon-maps"

import { Position, FeatureType } from 'types'

import { turnPositionToPoint, turnPointToPosition } from 'helpers/position'
import { defaultCenter, options } from 'helpers/constants'
import { getApiUrl } from 'helpers/api'

const Map = dynamic(() => import('components/map'), {
  ssr: false
})

const MapLoader: React.FC = () => {
  const [type, setType] = useState("paper")
  const [position, setPosition] = useState<Position>(() => turnPointToPosition(defaultCenter))
  const [features, setFeatures] = useState<Array<FeatureType>>([])
  const [error, setError] = useState("")

  useEffect(() => {
    if (type) {
      const apiUrl = getApiUrl(options[type])

      fetch(apiUrl)
        .then(res => res.json())
        .then(data => setFeatures(data.features))
        .catch((error) => setError(error || "Laden der Daten nicht möglich"))
    }
  }, [type])

  const checkGeoPosition = () => {
    navigator.geolocation.getCurrentPosition((position: Position) => {
      setPosition(position)
    });
  }

  const currentUserPosition: Point = turnPositionToPoint(position)

  return (
    <div>
      <Map
        features={features}
        center={currentUserPosition}
        currentUserPosition={currentUserPosition}
      />

      <div className="p-6">
        <label htmlFor="recycle">Recyclingprodukten:</label>

        <select
          name="recycle"
          id="recycle"
          defaultValue="glas"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value)}
        >
          {Object.keys(options).map(name => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>

        <button onClick={checkGeoPosition}>
          Aktueller Standort
        </button>

        <div>
          {error}
        </div>
      </div>
    </div>
  )
}

export default MapLoader
