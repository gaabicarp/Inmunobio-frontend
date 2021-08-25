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
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NavigationComponent } from './components/shared/navigation/navigation.component';
import { ProyectosComponent } from './components/home/proyectos/proyectos.component';
import { DetalleProyectoComponent } from './components/home/proyectos/detalle-proyecto/detalle-proyecto.component';
import { DetalleExperimentosComponent } from './components/home/proyectos/detalle-experimentos/detalle-experimentos.component';
import { NuevoProyectoComponent } from './components/home/proyectos/nuevo-proyecto/nuevo-proyecto.component';
import { StockComponent } from './components/home/stock/stock.component';
import { StockDetalleComponent } from './components/home/stock/stock-detalle/stock-detalle.component';
import { NuevoProductoComponent } from './components/home/configuracion/productos/nuevo-producto/nuevo-producto.component';
import { ProductosComponent } from './components/home/configuracion/productos/productos.component';
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
import { GrupotrabajoComponent } from './components/home/configuracion/grupotrabajo/grupotrabajo.component';
import { NuevoGrupoComponent } from './components/home/configuracion/grupotrabajo/nuevo-grupo/nuevo-grupo.component';
import { NuevoExperimentoComponent } from './components/home/proyectos/nuevo-experimento/nuevo-experimento.component';
import { DistribuidorasComponent } from './components/home/configuracion/distribuidoras/distribuidoras.component';
import { ContenedoresComponent } from './components/home/configuracion/contenedores/contenedores.component';
import { EspacioFisicoComponent } from './components/home/configuracion/espacio-fisico/espacio-fisico.component';
import { NuevoEspacioComponent } from './components/home/configuracion/espacio-fisico/nuevo-espacio/nuevo-espacio.component';
import { FinalizarProyectoComponent } from './components/home/proyectos/detalle-proyecto/finalizar-proyecto/finalizar-proyecto.component';
import { FinalizarExperimentoComponent } from './components/home/proyectos/detalle-experimentos/finalizar-experimento/finalizar-experimento.component';
import { GrupoExperimentalComponent } from './components/home/proyectos/detalle-experimentos/grupo-experimental/grupo-experimental.component';
import { FilterPipe } from './pipe/filter.pipe';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { FilterStatePipe } from './pipe/filter-state.pipe';
import { ToastComponent } from './components/shared/toast/toast.component';
import { FilterCodigosPipe } from './pipe/filter-codigos.pipe';
import { NuevaHerramientaComponent } from './components/home/stock/stock-detalle/nueva-herramienta/nueva-herramienta.component';
import { NuevoBlogProyectoComponent } from './components/home/proyectos/detalle-proyecto/nuevo-blog-proyecto/nuevo-blog-proyecto.component';
import { NuevoBlogExperimentoComponent } from './components/home/proyectos/detalle-experimentos/nuevo-blog-experimento/nuevo-blog-experimento.component';
import { DividirGrupoComponent } from './components/home/proyectos/detalle-experimentos/grupo-experimental/dividir-grupo/dividir-grupo.component';



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
    GrupotrabajoComponent,
    NuevoGrupoComponent,
    NuevoExperimentoComponent,
    DistribuidorasComponent,
    ContenedoresComponent,
    EspacioFisicoComponent,
    NuevoEspacioComponent,
    FinalizarProyectoComponent,
    FinalizarExperimentoComponent,
    GrupoExperimentalComponent,
    FilterPipe,
    FilterStatePipe,
    ToastComponent,
    FilterCodigosPipe,
    NuevaHerramientaComponent,
    NuevoBlogProyectoComponent,
    NuevoBlogExperimentoComponent,
    DividirGrupoComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularMultiSelectModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
