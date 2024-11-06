import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../servicio/producto/producto.service';
import { Producto } from '../interfaces/Producto';
import { ViewWillEnter, ViewDidLeave } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements ViewWillEnter, ViewDidLeave {
  public productos: Producto [] = [];
  private subProducto!: Subscription;
  constructor(
    private prdS: ProductoService,
  ) {

  }

  ionViewDidLeave(): void {
    if(this.subProducto){
      this.subProducto.unsubscribe();
    }
  }

  ionViewWillEnter(): void {
    this.subProducto = this.prdS.producto.subscribe(productos => {
      this.productos = productos;
    })
    this.prdS.listarProductos();
  }

  public siguiente(){
    this.prdS.siguientesProductos();
  }

  public anterior(){
    this.prdS.productosAnterior();
  }

}
