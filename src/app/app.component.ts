import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar } from 'ionic-native';

import { HomeComponent } from '../components/home/home.component';
import { RoomComponent } from '../components/room/room.component';
import { RoomService } from '../components/services/room.service';
import { EventService } from '../components/services/event-service.service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav)
  nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = HomeComponent;
  rooms: Array<String> = [];

  constructor(public platform: Platform, public eventService: EventService,
              public menu: MenuController, public roomService: RoomService) {
    this.initializeApp();

    // set our app's pages

    this.eventService.onRoomChanged.subscribe((data) => {
      this.roomService.getRooms(data).subscribe((rooms) => {
        this.rooms = rooms;
      });
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(room) {
    this.menu.close();
    this.nav.setRoot(RoomComponent, {room: room});
  }
}
