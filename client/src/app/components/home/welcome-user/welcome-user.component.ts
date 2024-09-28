import { Component, OnInit } from '@angular/core';
import { WelcomeVideoService } from '../../../services/welcome-video.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-user',
  templateUrl: './welcome-user.component.html',
  styleUrls: ['./welcome-user.component.css']
})
export class WelcomeUserComponent implements OnInit {
  videos: any[] = [];
  query: string = '';
  defaultVideoId: string = '_PJvpq8uOZM';
  defaultVideoUrl: SafeResourceUrl;

  constructor(private welcomeVideoService: WelcomeVideoService, private sanitizer: DomSanitizer, private router: Router ) {
    this.defaultVideoUrl = this.getSafeUrl(this.defaultVideoId);
}

  ngOnInit() {
  }

  search() {
    this.welcomeVideoService.searchVideos(this.query).then((videos) => {
      this.videos = videos;
    });
  }

  getSafeUrl(videoId: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`);
}

skip() {
  this.router.navigate(['/home-user-type-1']);
}
}
