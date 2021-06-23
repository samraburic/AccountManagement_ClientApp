import { Injectable } from "@angular/core";

@Injectable({providedIn : 'root'})
export class DataService{

    // currentUser : User;

    isAdmin = false;

    isDoctor = false;
    isMedStaff = false;
    constructor(
        // private user2roleService : User2RoleService
        ){

    }

    // initUser(){
    //   this.isAdmin = false;
    //   this.isDoctor = false;
    //   this.isMedStaff = false;

    //     this.currentUser = JSON.parse(localStorage.getItem("loggeduser"));

    //     if(this.currentUser?.IsAdmin){
    //         this.isAdmin = true;
    //     }

    //     if(this.currentUser != null){
    //         this.checkDoctors();
    //         this.checkMedicalStaff();
    //     }


    // }

    // checkDoctors(){
    //     this.user2roleService.getUserRoleByUserAndRole(this.currentUser.UserId,1).subscribe(
    //         res =>{
    //             if(res[0] != null && res[0].Active){
    //                 this.isDoctor = true;
    //             }
    //         }
    //     );
    // }

    // checkMedicalStaff(){
    //     this.user2roleService.getUserRoleByUserAndRole(this.currentUser.UserId,2).subscribe(
    //         res =>{
    //             if(res[0] != null && res[0].Active){
    //                 this.isMedStaff = true;
    //             }
    //         }
    //     );
    // }





}
