// export type Venue = {
//   id: number
//   //Venue stuff here
// }
export interface IVenue {
  id: string
  city?: string
  postal_code?: string
  name: string
  slug?: string
  state?: string
  phone?: string
  website?: string
  street?: string
  country?: string
  times_played?: number
  first_played_show?: any //Chage to IShow when in redux
  last_played_show?: any //Chage to IShow when in redux
}

export type VenueState = {
  venuesById: { [key: string]: IVenue }
  getVenuesStatus: String | null
}
