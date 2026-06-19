export interface MetaConfig {
    secret: string;
    verifyToken: string;
}
export declare const MetaConfigSerializer: {
    _fromJsonObject(object: any): MetaConfig;
    _toJsonObject(self: MetaConfig): any;
};
