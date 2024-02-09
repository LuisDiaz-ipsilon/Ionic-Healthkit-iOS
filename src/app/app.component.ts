import { Component, OnInit } from '@angular/core';
import { HealtkitService } from './home/services/healtkit.service';
import { CapacitorHealthkit, SleepData } from '@perfood/capacitor-healthkit';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  dataRes : boolean = false

  resDataArr: SleepData[] = [];
  stateSleep: string = "testing";
  hora: string = "testing";

  bloodDate: string = "testing";
  peso: string = "testing";
  pasos: string = "testing";
  
  constructor(private healthKitService: HealtkitService) {}

  ngOnInit(): void {

  }

  async solicitarPermiso(){
    const readPermissions = ['calories', 'stairs', 'activity', 'steps', 'distance', 'duration', 'weight'];

    await CapacitorHealthkit.requestAuthorization({
      all: [],
      read: readPermissions,
      write: [],
    });

  }

  async cargarDatos() {
    try {

      const startDate = new Date('2024-02-04');
      const endDate = new Date('2024-02-08');
      
      const dataSleep = await this.healthKitService.getActivitySleep(startDate, endDate);
      //dataSleep.resultData.forEach((element, index) => {
        //console.log(`Elemento ${index + 1}:`, element);
      //});
      
      //this.stateSleep = this.resDataArr[0].sleepState;
      this.hora=dataSleep.resultData[0].duration.toString();

      const dataWeight = await this.healthKitService.getWeight();
      this.peso = dataWeight.resultData[0].value.toString();

      this.dataRes=true;
    } catch (error) {
      console.error('Error al obtener datos de actividad:', error);
    }
  }
  

}
