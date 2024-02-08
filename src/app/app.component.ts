import { Component, OnInit } from '@angular/core';
import { HealtkitService } from './home/services/healtkit.service';
import { SleepData } from '@perfood/capacitor-healthkit';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  dataRes : boolean = false
  dataText : string = "Testing";
  dataText2 : string = "Testing";
  resDataArr: SleepData[] = [];
  stateSleep: string = "testing";
  hora: string = "teting";
  
  constructor(private healthKitService: HealtkitService) {}

  ngOnInit(): void {
    this.healthKitService.getPermissions();
    this.healthKitService.getAvailable();
    this.healthKitService.getEditionSleepAnalysisAuth();
  }

  solicitarPermiso(){
    this.healthKitService.getPermissions();
    this.healthKitService.getAvailable();
    this.healthKitService.getEditionSleepAnalysisAuth();
  }

  async cargarDatos() {
    try {
      const startDate = new Date('2024-02-04');
      const endDate = new Date('2024-02-06');
      
      const data = await this.healthKitService.getActivitySleep(startDate, endDate);
      data.resultData.forEach((element, index) => {
        console.log(`Elemento ${index + 1}:`, element);
      });
      
      this.dataText2=data.countReturn.toString();
      this.resDataArr=data.resultData;
      /*
      this.stateSleep = this.resDataArr[0].sleepState;
      this.hora=this.resDataArr[0].timeZone;
      
      console.log('Datos de la actividad de dormir:', data);

      const allData = await this.healthKitService.getActivityAllData(startDate, endDate);
      console.log('Datos de todas actividades:', allData)*/
      this.dataRes=true;
    } catch (error) {
      console.error('Error al obtener datos de actividad:', error);
    }
  }
  

}
