"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulkReplayInSerializer = void 0;
const messageStatus_1 = require("./messageStatus");
const statusCodeClass_1 = require("./statusCodeClass");
exports.BulkReplayInSerializer = {
    _fromJsonObject(object) {
        return {
            channel: object["channel"],
            eventTypes: object["eventTypes"],
            since: new Date(object["since"]),
            status: object["status"] != null
                ? messageStatus_1.MessageStatusSerializer._fromJsonObject(object["status"])
                : undefined,
            statusCodeClass: object["statusCodeClass"] != null
                ? statusCodeClass_1.StatusCodeClassSerializer._fromJsonObject(object["statusCodeClass"])
                : undefined,
            tag: object["tag"],
            until: object["until"] ? new Date(object["until"]) : null,
        };
    },
    _toJsonObject(self) {
        return {
            channel: self.channel,
            eventTypes: self.eventTypes,
            since: self.since,
            status: self.status != null
                ? messageStatus_1.MessageStatusSerializer._toJsonObject(self.status)
                : undefined,
            statusCodeClass: self.statusCodeClass != null
                ? statusCodeClass_1.StatusCodeClassSerializer._toJsonObject(self.statusCodeClass)
                : undefined,
            tag: self.tag,
            until: self.until,
        };
    },
};
//# sourceMappingURL=bulkReplayIn.js.map