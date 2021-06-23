import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LayoutService } from 'src/app/layout/services/layout.service';
import { ConfirmationDialogService } from 'src/app/shared/confirmation-dialog/confirmation-dialog.service';
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  hideSpinner = false;
  dataSource: MatTableDataSource<Client>;
  displayedColumns: string[] = ['Name','Address', 'Idnumber', 'Actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

constructor(private clientService : ClientService,
            private router : Router,
            private snackBar : MatSnackBar,
            private confirmationDialogService : ConfirmationDialogService,
            private jwtHelper : JwtHelperService,
            private layoutService : LayoutService){ }

  ngOnInit() {
    this.toggleSpinner();

    this.clientService.getClients().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  isUserAuthenticated() {
    const token: string = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      this.layoutService.closeNavMenu();
      this.router.navigate(["/login"]);

      return false;
    }
  }


  onDelete(id : number){
    this.confirmationDialogService.confirm('Brisanje', 'Želite li obrisati izabranog klijenta?')
    .then((confirmed) => {
      if(confirmed == true){
        this.clientService.deleteClient(id).subscribe(
          () => {
            this.clientService.getClients().subscribe(data =>{
            this.dataSource = new MatTableDataSource(data);
            this.snackBar.open('Izabrani klijent je izbrisan!', 'Zatvori',{
            duration: 3000
          });
          });

         this.router.navigate(['/clients/']);
        },
        err => {
         this.toggleSpinner();
          this.snackBar.open(err, 'Zatvori');
          console.error(err);
        }
        );
      }
    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
 }

  toggleSpinner() {
    this.hideSpinner ? this.hideSpinner = false : this.hideSpinner = true;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openSnackBar(message: string, description: string): void {
    this.snackBar.open(message, description, {
      duration: 10000
    });
  }
}
