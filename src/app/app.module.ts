import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from '../components/home/home.component';
import { RoomComponent } from '../components/room/room.component';
import { BookComponent } from '../components/book/book.component';
import { EventService } from '../components/services/event-service.service';
import { RoomService } from '../components/services/room.service';

@NgModule({
  declarations: [
    MyApp,
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
    BookComponent
  ],
  providers: [RoomService, EventService]
})
export class AppModule {}
