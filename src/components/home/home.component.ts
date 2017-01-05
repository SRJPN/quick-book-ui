import {Component, ViewChild} from "@angular/core";
import {Platform, MenuController, Nav} from "ionic-angular";
import {StatusBar} from "ionic-native";
import {RoomComponent} from "../room/room.component";
import {RoomService} from "../services/room.service";


@Component({
  templateUrl: 'home.component.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rooms: Array<String>;
  private offices;

  constructor(public platform: Platform, public roomService: RoomService,
              public menu: MenuController) {
    this.initializeApp();
    this.offices = ["Chennai","Bangalore","Hyderabad","Coimbatore","Gurgaon"];

    // set our app's pages
    this.rooms = [];
  }

  getRooms(office) {
    console.log(office);
    this.roomService.getRooms(office).subscribe((rooms) => {
      this.rooms = rooms;
    });
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

