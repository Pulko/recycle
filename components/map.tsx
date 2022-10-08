import React from 'react'
import { Map, Marker, Point } from "pigeon-maps"
import { stamenToner } from 'pigeon-maps/providers'
import { FeatureType } from 'types'


type MapboxProps = {
  features: Array<FeatureType>
  center: Point
  currentUserPosition: Point
}

const Mapbox: React.FC<MapboxProps> = (props) => (
  <Map
    height={window.screen.availHeight * 4/5}
    provider={stamenToner}
    defaultCenter={props.currentUserPosition}
    defaultZoom={14}
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
)

export default Mapbox