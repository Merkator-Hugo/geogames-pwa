import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  public toast = {
    present: async (message: string) => {
      const toast = await this.toastController.create({
        message,
        duration: 2000
      });
      toast.present();
    }
  };

  constructor(
    private toastController: ToastController
    ) { }
}