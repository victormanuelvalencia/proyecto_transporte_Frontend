import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';
import { SecurityService } from 'src/app/services/security.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  theUser: User; // Modelo de usuario
  subscription: Subscription;
  public focus;
  public listTitles: any[];
  public location: Location;
  constructor(location: Location,
    private element: ElementRef,
    private router: Router,
    private service: SecurityService,
    private webSocketService: WebSocketService
  ) {
    this.location = location;

    this.subscription = this.service.getUser().subscribe(data => { //Le decimos que nos vamos a subscribirnos al service
      //que hace que cada que hace un cambio el service (en el theUser)
      this.theUser = data;
      if (this.theUser._id) {
        //ESto lo que hace es subscribirse a si mismo
        this.webSocketService.setNameEvent(this.theUser._id)
        this.webSocketService.callback.subscribe(data => {
          console.log('Llegando desde el backend: ' + JSON.stringify(data));

        })
      }
    })
  }



  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    //ESto lo que hace es colocar el topico
    this.webSocketService.setNameEvent('notifications')
    this.webSocketService.callback.subscribe(data =>{
      console.log('Llegando desde el backend: '+JSON.stringify(data));
      
    })
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }

  logout() {
    this.service.logout();
  }

  public getSession(){
    return this.service.existSession() //Le decimos al securityService si hay una sesion o no con el metodo 
  }
}
