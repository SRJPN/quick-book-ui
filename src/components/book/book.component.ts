import {Component, EventEmitter} from "@angular/core";
import {ViewController} from "ionic-angular";
import {RoomStatusService} from "../services/room-status.service";
import {EventService} from "../services/event-service.service";

export class RoomContext {
  public roomName: number;
}

@Component({
  templateUrl: './book.component.html'
})
export class BookComponent {

  public onRoomStatusChanged: EventEmitter<any> = new EventEmitter<any>();

  durations = [5, 10, 15, 30];

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
  public timer;
  public errors = {};

  constructor(public roomStatusService: RoomStatusService, public eventService: EventService, public viewCtrl: ViewController) {
    this.room = viewCtrl.data.roomName;
    this.timer = viewCtrl.data.timeLeft;
    console.log(viewCtrl.data.roomName);
  }

  book() {
    this.roomStatusService.book(this.room, this.duration, this.empId).subscribe((updatedRoom) => {

      var response = updatedRoom.json();
      if (response.isValid) {
        this.eventService.onRoomStatusChanged.emit(response);
        this.viewCtrl.dismiss();
      }
      else {
        this.errors = response.errors;
      }
    }, () => {
      this.errorMessage = 'some problem in booking';
    });
  }

  isDurationSelected(duration) {
    return this.duration == duration;
  }

  setDuration(selectedDuration) {
    this.duration = selectedDuration;
  }


  disableButton() {
    return !((this.empId != null && this.empId != "") && this.duration != null);
  }

  disableDurationButton(buttonValue) {
    var secMinHrSplit = this.timer.split(':');
    var hrs = secMinHrSplit[0];
    var min = secMinHrSplit[1];
    return (hrs == 0 && buttonValue > min);
  }

  cancel() {
    this.viewCtrl.dismiss();
    // this.dialog.close();
  }
}
