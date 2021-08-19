import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/home/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { DetalleExperimentosComponent } from './components/home/proyectos/detalle-experimentos/detalle-experimentos.component';
import { DetalleProyectoComponent } from './components/home/proyectos/detalle-proyecto/detalle-proyecto.component';
import { NuevoProyectoComponent } from './components/home/proyectos/nuevo-proyecto/nuevo-proyecto.component';
import { ProyectosComponent } from './components/home/proyectos/proyectos.component';
import { ProductosComponent } from './components/home/configuracion/productos/productos.component';
import { NuevoProductoComponent } from './components/home/configuracion/productos/nuevo-producto/nuevo-producto.component';
import { StockDetalleComponent } from './components/home/stock/stock-detalle/stock-detalle.component';
import { StockComponent } from './components/home/stock/stock.component';
import { LoginComponent } from './components/login/login.component';
import { AgregarStockComponent } from './components/home/stock/stock-detalle/agregar-stock/agregar-stock.component';
import { NuevoContenedorComponent } from './components/home/configuracion/contenedores/nuevo-contenedor/nuevo-contenedor.component';
import { NuevaDistribuidoraComponent } from './components/home/configuracion/productos/nueva-distribuidora/nueva-distribuidora.component';
import { BioterioComponent } from './components/home/bioterio/bioterio.component';
import { ConfiguracionComponent } from './components/home/configuracion/configuracion.component';
import { UsuariosComponent } from './components/home/configuracion/usuarios/usuarios.component';
import { NuevoUsuarioComponent } from './components/home/configuracion/usuarios/nuevo-usuario/nuevo-usuario.component';
import { EntradaBlogComponent } from './components/home/bioterio/entrada-blog/entrada-blog.component';
import { EditarJaulaComponent } from './components/home/bioterio/jaula-detalle/editar-jaula/editar-jaula.component';
import { JaulaDetalleComponent } from './components/home/bioterio/jaula-detalle/jaula-detalle.component';
import { AltaAnimalComponent } from './components/home/bioterio/jaula-detalle/alta-animal/alta-animal.component';
import { ConsumirStockComponent } from './components/home/stock/stock-detalle/consumir-stock/consumir-stock.component';
import { GrupotrabajoComponent } from './components/home/configuracion/grupotrabajo/grupotrabajo.component';
import { NuevoGrupoComponent } from './components/home/configuracion/grupotrabajo/nuevo-grupo/nuevo-grupo.component';
import { NuevoExperimentoComponent } from './components/home/proyectos/nuevo-experimento/nuevo-experimento.component';
import { DistribuidorasComponent } from './components/home/configuracion/distribuidoras/distribuidoras.component';
import { ContenedoresComponent } from './components/home/configuracion/contenedores/contenedores.component';
import { NuevoEspacioComponent } from './components/home/configuracion/espacio-fisico/nuevo-espacio/nuevo-espacio.component';
import { EspacioFisicoComponent } from './components/home/configuracion/espacio-fisico/espacio-fisico.component';
import { FinalizarProyectoComponent } from './components/home/proyectos/detalle-proyecto/finalizar-proyecto/finalizar-proyecto.component';
import { FinalizarExperimentoComponent } from './components/home/proyectos/detalle-experimentos/finalizar-experimento/finalizar-experimento.component';
import {GrupoExperimentalComponent} from './components/home/proyectos/detalle-experimentos/grupo-experimental/grupo-experimental.component';
import { NuevoBlogProyectoComponent } from './components/home/proyectos/detalle-proyecto/nuevo-blog-proyecto/nuevo-blog-proyecto.component';
import { AsociarProyectoJaulaComponent } from './components/home/bioterio/jaula-detalle/asociar-proyecto-jaula/asociar-proyecto-jaula.component';
import { NuevoBlogExperimentoComponent } from './components/home/proyectos/detalle-experimentos/nuevo-blog-experimento/nuevo-blog-experimento.component';
import { NuevoBlogEspacioComponent } from './components/home/stock/nuevo-blog-espacio/nuevo-blog-espacio.component';
import { BlogHerramientasComponent } from './components/home/stock/blog-herramientas/blog-herramientas.component';
import { NuevoBlogHerramientaComponent } from './components/home/stock/blog-herramientas/nuevo-blog-herramienta/nuevo-blog-herramienta.component';
import { NuevaHerramientaComponent } from './components/home/stock/herramientas/nueva-herramienta/nueva-herramienta.component';

