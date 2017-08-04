import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';
import * as fmt from 'simple-fmt';

@Injectable()
export class RoomService {

  private baseUrl: string = "http://localhost:3000";
  private roomStatus: string = this.baseUrl + '/{0}/status';
  private rooms: string = this.baseUrl + '/{0}/rooms';
  private bookUrl: string = this.baseUrl + '/book';
  private endMeetingUrl: string = this.baseUrl + '/end-quick-book-meeting';

  constructor(private http: Http) {
  }

  getRoomStatus(room) {
    return this.http.get(fmt.fmt(this.roomStatus, room)).map(response => response.json());
  }

  getRooms(office) {
    return this.http.get(fmt.fmt(this.rooms, office.toString())).map(response => response.json());
  }

  book(room: string, duration: number, empId: number) {
    return this.http.post(this.bookUrl, {
      employeeId: empId,
      room: room,
      duration: duration
    })
  }

  endMeeting(eventId) {
    return this.http.post(this.endMeetingUrl, {
      eventId: eventId
    })
  }
}
