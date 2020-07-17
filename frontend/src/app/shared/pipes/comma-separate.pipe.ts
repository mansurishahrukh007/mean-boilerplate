import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'commaSeparate'
})
export class CommaSeparatePipe implements PipeTransform {

    transform(value: string, commas: number, returnIndex: number) {
        const splitArray = value.split(',');
        const resultArray: string[] = [];

        for (let i = 0; i < commas; i++) {
            resultArray.push(splitArray[i]);
        }

        resultArray.push(splitArray.slice(commas).join(','));
        return resultArray[returnIndex];
    }

}