import { Component, OnInit } from '@angular/core';
import { WelcomeVideoService } from '../../../services/welcome-video.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome-user',
  templateUrl: './welcome-user.component.html',
  styleUrls: ['./welcome-user.component.css']
})
export class WelcomeUserComponent implements OnInit {
  videos: any[] = [];
  query: string = '';
  defaultVideoId: string = 'BsHmvxK8Zns';
  defaultVideoUrl: SafeResourceUrl;
  userName: string = 'Usuario';
  Id_User: string = '';

  constructor(
    private welcomeVideoService: WelcomeVideoService, 
    private sanitizer: DomSanitizer, 
    private router: Router,
    private route: ActivatedRoute, 
    private userService: UserService
  ) {
    this.defaultVideoUrl = this.getSafeUrl(this.defaultVideoId);
  }

  ngOnInit() {
    this.Id_User = this.route.snapshot.queryParams['Id_User'] || localStorage.getItem('Id_User') || '';
    
    if (this.Id_User) {
      this.userService.getUserName(this.Id_User).subscribe(
        (response: any) => {
          if (response.success) {
            this.userName = response.name;
          }
        },
        error => {
          console.error('Error al obtener el nombre del usuario', error);
        }
      );
    } else {
      console.error('No user ID found');
    }
  }

  skip() {
    if (this.Id_User) {
      this.userService.getUserType(this.Id_User).subscribe(
        (response: any) => {
          if (response.success) {
            const typeUser = response.typeUser;
            this.router.navigate([`/home-user-type-${typeUser}`], { queryParams: { Id_User: this.Id_User } });
          } else {
            console.error('No se pudo obtener el tipo de usuario');
          }
        },
        error => {
          console.error('Error al obtener el tipo de usuario', error);
        }
      );
    } else {
      console.error('No user ID found');
    }
  }

  search() {
    this.welcomeVideoService.searchVideos(this.query).then((videos) => {
      this.videos = videos;
    });
  }

  getSafeUrl(videoId: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`);
  }
}
