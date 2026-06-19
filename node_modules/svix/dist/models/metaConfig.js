"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaConfigSerializer = void 0;
exports.MetaConfigSerializer = {
    _fromJsonObject(object) {
        return {
            secret: object["secret"],
            verifyToken: object["verifyToken"],
        };
    },
    _toJsonObject(self) {
        return {
            secret: self.secret,
            verifyToken: self.verifyToken,
        };
    },
};
//# sourceMappingURL=metaConfig.js.map