
import { UtilsService } from './../../services/utils.service';//llamamos servicio utils
import { AuthService } from './../../../pages/auth/auth.service';// servicio gestion de login
import { Component, OnInit } from '@angular/core';
import { BaseFormUser } from '../../utils/base-form-user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    private authSvc: AuthService,
    private utilsSvc: UtilsService,
    public loginForm: BaseFormUser) { }

  ngOnInit(): void { }

  //-exit- menú sidevar
  onExit(): void {
    this.authSvc.logout();
    this.utilsSvc.openSidebar(false);

    this.loginForm.baseForm.reset();
  }

  cerrarMenu(){
    this.utilsSvc.openSidebar(false);
  }

}
