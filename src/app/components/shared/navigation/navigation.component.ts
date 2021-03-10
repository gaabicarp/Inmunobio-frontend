import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  navegar(): void{
    console.log('asd');
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
}
