import { Injectable } from '@angular/core';
import { requestAuthorization, getActivityData, isAvailable, isEditionSleepAnalysisAuth} from 'src/app/utils/healthkit-util';
import { CapacitorHealthkit, SampleNames, QueryOutput, ActivityData, SleepData } from '@perfood/capacitor-healthkit';  // Ajusta las importaciones según tu proyecto


@Injectable({
  providedIn: 'root'
})
export class HealtkitService {

  constructor() { }

  async getPermissions(): Promise<void>{
    const res = await requestAuthorization;
    console.log("Permiso IOS HealthKit: "+res.toString());
  }

  async getActivity(startDate: Date, endDate: Date = new Date()): Promise<QueryOutput<SleepData>> {
    return await getActivityData(startDate, endDate);
    
  }

  async getAvailable(): Promise<void>{
    const res = await isAvailable;
    console.log("HealthKit disponible: "+res.toString());
  }

  async getEditionSleepAnalysisAuth(): Promise<void>{
    const res = await isEditionSleepAnalysisAuth;
    console.log("HealthKit Sleep Analaysis Edition disponible: "+res.toString());
  }



}
