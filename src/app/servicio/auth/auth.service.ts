import { Injectable } from '@angular/core';
// Servicio HTTP
import { HttpClient } from '@angular/common/http';
// Importación de interfaces
import { CuerpoLogin } from './../../interfaces/CuerpoLogin';
import { UsuarioLogeado } from './../../interfaces/UsuarioLogeado';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL_LOGIN: string = 'https://dummyjson.com/auth/login';
  public usuarioLogeado: UsuarioLogeado | null = null;
  // Guardar Token
  public accessToken: string | null = null;

  constructor(
    private http: HttpClient
  ) {
  }

  // Método iniciar sesión
  public iniciarSesion(usuario: string, contrasenia: string){ // Valores que recibe
    // Petición
    const cuerpo = {
      username: usuario, // Lo que se manda
      password: contrasenia
    }
    // Petición a internet
    this.http.post(this.URL_LOGIN, JSON.stringify(cuerpo), {
      // Cabeceras
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // Suscripción y entrega de resultado
    .subscribe(resultado =>{
      console.log(resultado);
    })
  }

}
