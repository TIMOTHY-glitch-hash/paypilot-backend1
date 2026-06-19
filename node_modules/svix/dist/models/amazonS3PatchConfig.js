"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmazonS3PatchConfigSerializer = void 0;
exports.AmazonS3PatchConfigSerializer = {
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
//# sourceMappingURL=amazonS3PatchConfig.js.map