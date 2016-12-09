import { Component, EventEmitter } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap/modal-context';
import { RoomStatusService } from '../services/room-status.service';
import { EventService } from '../services/event-service.service';

export class RoomContext extends BSModalContext {
  public roomName: number;
}

@Component({
  templateUrl: './book.component.html'
})
export class BookComponent {

  public onRoomStatusChanged: EventEmitter<any> = new EventEmitter<any>();

  beforeDismiss() {
    return true;
  }

  beforeClose() {
    return true;
  }

  public duration;
  public room;
  public empId;
  public errorMessage;

  constructor(public roomStatusService: RoomStatusService, public eventService: EventService, public viewCtrl: ViewController) {
    this.room = viewCtrl.data.roomName;
    console.log(viewCtrl.data.roomName);
  }
  //
  // constructor(public dialog: DialogRef<RoomContext>, public roomStatusService: RoomStatusService, public eventService: EventService) {
  //   console.log("book is loaded");
  //   this.room = dialog.context.roomName;
  // }

  book() {
    this.roomStatusService.book(this.room, this.duration, this.empId).subscribe((room) => {
      this.eventService.onRoomStatusChanged.emit(room.json());
      this.viewCtrl.dismiss();
    }, () => {
      this.errorMessage = 'some problem in booking';
    });
  }

  cancel() {
    this.viewCtrl.dismiss();
    // this.dialog.close();
  }
}
