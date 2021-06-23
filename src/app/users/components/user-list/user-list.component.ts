import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/services/layout.service';
import { ConfirmationDialogService } from 'src/app/shared/confirmation-dialog/confirmation-dialog.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  hideSpinner = false;
  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = ['FirstName','LastName', 'UserName', 'Phone', 'Actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  userForDelete : User;

constructor(private userService : UserService,
            private router : Router,
            private snackBar : MatSnackBar,
            private confirmationDialogService : ConfirmationDialogService,
            private layoutService : LayoutService){ }

  ngOnInit() {
    this.toggleSpinner();

    this.userService.getUsers().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onDelete(id : number){
    this.confirmationDialogService.confirm('Brisanje', 'Želite li obrisati izabranog korisnika?')
    .then((confirmed) => {
      if(confirmed == true){
        this.userService.getUserById(id).subscribe(data=>{
          this.userForDelete = data;
          this.userForDelete.Active=false;
          this.userService.updateUser(id, this.userForDelete).subscribe(() =>{
            this.userService.getUsers().subscribe(data =>{
            this.dataSource = new MatTableDataSource(data);
            this.snackBar.open('Izabrani korisnik je izbrisan!', 'Zatvori',{
            duration: 3000
          });

        });
        });

         this.router.navigate(['/users/']);
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
