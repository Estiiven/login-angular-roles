
import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { BaseFormUser } from 'src/app/shared/utils/base-form-user';
import { UsersService } from '../services/users.service';
import { ModalComponent } from './../components/modal/modal.component';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<any>();

  displayedColumns: string[] = ['id', 'username', 'role', 'actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private userSvc: UsersService,
    private dialog: MatDialog,
    public loginForm: BaseFormUser) { }

  //mostrar usuarios
  ngOnInit() {
    this.userSvc.getAll().subscribe((users) => {
      this.dataSource.data = users;
      this.loginForm.baseForm.reset();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  onDelete(userId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '420px',
      data: '',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userSvc
          .delete(userId)
          .pipe(takeUntil(this.destroy$))
          .subscribe((res) => {
            this.userSvc.getAll().subscribe((users) => {
              this.dataSource.data = users;
            });
          });
      }
    });
  }

  onOpenModal(user = {}): void {//recibe el usuario como parametro
    const dialogRef = this.dialog.open(ModalComponent, {
      height: '500px', // dimendiones modal
      width: '500px',
      hasBackdrop: true,
      data: {
        tittle: 'Añadir nuevo usuario', user
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loginForm.baseForm.reset();//limpiamos los campos luego de cerrar el modal
      console.log(`Dialog result: ${result}`, typeof result);
      setTimeout(() => {
        this.userSvc.getAll().subscribe((users) => {
          this.dataSource.data = users;
        });
      }, 200);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
