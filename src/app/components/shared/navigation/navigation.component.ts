import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  MenuSel: string;

  constructor(
    private router: Router,
    private jwtService: JwtService
    ) { }

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
    this.jwtService.logout();
  }
}
