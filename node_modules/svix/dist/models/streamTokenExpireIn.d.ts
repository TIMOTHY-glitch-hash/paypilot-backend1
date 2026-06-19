export interface StreamTokenExpireIn {
    expiry?: number | null;
    sessionIds?: string[];
}
export declare const StreamTokenExpireInSerializer: {
    _fromJsonObject(object: any): StreamTokenExpireIn;
    _toJsonObject(self: StreamTokenExpireIn): any;
};
