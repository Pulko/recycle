import React from 'react'
import { Map, Marker, Point } from "pigeon-maps"
import { osm } from 'pigeon-maps/providers'

import { FeatureType } from 'types'

import { controlsHeight, defaultCenter } from 'helpers/constants'

type MapboxProps = {
  features: Array<FeatureType>
  currentUserPosition: Point | undefined
}

const Mapbox: React.FC<MapboxProps> = (props) => (
  <div className="rounded p-3 mb-auto">
    <Map
      height={window.screen.availHeight - controlsHeight}
      provider={osm}
      defaultCenter={defaultCenter}
      defaultZoom={14}
      maxZoom={19}
      minZoom={14}
      center={props.currentUserPosition}
      twoFingerDrag={false}
    >
      {(props.features || []).map(feature => (
        <Marker width={50} key={feature.id} anchor={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]} />
      ))}
      {props.currentUserPosition && (
        <Marker width={50} color="#FF0000" anchor={props.currentUserPosition as Point} />
      )}
    </Map>
  </div>
)

export default Mapbox