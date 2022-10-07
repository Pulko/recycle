import React from 'react'
import { Map, Marker, Point } from "pigeon-maps"
import { useEffect, useState } from "react"

const defaultCenter: Point = [53.549294, 9.992907]
const options: { [key: string]: string } = {
  paper: 'abfall_recycling_1_papier',
  glas: 'abfall_recycling_2_glas',
  lvp: 'abfall_recycling_3_lvp',
  textil: 'abfall_recycling_4_textil',
  elektro: 'abfall_recycling_5_elektro',
  recyhof: 'abfall_recycling_6_recyhof',
}

type FetureType = {
  id: string
  geometry: {
    coordinates: Point
  }
}

type Position = {
  coords: {
    latitude: number,
    longitude: number,
  }
}

const turnPositionToPoint = (position: Position): Point => [position.coords.latitude, position.coords.longitude]

export function MyMap() {
  const [type, setType] = useState("paper")
  const [position, setPosition] = useState<Position>({ coords: { latitude: defaultCenter[0], longitude: defaultCenter[1] } })
  const [features, setFeatures] = useState<Array<FetureType>>([])


  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position: Position) => {
      setPosition(position)
    });
  }, [])

  useEffect(() => {
    fetch(`https://api.hamburg.de/datasets/v1/abfall_recycling/collections/${options[type]}/items?limit=100&offset=0&bulk=false&f=json`)
      .then(res => res.json())
      .then(data => setFeatures(data.features))
  }, [type])

  const currentPositionPointType: Point = turnPositionToPoint(position)

  return (
    <>
      <Map
        height={400}
        defaultCenter={(position ? currentPositionPointType : defaultCenter) as Point}
        defaultZoom={14}
        center={currentPositionPointType}
      >
        {(features || []).map(feature => (
          <Marker width={50} key={feature.id} anchor={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]} />
        ))}
        {position && (
          <Marker width={50} color="#FF0000" anchor={currentPositionPointType as Point} />
        )}
      </Map>
        <label htmlFor="recycle">Choose a type:</label>

        <select
          name="recycle"
          id="recycle"
          defaultValue="glas"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value)}
        >
          {Object.keys(options).map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
    </>
  )
}