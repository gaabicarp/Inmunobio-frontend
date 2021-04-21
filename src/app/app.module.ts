import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/home/dashboard/dashboard.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationComponent } from './components/shared/navigation/navigation.component';
import { ProyectosComponent } from './components/home/proyectos/proyectos.component';
import { DetalleProyectoComponent } from './components/home/proyectos/detalle-proyecto/detalle-proyecto.component';
import { StockComponent } from './components/home/stock/stock.component';
import { StockDetalleComponent } from './components/home/stock/stock-detalle/stock-detalle.component';
import { NuevoProductoComponent } from './components/home/stock/productos/nuevo-producto/nuevo-producto.component';
import { ProductosComponent } from './components/home/stock/productos/productos.component';
import { EspaciosfisicosComponent } from './components/home/stock/espaciosfisicos/espaciosfisicos.component';
import { AgregarStockComponent } from './components/home/stock/stock-detalle/agregar-stock/agregar-stock.component';
import { NuevoContenedorComponent } from './components/home/stock/stock-detalle/nuevo-contenedor/nuevo-contenedor.component';
import { NuevaDistribuidoraComponent } from './components/home/stock/productos/nueva-distribuidora/nueva-distribuidora.component';
import { BioterioComponent } from './components/home/bioterio/bioterio.component';
import { JaulaDetalleComponent } from './components/home/bioterio/jaula-detalle/jaula-detalle.component';
import { EditarJaulaComponent } from './components/home/bioterio/jaula-detalle/editar-jaula/editar-jaula.component';
import { AltaAnimalComponent } from './components/home/bioterio/jaula-detalle/alta-animal/alta-animal.component';
import { ConsumirStockComponent } from './components/home/stock/stock-detalle/consumir-stock/consumir-stock.component';
import { EntradaBlogComponent } from './components/home/bioterio/entrada-blog/entrada-blog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    HomeComponent,
    NavigationComponent,
    ProyectosComponent,
    DetalleProyectoComponent,
    StockComponent,
    StockDetalleComponent,
    NuevoProductoComponent,
    ProductosComponent,
    EspaciosfisicosComponent,
    AgregarStockComponent,
    NuevoContenedorComponent,
    NuevaDistribuidoraComponent,
    BioterioComponent,
    JaulaDetalleComponent,
    EditarJaulaComponent,
    AltaAnimalComponent,
    ConsumirStockComponent,
    EntradaBlogComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
