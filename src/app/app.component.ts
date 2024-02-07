import { Component, OnInit } from '@angular/core';
import { HealtkitService } from './home/services/healtkit.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  dataRes : boolean = false
  dataText : string = "Testing";
  dataText2 : string = "Testing";
  
  constructor(private healthKitService: HealtkitService) {}

  ngOnInit(): void {
    
  }

  solicitarPermiso(){
    this.healthKitService.getPermissions();
  }

  async cargarDatos() {
    try {
      const startDate = new Date('2024-02-01');
      const endDate = new Date('2024-02-04');
  
      const data = await this.healthKitService.getActivityData(startDate, endDate);
      this.dataText2=data.countReturn.toString();
      this.dataRes=true;
      console.log('Datos de la actividad:', data);
    } catch (error) {
      console.error('Error al obtener datos de actividad:', error);
    }
  }
  

}
