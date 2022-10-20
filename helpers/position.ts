import { Position } from "types";
import { Point } from "pigeon-maps"

export const turnPositionToPoint = (position: Position): Point => [position.coords.latitude, position.coords.longitude]

export const turnPointToPosition = (point: Point): Position => (
  { coords: { latitude: point[0], longitude: point[1] } }
)
