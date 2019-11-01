import { Product } from '@/model/Product';

export default function filterCheck(filterArr: string[], productVal: string | string[]): boolean {
    if (productVal instanceof Array) {
        for (let i = 0; i <= productVal.length - 1; i++) {
            const pVal: string = productVal[i];
            if (filterArr.includes(pVal)) {
                return true;
            }
        }
        return false;
    } else {
        return filterArr.includes(productVal);
    }
}
