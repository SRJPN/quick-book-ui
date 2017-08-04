import { Component } from '@angular/core';
import { OfficeService } from '../services/office.service';
import { EventService } from "../services/event-service.service";
import { RoomService } from '../services/room.service';

@Component({
  templateUrl: 'home.component.html'
})
export class HomeComponent {

  public offices: Array<String> = [];
  private rooms: Array<String> = [];
  private selectedRoom;

  constructor(public officeService: OfficeService, public eventService: EventService, public roomService: RoomService) {
    this.officeService.all().subscribe(offices => this.offices = offices)
  }

  public onOfficeClicked(office) {
    this.roomService.getRooms(office).subscribe((rooms) => {
      this.rooms = rooms;
    });
  }

  public onRoomSelected(room){
    this.selectedRoom = room;
      this.eventService.onRoomChanged.emit(room);
  }

}
