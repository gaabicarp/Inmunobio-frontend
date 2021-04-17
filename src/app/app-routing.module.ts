import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/home/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { DetalleExperimentosComponent } from './components/home/proyectos/detalle-experimentos/detalle-experimentos.component';
import { DetalleProyectoComponent } from './components/home/proyectos/detalle-proyecto/detalle-proyecto.component';
import { NuevoProyectoComponent } from './components/home/proyectos/nuevo-proyecto/nuevo-proyecto.component';
import { ProyectosComponent } from './components/home/proyectos/proyectos.component';
import { ProductosComponent } from './components/home/stock/productos/productos.component';
import { NuevoProductoComponent } from './components/home/stock/productos/nuevo-producto/nuevo-producto.component';
import { StockDetalleComponent } from './components/home/stock/stock-detalle/stock-detalle.component';
import { StockComponent } from './components/home/stock/stock.component';
import { LoginComponent } from './components/login/login.component';
import { EspaciosfisicosComponent } from './components/home/stock/espaciosfisicos/espaciosfisicos.component';
import { AgregarStockComponent } from './components/home/stock/stock-detalle/agregar-stock/agregar-stock.component';
import { NuevoContenedorComponent } from './components/home/stock/stock-detalle/nuevo-contenedor/nuevo-contenedor.component';
import { NuevaDistribuidoraComponent } from './components/home/stock/productos/nueva-distribuidora/nueva-distribuidora.component';
import { BioterioComponent } from './components/home/bioterio/bioterio.component';

const routes: Routes = [
  { path: 'home',
    component: HomeComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'proyectos', component: ProyectosComponent},
      {path: 'proyectos/create', component: NuevoProyectoComponent},
      {path: 'proyectos/:id', component: DetalleProyectoComponent},
      {path: 'proyectos/:id/experimento/:idExperimento', component: DetalleExperimentosComponent},
      {path: 'proyectos/:id', component: DetalleProyectoComponent},
      {path: 'stock', component: StockComponent},
      {path: 'stock/espaciosfisicos', component: EspaciosfisicosComponent},
      {path: 'stock/espaciosfisicos/:id', component: StockDetalleComponent},
      {path: 'stock/espaciosfisicos/:id/agregar-stock', component: AgregarStockComponent},
      {path: 'stock/productos', component: ProductosComponent },
      {path: 'stock/productos/nuevo-producto', component: NuevoProductoComponent},
      {path: 'stock/productos/nuevo-producto/nueva-distribuidora', component: NuevaDistribuidoraComponent},
      {path: 'stock/espaciosfisicos/:id/agregar-stock/nuevo-contenedor', component: NuevoContenedorComponent},
      {path: 'bioterio', component: BioterioComponent}
    ]},
  { path: 'login', component: LoginComponent},
  { path: '', pathMatch: 'full', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
