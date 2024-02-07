import {
    ActivityData,
    CapacitorHealthkit,
    OtherData,
    QueryOutput,
    SampleNames,
    SleepData,
} from '@perfood/capacitor-healthkit';

const READ_PERMISSIONS = ['calories', 'stairs', 'activity', 'steps', 'distance', 'duration', 'weight'];

export const requestAuthorization = async (): Promise<void> => {
    try {
        await CapacitorHealthkit.requestAuthorization({
            all: [''],
            read: READ_PERMISSIONS,
            write: [''],
        });

    } catch (error) {
        console.error('[HealthKitService] Error getting Authorization:', error);
    }
}

export const getActivityData = async (startDate: Date, endDate: Date = new Date()): Promise<QueryOutput<ActivityData>> => {
    try {
        const queryOptions = {
            sampleName: SampleNames.STEP_COUNT,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            limit: 1000,
        };

        return await CapacitorHealthkit.queryHKitSampleType<ActivityData>(queryOptions);
    } catch (error) {
        console.error(error);
        throw error;  // Opcional: Puedes volver a lanzar el error si quieres propagarlo más arriba.
    }
};

