import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  MenuSel: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navegar(url: string): void{
    this.MenuSel = url;
    this.router.navigateByUrl(`/home/${url}`);
  }

  clickMobile(active: boolean): void{
    (document.getElementById(`mobile-menu-toggle`) as HTMLInputElement).checked = false;

    if (!active){
      (document.getElementById(`mobile-menu-toggle`) as HTMLInputElement).checked = false;
    }
  }

  cerrarNavigate(): void{
    if ((document.getElementById(`mobile-menu-toggle`) as HTMLInputElement).checked === true){
      (document.getElementById(`mobile-menu-toggle`) as HTMLInputElement).checked = false;
    }
  }

  salir(): void{
    console.log('asd');
  }
}
