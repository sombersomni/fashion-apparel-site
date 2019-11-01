import { Product } from '@/model/Product';

export default function mapInfo(label: string, product: any, aggregation: any): any {
    if (product[label]) {
        if (!aggregation[label]) {
            aggregation[label] = {};
        }
        if (product[label] instanceof Array) {
            product[label].forEach((each: string) => {
                let attr = each;
                if (label === 'colors') {
                    attr = each.includes('pattern') ? 'multicolored' : each;
                }
                if (!aggregation[label][attr]) {
                    aggregation[label][attr] = 0;
                }
                aggregation[label][attr]++;
            });
        } else {
            const attr = product[label];
            if (!aggregation[label][attr]) {
                aggregation[label][attr]  = 0;
            }
            aggregation[label][attr]++;
        }
    }
    return aggregation;
}
