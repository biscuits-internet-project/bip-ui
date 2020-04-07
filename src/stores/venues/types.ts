export type Venue = {
    id: number
    //Venue stuff here 
}

export type VenueState = {
    venuesById: {[key: string]: Venue},
    getVenuesStatus: String | null
}
 