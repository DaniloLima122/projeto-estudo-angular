import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { PhotoComment } from '../../photo/photo-comment';
import { PhotoService } from '../../photo/photo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'ap-photo-comments',
  templateUrl: './photo-comments.component.html',
  styleUrls: ['./photo-comments.component.css']
})
export class PhotoCommentsComponent implements OnInit {

  @Input() photoId: number;

  photoComments$: Observable<PhotoComment[]>

  commentForm: FormGroup;


  constructor(
    private photoService: PhotoService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {

    this.photoComments$ = this.photoService.getComments(this.photoId);
    this.commentForm = this.formBuilder.group({
      comments: ['', Validators.maxLength(300)]
    })

  }

  save(){
    const comment = this.commentForm.get('comments')?.value;
    this.photoComments$ = this.photoService
        .addComments(this.photoId, comment )
        .pipe(switchMap(() => this.photoService.getComments(this.photoId)))
        .pipe(tap(() => {

          this.commentForm.reset();
        }))

  }

}
