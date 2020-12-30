import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from "rxjs/operators";

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit{


  photos: Photo[] = [];
  filter: string = "";
  debounce: Subject<string> = new Subject<string>();
  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService,
  ) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      this.userName = params.userName;
      this.photos = this.activatedRoute.snapshot.data.photos;
    });

    this.debounce
      .pipe(debounceTime(300))
      .subscribe(filter => this.filter = filter);

  }


  load(){

    this.photoService
      .listFromUserPaginated(this.userName,++this.currentPage)
      .subscribe(photos => {
        this.filter = '';
        this.photos = this.photos.concat(photos);
        if(!photos.length) this.hasMore = false;
      })

    }
}
