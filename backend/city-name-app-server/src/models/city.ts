export interface City {
  [key: string]: CityDetails
}

export interface CityDetails {
  name: string
  display_name: string
  address: Address
  osm_type: string
  osm_id: number
  type: string
  location: number[]
  bbox: number[]
}

export interface Address {
  hamlet: string
  village: string
  province: string
  state: string
  "ISO3166-2-lvl4": string
  postcode: string
  country: string
  country_code: string
}