import {Component, EventEmitter} from "@angular/core";
import {ViewController} from "ionic-angular";
import {RoomService} from "../services/room.service";
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
  public bookingCanBeProcessed = true;

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
  public errors = {
    duration: '',
    employeeId: ''
  };

  constructor(public roomStatusService: RoomService, public eventService: EventService, public viewCtrl: ViewController) {
    this.room = viewCtrl.data.roomName;
    this.timer = viewCtrl.data.timeLeft;
    console.log(viewCtrl.data.roomName);
  }

  book() {
    this.resetErrors();
    this.roomStatusService.book(this.room, this.duration, this.empId).subscribe((updatedRoom) => {

      var response = updatedRoom.json();
      if (response.isValid) {
        this.eventService.onRoomStatusChanged.emit(response);
        this.viewCtrl.dismiss();
        this.bookingCanBeProcessed = false;
      }
      else {
        this.errors = response.errors;
      }
    }, () => {
      this.errorMessage = 'some problem in booking';
    });
    this.bookingCanBeProcessed = false;
  }

  private resetErrors() {
    this.errorMessage = '';
    this.errors = {
      duration: '',
      employeeId: ''
    }
  }

  isDurationSelected(duration) {
    return this.duration == duration;
  }

  setDuration(selectedDuration) {
    this.duration = selectedDuration;
  }


  disableButton() {
    return !((this.empId != null && this.empId != "") && this.duration != null && this.bookingCanBeProcessed);
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
  isBookingInProgress(){
    return !this.bookingCanBeProcessed
  }
}
