import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { RoomComponent } from '../components/room/room.component';
import { BookComponent } from '../components/book/book.component';
import { EventService } from '../components/services/event-service.service';
import { RoomService } from '../components/services/room.service';
import { HomeComponent } from '../components/home/home.component';
import { OfficeService } from '../components/services/office.service';

@NgModule({
  declarations: [
    MyApp,
    HomeComponent,
    RoomComponent,
    BookComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RoomComponent,
    HomeComponent,
    BookComponent
  ],
  providers: [RoomService, EventService, OfficeService]
})
export class AppModule {}
