export interface S3Config {
    accessKeyId: string;
    bucket: string;
    endpointUrl?: string | null;
    region: string;
    secretAccessKey: string;
}
export declare const S3ConfigSerializer: {
    _fromJsonObject(object: any): S3Config;
    _toJsonObject(self: S3Config): any;
};
