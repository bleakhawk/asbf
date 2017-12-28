export class Event {
  $key?: string;
  name?: string;
  eventid?: string;
  image?: string;
  path?: string;
  city?: string;
  owner?: string;
  organizer?: string;
  hotelname?: string;
  hoteladdress1: string;
  hotelcity?: string;
  hotelstate?: string;
  hotelzip?: string;
  startdate?: Date;
  enddate?: Date;
  about?: string;
}

export class Artist {
  $key?: string;
  name?: string;
  image?: string;
  from?: string;
  about?: string;
  specialities?: string[];
  path?: string;
  imageUrl?: string;
}

export class Workshop {
  $key?: string;
  name?: string;
  artistkey?: string;
  artist?: string;
  eventkey?: string;
  event?: string;
  type?: string;
  room?: string;
  date?: string;
  time?: string;
  desc?: string;
  level?: string;
  imageUrl?: string;
  day?: string;
  datetime?: string;
  fulldate?: Date;
  timeshort?: string;
}

export class Hotel {
  $key?: string;
  name?: string;
  hotelid?: string;
  address?: string;
  city?: string;
  zip?: string;
  state?: string;
}

export class Schedule {
  $key?: string;
  name?: string;
  type?: string;
  date?: string;
  fromtime?: string;
  totime?: string;
  fromtime_short?: string;
  totime_short?: string;
  desc?: string;
  day?: string;
}

export class EventListItem {
  $key?: string;
  name?: string;
  id?: string;
  location?: string;
  dates?: string;
  img?: string;
}

export class EventImages {
  $key?: string;
  eventhotelimagename?:string;
  eventmoreimagename?:string;
  eventhotelimagepath?: string;
  eventmoreimagepath?: string;
}

export class OverallFeedback {
  $key?: string;
  favoriteWorkshop?:string;
  favoriteArtist?:string;
  favoriteShow?: string;
  suggestions?: string;
  overallrating?: string;
}