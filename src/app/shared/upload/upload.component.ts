import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  public progress: number;
  public message: string;

  // gdje smještamo fajl ili sliku
  // 1 --> fajlovi u Documents za pacijentovce dokmnetacije
  // 2 --> fajlovi za nalaze
  @Input() destination : number;
  @Output() public onUploadFinished = new EventEmitter();
  url : string = "";


  constructor(private http : HttpClient) { }

  ngOnInit(): void {
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    if(this.destination == 1){
      this.url = `${environment.apiUrl}/upload`;
    }
    else if(this.destination == 2){
      this.url = `${environment.apiUrl}/upload/UploadMedicalRecord`;
    }
    
    this.http.post(this.url, formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      });
  }


}
