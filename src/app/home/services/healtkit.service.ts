import { Injectable } from '@angular/core';
import { requestAuthorization } from 'src/app/utils/healthkit-util';
import { CapacitorHealthkit, SampleNames, QueryOutput, ActivityData } from '@perfood/capacitor-healthkit';  // Ajusta las importaciones según tu proyecto


@Injectable({
  providedIn: 'root'
})
export class HealtkitService {

  constructor() { }

  async getPermissions(): Promise<void>{
    const res = await requestAuthorization;
    console.log("Permiso IOS HealthKit: "+res);
  }

  async getActivityData(startDate: Date, endDate: Date = new Date()): Promise<QueryOutput<ActivityData>> {
    try {
      const queryOptions = {
        sampleName: SampleNames.WORKOUT_TYPE,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        limit: 0,
      };

      return await CapacitorHealthkit.queryHKitSampleType<ActivityData>(queryOptions);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }



}
