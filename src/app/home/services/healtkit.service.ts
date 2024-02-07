import { Injectable } from '@angular/core';
import { requestAuthorization, getActivityData } from 'src/app/utils/healthkit-util';
import { CapacitorHealthkit, SampleNames, QueryOutput, ActivityData, SleepData } from '@perfood/capacitor-healthkit';  // Ajusta las importaciones según tu proyecto


@Injectable({
  providedIn: 'root'
})
export class HealtkitService {

  constructor() { }

  async getPermissions(): Promise<void>{
    const res = await requestAuthorization;
    console.log("Permiso IOS HealthKit: "+res);
  }

  async getActivityData(startDate: Date, endDate: Date = new Date()): Promise<QueryOutput<SleepData>> {
    return await getActivityData(startDate, endDate);
    
  }



}
