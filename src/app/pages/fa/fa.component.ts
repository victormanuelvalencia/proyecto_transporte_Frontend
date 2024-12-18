import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { SecurityService } from 'src/app/services/security.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fa',
  templateUrl: './fa.component.html',
  styleUrls: ['./fa.component.scss']
})
export class FAComponent implements OnInit, OnDestroy {
  user: User;


  constructor(private service: SecurityService, private router: Router) {

    this.user = {
    email: '', // Esto debería pasarse desde el login,
    password: '',
    verificationCode:''
    }
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }


  verify2FA() {
    this.service.SegundoFA(this.user).subscribe({
      next: (data) => {
        console.log("RESPUESTA " + JSON.stringify(data));
        console.log("log desde login" + JSON.stringify(this.user))
        this.service.saveSession(data);
        this.router.navigate(['dashboard']);
      },
      error: (error) => {
        Swal.fire(
          'Código Incorrecto',
          'El código ingresado no es válido. Inténtelo de nuevo.',
          'error'
        );
      },
    });

}
}
