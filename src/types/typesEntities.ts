// --- Users ---
export type User = {
  id: string
  email: string
  is_superuser?: boolean
  username?: string | null
}

export type Users = {
  data: User[]
  count: number
}

// --- Clubs ---
export type Club = {
  id: string
  name: string
  address: string
  latitude: number
  longitude: number
}

// --- Orders ---
export type OrderStatus = "new" | "in_processing" | "in_progress" | "completed" | "cancelled"

export type Order = {
  id: string
  first_name: string
  last_name: string
  email: string
  order_date: string
  start_time: string
  end_time: string
  club_id: string
  status: OrderStatus
  club_name: string
  club_address: string
}

// --- Drones ---
export type Drone = {
  id: string
  model: string
  club_id: string
  battery_charge: number
}

// --- Cameras ---
export type Camera = {
  id: string
  model: string
  width_px: number
  height_px: number
  fps: number
  club_id: string
}

// --- Lenses ---
export type Lens = {
  id: string
  model: string
  min_focal_length: number
  max_focal_length: number
  zoom_ratio?: number | null
  club_id: string
}

// --- Routes ---
export type RoutePoint = {
  sequence_number: number
  latitude: number
  longitude: number
  altitude: number
  color: string
}

export type Route = {
  id: string
  club_id: string
  points: RoutePoint[]
}

// --- Flight Tasks ---
export type FlightTask = {
  id: string
  order: Order
  operator: User
  route: Route
  drone: Drone
  camera: Camera
  lens: Lens | null
}
