import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhotoService } from '../photo/photo.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { UserService } from 'src/app/core/user/user.service';
import { HttpClient, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  file: File;
  preview: string;
  percentDone = 0;

  @ViewChild("fileInput") inputFile: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private photoService: PhotoService,
    private route: Router,
    private alertService: AlertService,
    private userService: UserService
  ) { }

  ngOnInit() {

    this.photoForm = this.formBuilder.group({

      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true]

    })
  }


  selectFile(event: Event) {

    const file = (event.target as HTMLInputElement).files;

    if (file) {

      this.file = file[0];
      const fileReader = new FileReader();

      fileReader.onload = e => this.preview = <string>e.target?.result;

      fileReader.readAsDataURL(file[0]);

    }
  }

  upload() {

    const description = this.photoForm.get('description')?.value;
    const allowComments = this.photoForm.get('allowComments')?.value;

    this.photoService
      .upload(description, allowComments, this.file)
      .pipe(finalize(() => {
        this.route.navigate(['/user', this.userService.getUserName()]);
      }))
      .subscribe(
        (event: HttpEvent<any>) => {

          if (event.type == HttpEventType.UploadProgress) {

            this.percentDone = Math.round(100 * event.loaded / Number(event.total));

          } else if (event instanceof HttpResponse) {

            this.alertService.success("Upload complete", true);
          }
        },
        () => {

          this.alertService.success("Upload error!",true);
        }

      );

  }

}
