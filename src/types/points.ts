export type Coords = {
  x: number
  y: number
	z: number
}

export type Point = {
  uid: string
  x: number
  y: number
  z: number
  hex: string
}

export type Points = Record<Point["uid"], Point>
