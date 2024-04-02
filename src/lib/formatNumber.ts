import { safeToFixed } from "./helpers";


export const formatNumber = (num:number) => {
    if (num > 1e12) {
        return `${safeToFixed(num / 1e12)}T`;
    } else if (num > 1e9) {
        return `${safeToFixed(num / 1e9)}B`;
    } else if (num > 1e6) {
        return `${safeToFixed(num / 1e6)}M`;
    } else {
        return safeToFixed(num);
    }
};