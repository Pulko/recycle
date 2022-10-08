import { Point } from "pigeon-maps"

export type FeatureType = {
  id: string
  geometry: {
    coordinates: Point
  }
}

export type Position = {
  coords: {
    latitude: number,
    longitude: number,
  }
}