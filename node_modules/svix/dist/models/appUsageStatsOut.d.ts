import { type BackgroundTaskStatus } from "./backgroundTaskStatus";
import { type BackgroundTaskType } from "./backgroundTaskType";
export interface AppUsageStatsOut {
    id: string;
    status: BackgroundTaskStatus;
    task: BackgroundTaskType;
    unresolvedAppIds: string[];
    updatedAt: Date;
}
export declare const AppUsageStatsOutSerializer: {
    _fromJsonObject(object: any): AppUsageStatsOut;
    _toJsonObject(self: AppUsageStatsOut): any;
};
