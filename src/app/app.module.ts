import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

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
import { DetalleExperimentosComponent } from './components/home/proyectos/detalle-experimentos/detalle-experimentos.component';
import { NuevoProyectoComponent } from './components/home/proyectos/nuevo-proyecto/nuevo-proyecto.component';
import { StockComponent } from './components/home/stock/stock.component';
import { StockDetalleComponent } from './components/home/stock/stock-detalle/stock-detalle.component';
import { NuevoProductoComponent } from './components/home/configuracion/productos/nuevo-producto/nuevo-producto.component';
import { ProductosComponent } from './components/home/configuracion/productos/productos.component';
import { EspaciosfisicosComponent } from './components/home/stock/espaciosfisicos/espaciosfisicos.component';
import { AgregarStockComponent } from './components/home/stock/stock-detalle/agregar-stock/agregar-stock.component';
import { NuevoContenedorComponent } from './components/home/configuracion/contenedores/nuevo-contenedor/nuevo-contenedor.component';
import { NuevaDistribuidoraComponent } from './components/home/configuracion/productos/nueva-distribuidora/nueva-distribuidora.component';
import { BioterioComponent } from './components/home/bioterio/bioterio.component';
import { ConfiguracionComponent } from './components/home/configuracion/configuracion.component';
import { UsuariosComponent } from './components/home/configuracion/usuarios/usuarios.component';
import { NuevoUsuarioComponent } from './components/home/configuracion/usuarios/nuevo-usuario/nuevo-usuario.component';
import { JaulaDetalleComponent } from './components/home/bioterio/jaula-detalle/jaula-detalle.component';
import { EditarJaulaComponent } from './components/home/bioterio/jaula-detalle/editar-jaula/editar-jaula.component';
import { AltaAnimalComponent } from './components/home/bioterio/jaula-detalle/alta-animal/alta-animal.component';
import { ConsumirStockComponent } from './components/home/stock/stock-detalle/consumir-stock/consumir-stock.component';
import { EntradaBlogComponent } from './components/home/bioterio/entrada-blog/entrada-blog.component';
<<<<<<< Updated upstream
//import { GrupotrabajoComponent } from './components/home/configuracion/grupotrabajo/grupotrabajo.component';
//import { NuevoGrupoComponent } from './components/home/configuracion/grupotrabajo/nuevo-grupo/nuevo-grupo.component';
=======
import { GrupotrabajoComponent } from './components/home/configuracion/grupotrabajo/grupotrabajo.component';
import { NuevoGrupoComponent } from './components/home/configuracion/grupotrabajo/nuevo-grupo/nuevo-grupo.component';
import { NuevoExperimentoComponent } from './components/home/proyectos/nuevo-experimento/nuevo-experimento.component';
>>>>>>> Stashed changes
import { DistribuidorasComponent } from './components/home/configuracion/distribuidoras/distribuidoras.component';
import { ContenedoresComponent } from './components/home/configuracion/contenedores/contenedores.component';

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
    DetalleExperimentosComponent,
    NuevoProyectoComponent,
    StockComponent,
    StockDetalleComponent,
    NuevoProductoComponent,
    ProductosComponent,
    EspaciosfisicosComponent,
    AgregarStockComponent,
    NuevoContenedorComponent,
    NuevaDistribuidoraComponent,
    BioterioComponent,
    ConfiguracionComponent,
    UsuariosComponent,
    NuevoUsuarioComponent,
    JaulaDetalleComponent,
    EditarJaulaComponent,
    AltaAnimalComponent,
    ConsumirStockComponent,
    EntradaBlogComponent,
    //GrupotrabajoComponent,
    //NuevoGrupoComponent,
    DistribuidorasComponent,
    ContenedoresComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
