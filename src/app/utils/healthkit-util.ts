import {
    ActivityData,
    CapacitorHealthkit,
    OtherData,
    QueryOutput,
    SampleNames,
    SleepData,
} from '@perfood/capacitor-healthkit';


//const READ_PERMISSIONS = ['SleepAnalysis'];

export const requestAuthorization = async (): Promise<void> => {
    const READ_PERMISSIONS = ['calories', 'stairs', 'activity', 'steps', 'distance', 'duration', 'weight'];
    //try {
        await CapacitorHealthkit.requestAuthorization({
            all: [],
            read: READ_PERMISSIONS,
            write: [],
        });

    //} catch (error) {
      //  console.error('[HealthKit-Util] Error getting Authorization:', error);
    //}
}

export const getActivitySleep = async (startDate: Date, endDate: Date = new Date()): Promise<QueryOutput<SleepData>> => {
    try {
        const queryOptions = {
            sampleName: SampleNames.SLEEP_ANALYSIS,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            limit: 0,
        };
        
        return await CapacitorHealthkit.queryHKitSampleType<SleepData>(queryOptions);
    } catch (error) {
        console.error('[HealthKit util] Error al obtener la actividad de dormir');       
        console.error(error);
        throw error;  // Opcional: Puedes volver a lanzar el error si quieres propagarlo más arriba.
    }
};

export const isAvailable = async (): Promise<void> => {
    try {
        return await CapacitorHealthkit.isAvailable();
    } catch (error) {
        console.error('[HealthKit-Util] No availablet:', error);
    }
}

export const isEditionSleepAnalysisAuth = async (): Promise<void> => {
    try {
        return await CapacitorHealthkit.isEditionAuthorized({sampleName: 'activity'});
    } catch (error) {
        console.error('[HealthKit-Util] No availablet:', error);
    }
}

export const getActivityAllData = async (startDate: Date, endDate: Date = new Date()): Promise<any> => {
    try {
        const queryOptions = {
            sampleNames: [SampleNames.SLEEP_ANALYSIS, SampleNames.HEART_RATE],
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            limit: 0,
        };
        
        return await CapacitorHealthkit.multipleQueryHKitSampleType(queryOptions);
    } catch (error) {
        console.error('[HealthKit util] Error al obtener alguna actividad');       
        console.error(error);
        throw error;  // Opcional: Puedes volver a lanzar el error si quieres propagarlo más arriba.
    }
};



