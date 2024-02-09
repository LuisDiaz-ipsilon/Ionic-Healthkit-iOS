import { Component, OnInit } from '@angular/core';
import { HealtkitService } from './home/services/healtkit.service';
import { CapacitorHealthkit, SampleNames, SleepData } from '@perfood/capacitor-healthkit';

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

  HR: string = "testing";
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
      
      
      const dataSleep = await this.healthKitService.getActivitySleep();
      //dataSleep.resultData.forEach((element, index) => {
        //console.log(`Elemento ${index + 1}:`, element);
      //});
      
      //this.stateSleep = this.resDataArr[0].sleepState;
      this.hora=dataSleep.resultData[0].duration.toString();

      const dataWeight = await this.healthKitService.getWeight();
      this.peso = dataWeight.resultData[0].value.toString();

      const dataSteps = await this.healthKitService.getSteps();
      this.pasos = dataSteps.resultData[0].value.toString();

      //const dataHR = await this.healthKitService.getHR();
      //console.log(dataHR);
      //this.HR = dataHR.resultData[0].value.toString();

      const current = new Date();
      const startOfDay = new Date(current.getFullYear(), current.getMonth(), current.getDate(), 0, 0, 0);
      const endOfDay = new Date(current.getFullYear(), current.getMonth(), current.getDate(), 23, 59, 59);
      const startDate = startOfDay.toISOString();
      const endDate = endOfDay.toISOString();

      const qr = {
        sampleName: SampleNames.HEART_RATE,
        startDate,
        endDate,
        limit: 0,
      };

      const dataHR = await CapacitorHealthkit.queryHKitSampleType(qr);
      console.log(dataHR);

      this.dataRes=true;
    } catch (error) {
      console.error('Error al obtener datos de actividad:', error);
    }
  }
  

}
