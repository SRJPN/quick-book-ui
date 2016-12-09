import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar } from 'ionic-native';

import { HomeComponent } from '../components/home/home.component';
import { RoomComponent } from '../components/room/room.component';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = HomeComponent;
  rooms: Array<String>;

  constructor(public platform: Platform,
              public menu: MenuController) {
    this.initializeApp();

    // set our app's pages
    this.rooms = ['Taj-Mahal', 'Petra', 'Hampi', 'Palm-Jumeriah', 'Great-Pyramid',
      'Jaisalmer-Fort', 'Three-Gorges', 'Panama-Canal', 'Kansai-Airport', 'Kallanai',
      'Fatehpur-Sikri', 'Tanjore-Temple', 'Hoover Dam', 'Colosseum', 'Autobahn'];
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
