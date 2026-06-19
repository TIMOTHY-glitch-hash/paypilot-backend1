"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationInSerializer = void 0;
exports.ApplicationInSerializer = {
    _fromJsonObject(object) {
        return {
            metadata: object["metadata"],
            name: object["name"],
            rateLimit: object["rateLimit"],
            throttleRate: object["throttleRate"],
            uid: object["uid"],
        };
    },
    _toJsonObject(self) {
        return {
            metadata: self.metadata,
            name: self.name,
            rateLimit: self.rateLimit,
            throttleRate: self.throttleRate,
            uid: self.uid,
        };
    },
};
//# sourceMappingURL=applicationIn.js.map