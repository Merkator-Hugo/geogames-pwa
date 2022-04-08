import { Injectable } from '@angular/core';
import { Zone } from '../model/objects/zone';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private zones: Zone[];

  constructor() { }
}
