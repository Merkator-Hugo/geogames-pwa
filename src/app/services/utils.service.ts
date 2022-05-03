import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import {v4 as uuidv4} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  public uuid = {
    generate: (): string => uuidv4()
  };
  public toast = {
    present: async (message: string) => {
      const toast = await this.toastController.create({
        message,
        duration: 2000
      });
      toast.present();
    }
  };

  public log = {
    add: (message: string): void => {}
  };

  constructor(
    private toastController: ToastController
    ) { }
}
