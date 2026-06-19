"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamTokenExpireInSerializer = void 0;
exports.StreamTokenExpireInSerializer = {
    _fromJsonObject(object) {
        return {
            expiry: object["expiry"],
            sessionIds: object["sessionIds"],
        };
    },
    _toJsonObject(self) {
        return {
            expiry: self.expiry,
            sessionIds: self.sessionIds,
        };
    },
};
//# sourceMappingURL=streamTokenExpireIn.js.map