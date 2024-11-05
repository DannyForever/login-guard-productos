import { Injectable } from '@angular/core';
// Servicio HTTP
import { HttpClient } from '@angular/common/http';
// Importación de interfaces
import { CuerpoLogin } from './../../interfaces/CuerpoLogin';
import { UsuarioLogeado } from './../../interfaces/UsuarioLogeado';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL_LOGIN: string = 'https://dummyjson.com/auth/login';
  public usuarioLogeado: UsuarioLogeado | null = null;
  // Guardar Token
  public accessToken: string | null = null;
  // Observardor de cargando
  private $cargando = new BehaviorSubject<boolean>(false);
  public cargando = this.$cargando.asObservable();
  constructor(
    private http: HttpClient
  ) {
  }

  // Método iniciar sesión
  public iniciarSesion(usuario: string, contrasenia: string){ // Valores que recibe
    this.$cargando.next(true);
    // Petición
    const cuerpo: CuerpoLogin = {
      username: usuario, // Lo que se manda
      password: contrasenia
    }
    // Petición a internet
    this.http.post<UsuarioLogeado>(this.URL_LOGIN, JSON.stringify(cuerpo), {
      // Cabeceras
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // Suscripción y entrega de resultado
    .subscribe(resultado =>{
      this.usuarioLogeado = resultado;
      this.accessToken = resultado.accessToken;
      this.$cargando.next(false);
      console.log(resultado);
    })
  }

  // Método para cerrar sesión
  public cerrarSesion(){
    if(this.usuarioLogeado){
      this.usuarioLogeado = null;
      this.accessToken = null;
    }
  }

}
