import { type MessageStatus } from "./messageStatus";
import { type StatusCodeClass } from "./statusCodeClass";
export interface BulkReplayIn {
    channel?: string | null;
    eventTypes?: string[] | null;
    since: Date;
    status?: MessageStatus | null;
    statusCodeClass?: StatusCodeClass | null;
    tag?: string | null;
    until?: Date | null;
}
export declare const BulkReplayInSerializer: {
    _fromJsonObject(object: any): BulkReplayIn;
    _toJsonObject(self: BulkReplayIn): any;
};