const routes: Routes = [
  { path: 'home',
    component: HomeComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'proyectos', component: ProyectosComponent},
      {path: 'proyectos/nuevo-proyecto', component: NuevoProyectoComponent},
      {path: 'proyectos/editar-proyecto/:id', component: NuevoProyectoComponent},
      {path: 'proyectos/create', component: NuevoProyectoComponent},
      {path: 'proyectos/:id', component: DetalleProyectoComponent},
      {path: 'proyectos/:id/nuevo-blog-proyecto', component: NuevoBlogProyectoComponent },
      {path: 'proyectos/:id/experimento/:idExperimento', component: DetalleExperimentosComponent},
      {path: 'proyectos/:id/experimento/:idExperimento/nuevo-experimento', component: NuevoExperimentoComponent},
      {path: 'proyectos/:id/experimento/:idExperimento/nuevo-blog-experimento', component: NuevoBlogExperimentoComponent},
      {path: 'proyectos/:id/experimento/:idExperimento/finalizar-experimento', component: FinalizarExperimentoComponent},
      {path: 'proyectos/:id/experimento/:idExperimento/grupo-experimental/:idGrupo', component: GrupoExperimentalComponent},
      {path: 'proyectos/:id/editar-experimento/:idExperimento', component: NuevoExperimentoComponent},
      {path: 'proyectos/:id/nuevo-experimento', component: NuevoExperimentoComponent},
      {path: 'proyectos/:id', component: DetalleProyectoComponent},
      {path: 'proyectos/:id/finalizar-proyecto', component: FinalizarProyectoComponent},
      {path: 'stock', component: StockComponent},
      {path: 'stock/:idEspacio', component: StockDetalleComponent},
      {path: 'stock/:idEspacio/agregar-stock', component: AgregarStockComponent},
      {path: 'stock/:idEspacio/agregar-stock/:idProducto/:idProductoEnStock/:idUbicacion', component: AgregarStockComponent},
      {path: 'stock/:idEspacio/:idProducto/:idProductoEnStock/:idUbicacion', component: ConsumirStockComponent},
      {path: 'stock/:idEspacio/nueva-herramienta', component: NuevaHerramientaComponent},
      {path: 'stock/:idEspacio/nueva-herramienta/:idHerramienta', component: NuevaHerramientaComponent},
      {path: 'stock/:idEspacio/nuevo-blog-espacio', component: NuevoBlogEspacioComponent},
      {path: 'stock/:idEspacio/:idHerramienta', component: BlogHerramientasComponent},
      {path: 'stock/:idEspacio/:idHerramienta/nuevo-blog-herramienta', component: NuevoBlogHerramientaComponent},
      {path: 'configuracion', component: ConfiguracionComponent},
      {path: 'configuracion/usuarios', component: UsuariosComponent},
      {path: 'configuracion/usuarios/nuevo-usuario', component: NuevoUsuarioComponent},
      {path: 'configuracion/usuarios/editar-usuario/:id', component: NuevoUsuarioComponent},
      {path: 'configuracion/grupo-trabajo', component: GrupotrabajoComponent},
      {path: 'configuracion/grupo-trabajo/nuevo-grupo', component: NuevoGrupoComponent},
      {path: 'configuracion/grupo-trabajo/editar-grupo/:id', component: NuevoGrupoComponent},
      {path: 'configuracion/espacio-fisico', component: EspacioFisicoComponent },
      {path: 'configuracion/espacio-fisico/nuevo-espacio', component: NuevoEspacioComponent },
      {path: 'configuracion/espacio-fisico/editar-espacio/:idEspacio', component: NuevoEspacioComponent},
      {path: 'configuracion/productos', component: ProductosComponent },
      {path: 'configuracion/productos/nuevo-producto', component: NuevoProductoComponent},
      {path: 'configuracion/productos/editar-productos/:idProducto', component: NuevoProductoComponent},
      {path: 'configuracion/distribuidoras', component: DistribuidorasComponent},
      {path: 'configuracion/distribuidoras/nueva-distribuidora', component: NuevaDistribuidoraComponent},
      {path: 'configuracion/distribuidoras/editar-distribuidora/:idDistribuidora', component:NuevaDistribuidoraComponent},
      {path: 'configuracion/contenedores', component: ContenedoresComponent},
      {path: 'configuracion/contenedores/nuevo-contenedor', component: NuevoContenedorComponent},
      {path: 'configuracion/contenedores/editar-contenedor/:idContenedor', component: NuevoContenedorComponent},
      {path: 'bioterio', component: BioterioComponent},
      {path: 'bioterio/editar-jaula', component: EditarJaulaComponent},
      {path: 'bioterio/:id', component: JaulaDetalleComponent},
      {path: 'bioterio/:id/alta-animal', component: AltaAnimalComponent},
      {path: 'bioterio/:id/entrada-blog', component: EntradaBlogComponent},
      {path: 'bioterio/:id/asociar-proyecto', component: AsociarProyectoJaulaComponent},
      {path: 'bioterio/:id/editar-jaula', component: EditarJaulaComponent}

    ]},
  { path: 'login', component: LoginComponent},
  { path: '', pathMatch: 'full', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
