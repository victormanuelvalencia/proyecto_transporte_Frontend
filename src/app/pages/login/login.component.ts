import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { SecurityService } from 'src/app/services/security.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  theUser: User;

  constructor(private service: SecurityService,
              private router: Router
  ) {
    this.theUser = {
      email: '',
      password: '',
    };
  }

  // Método para realizar el login
  login() {
    this.service.login(this.theUser).subscribe({
      next: (data) => {
        console.log("RESPUESTA " + JSON.stringify(data));
        this.service.saveSession(data);
        this.router.navigate(["dashboard"])
      },
      error: (error) => {
        console.log(error)
        Swal.fire("Autenticación inválida", "Usuario o contraseña inválida", "error");
      }
    })
  }

}




