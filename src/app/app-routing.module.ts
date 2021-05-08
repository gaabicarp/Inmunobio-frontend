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
import { EspaciosfisicosComponent } from './components/home/stock/espaciosfisicos/espaciosfisicos.component';
import { AgregarStockComponent } from './components/home/stock/stock-detalle/agregar-stock/agregar-stock.component';
import { NuevoContenedorComponent } from './components/home/stock/stock-detalle/nuevo-contenedor/nuevo-contenedor.component';
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
import { NuevoExperimentoComponent } from './components/home/proyectos/detalle-proyecto/nuevo-experimento/nuevo-experimento.component';


const routes: Routes = [
  { path: 'home',
    component: HomeComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'proyectos', component: ProyectosComponent},
      {path: 'proyectos/create', component: NuevoProyectoComponent},
      {path: 'proyectos/:id', component: DetalleProyectoComponent},
      {path: 'proyectos/:id/nuevo-experimento', component: NuevoExperimentoComponent},
      {path: 'proyectos/:id/experimento/:idExperimento', component: DetalleExperimentosComponent},
      {path: 'proyectos/:id', component: DetalleProyectoComponent},
      {path: 'stock', component: StockComponent},
      {path: 'stock/', component: EspaciosfisicosComponent},
      {path: 'stock/:id', component: StockDetalleComponent},
      {path: 'stock/:id/agregar-stock', component: AgregarStockComponent},
      {path: 'stock/:id/agregar-stock/nuevo-contenedor', component: NuevoContenedorComponent},
      {path: 'stock/:id/consumir-stock', component: ConsumirStockComponent},
      {path: 'stock/:id/agregar-stock/nuevo-contenedor', component: NuevoContenedorComponent},
      {path: 'bioterio', component: BioterioComponent},
      {path: 'configuracion', component: ConfiguracionComponent},
      {path: 'configuracion/usuarios', component: UsuariosComponent},
      {path: 'configuracion/usuarios/nuevo-usuario', component: NuevoUsuarioComponent},
      {path: 'configuracion/productos', component: ProductosComponent },
      {path: 'configuracion/productos/nuevo-producto', component: NuevoProductoComponent},
      {path: 'configuracion/productos/nuevo-producto/nueva-distribuidora', component: NuevaDistribuidoraComponent},
      {path: 'bioterio', component: BioterioComponent},
      {path: 'bioterio/entrada-blog', component: EntradaBlogComponent},
      {path: 'bioterio/editar-jaula', component: EditarJaulaComponent},
      {path: 'bioterio/:id', component: JaulaDetalleComponent},
      {path: 'bioterio/:id/editar-jaula', component: EditarJaulaComponent},
      {path: 'bioterio/:id/alta-animal', component: AltaAnimalComponent}
    ]},
  { path: 'login', component: LoginComponent},
  { path: '', pathMatch: 'full', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
