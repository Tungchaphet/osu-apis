"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OsuAPI = exports.RankStatus = void 0;
var RankStatus;
(function (RankStatus) {
    RankStatus[RankStatus["GRAVEYARD"] = -2] = "GRAVEYARD";
    RankStatus[RankStatus["WIP"] = -1] = "WIP";
    RankStatus[RankStatus["PENDING"] = 0] = "PENDING";
    RankStatus[RankStatus["RANKED"] = 1] = "RANKED";
    RankStatus[RankStatus["APPROVED"] = 2] = "APPROVED";
    RankStatus[RankStatus["QUALIFIED"] = 3] = "QUALIFIED";
    RankStatus[RankStatus["LOVED"] = 4] = "LOVED";
})(RankStatus = exports.RankStatus || (exports.RankStatus = {}));
var osu_1 = require("./lib/osu");
Object.defineProperty(exports, "OsuAPI", { enumerable: true, get: function () { return osu_1.OsuAPI; } });
//# sourceMappingURL=index.js.map