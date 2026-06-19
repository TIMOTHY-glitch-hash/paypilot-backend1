"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationOutSerializer = void 0;
exports.ApplicationOutSerializer = {
    _fromJsonObject(object) {
        return {
            createdAt: new Date(object["createdAt"]),
            id: object["id"],
            metadata: object["metadata"],
            name: object["name"],
            rateLimit: object["rateLimit"],
            throttleRate: object["throttleRate"],
            uid: object["uid"],
            updatedAt: new Date(object["updatedAt"]),
        };
    },
    _toJsonObject(self) {
        return {
            createdAt: self.createdAt,
            id: self.id,
            metadata: self.metadata,
            name: self.name,
            rateLimit: self.rateLimit,
            throttleRate: self.throttleRate,
            uid: self.uid,
            updatedAt: self.updatedAt,
        };
    },
};
//# sourceMappingURL=applicationOut.js.map