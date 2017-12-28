export class Workshop {
    name: string;
  artist: string;
  type:string;
  room:string;
  level:string;
  day:string;
  time:string;
  desc:string;
  profilePic:string;

  constructor(_name: string, _artist:string, _type:string, _room: string, 
  _level: string, _day: string, _time: string, _desc: string, _profilePic: string) {

  this.name = _name;
  this.artist = _artist;
  this.type = _type;
  this.room = _room;
  this.level = _level;
  this.day = _day;
  this.time = _time;
  this.desc = _desc;
  this.profilePic = _profilePic;
  }

}