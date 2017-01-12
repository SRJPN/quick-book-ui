import { Component } from '@angular/core';
import { OfficeService } from '../services/office.service';
import { EventService } from "../services/event-service.service";

@Component({
  templateUrl: 'home.component.html'
})
export class HomeComponent {

  public offices: Array<String> = [];

  constructor(public officeService: OfficeService, public eventService: EventService) {
    this.officeService.all().subscribe(offices => this.offices = offices)
  }

  public onOfficeClicked(office) {
    this.eventService.onRoomChanged.emit(office);
  }
}
