"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3ConfigSerializer = void 0;
exports.S3ConfigSerializer = {
    _fromJsonObject(object) {
        return {
            accessKeyId: object["accessKeyId"],
            bucket: object["bucket"],
            endpointUrl: object["endpointUrl"],
            region: object["region"],
            secretAccessKey: object["secretAccessKey"],
        };
    },
    _toJsonObject(self) {
        return {
            accessKeyId: self.accessKeyId,
            bucket: self.bucket,
            endpointUrl: self.endpointUrl,
            region: self.region,
            secretAccessKey: self.secretAccessKey,
        };
    },
};
//# sourceMappingURL=s3Config.js.map