import { EventEmitter, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { environment } from 'src/environments/environment';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService extends Socket {

  callback: EventEmitter<any> = new EventEmitter();

  //Este es el nombre del topico, lo cual es lo mismo que la subscripcion
  nameEvent: string;

  
  
  constructor(private securityService: SecurityService) {
    //Este sera el nombre del topico, para que cuando los usuario se subscriban
    const userId = securityService.activeUserSession?.email || ''; // Asegúrate de que no sea nulo
    //Este es el constructor del padre
    //O sea, estamos creando el socket padre
    super({
      url: environment.MS_NEGOCIO,
      options: {
        //Aqui es donde se envia la query al backend
        query: {
          "user_id": userId
        }
      }
    })
    this.nameEvent = ""
    //this.listen()
    console.log(this.nameEvent);
  }

  setNameEvent(nameEvent: string) {
    //Cuando creo el socket desde el frontend, necesito que se subscriba al topico
    this.nameEvent = nameEvent
    //El listen hace que quede pendiente de cambios
    this.listen()
  }

  listen = () => {
    this.ioSocket.on(this.nameEvent, (res: any) => this.callback.emit(res))
  }

  // Para llamar este método es necesario inyectar el servicio

  // y enviar el payload

  // emitEvent=(payload={})=>{

  // this.ioSocket.emit(this.nameEvent,payload)
}