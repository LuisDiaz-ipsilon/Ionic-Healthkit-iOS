import { Component, OnInit } from '@angular/core';
import { HealtkitService } from './home/services/healtkit.service';
import { CapacitorHealthkit, OtherData, QueryOutput, SampleNames, SleepData } from '@perfood/capacitor-healthkit';

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
      this.hora=dataSleep.resultData[0].duration.toString();
      console.log(dataSleep.resultData);

      //Se hace el conteo total de las horas en AsLeep (dormido incluyendo REM(Movimientos oculares rapidos) y Deep)
      const registrosDormidos = dataSleep.resultData.filter(registro => registro.sleepState === "Asleep");

      //Duración total de sueño en minutos
      const duracionTotalEnMinutos = Math.ceil(registrosDormidos.reduce((total, registro) => {
        const startDate = new Date(registro.startDate);
        const endDate = new Date(registro.endDate);
        const duracionEnMinutos = (endDate.getTime() - startDate.getTime()) / (1000 * 60); // Convertir de milisegundos a minutos
        return total + duracionEnMinutos;
      }, 0));

      const horasTotales = Math.floor(duracionTotalEnMinutos / 60);
      const minutosTotales = duracionTotalEnMinutos % 60;
      console.log("Recuento"+horasTotales+" horas y "+minutosTotales+" minutos");
      

      const dataWeight = await this.healthKitService.getWeight();
      this.peso = dataWeight.resultData[0].value.toString();

      const dataSteps = await this.healthKitService.getSteps();
      this.pasos = dataSteps.resultData[0].value.toString();

      //const dataHR = await this.healthKitService.getHR();
      //console.log(dataHR);
      //this.HR = dataHR.resultData[0].value.toString();

      this.dataRes=true;
    } catch (error) {
      console.error('Error al obtener datos de actividad:', error);
    }
  }
  

}
