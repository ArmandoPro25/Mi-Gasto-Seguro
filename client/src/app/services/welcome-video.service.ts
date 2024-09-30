import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, switchMap } from 'rxjs';
import axios from 'axios';
import { query } from 'express';

@Injectable({
  providedIn: 'root'
})

export class WelcomeVideoService {

  private apiKey: string = 'AIzaSyBZy3Z43jzcwvnNxI746PPX-bsSJKc1-OE';
  private searchQuery = new BehaviorSubject<string>('');
  
  constructor() {
    this.searchQuery.pipe(
      debounceTime(300),
      switchMap(query => this.searchVideos(query))).subscribe();
  }

  setSearchQuery(query: string) {
    this.searchQuery.next(query);
  }

  async searchVideos(query: string) {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: query,
        key: this.apiKey,
        maxResults: 10
      }
    });
    return response.data.items;
  }
}
