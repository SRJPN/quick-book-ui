import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class EventService {

    public onRoomStatusChanged: EventEmitter<any> = new EventEmitter<any>();
}