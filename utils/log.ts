import {isDebugModeSetting} from "~utils/store/stores";

export const log2 = (message: string, level: string = 'info', debug=true) => {
    if (debug) {
        isDebugModeSetting.get().then(r => {
            if (r) {
                console.log(message);
            }
        });
    }
    // TODO: https://github.com/winstonjs/winston
}
