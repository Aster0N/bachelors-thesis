export type OrdersPreview = {
  date: string
  client: string
  email: string
  status: string
}

export type FlightTaskPreview = {
  id: string
  status?: string
  date: string
}

export type OrdersResponse = {
  id: string
  first_name: string
  last_name: string
  email: string
  order_date: string
  start_time: string
  end_time: string
  club_id: string
  status: string
  club_name: string
  club_address: string
}

export type FlightTasksResponse = {
  id: string
  order: {
    id: string
    first_name: string
    last_name: string
    email: string
    order_date: string
    start_time: string
    end_time: string
    club_id: string
    status: string
    club_name: string
    club_address: string
  }
  operator: unknown
  route: unknown
  drone: unknown
  camera: unknown
  lens: unknown
}
