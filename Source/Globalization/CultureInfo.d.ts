import { NumberFormatInfo } from './NumberFormatInfo';
import { ICloneable, IFormatProvider } from '@typescript-standard-library/core/Source/types';
export declare enum PersonNameComponent {
    FirstName = 0,
    LastName = 1,
    Surname = 2,
    Alias = 3,
    Nickname = 4,
}
export declare type PersonNameFormat = PersonNameComponent[];
export declare class CultureInfo implements ICloneable<CultureInfo>, IFormatProvider {
    readonly id: string;
    numberFormat: NumberFormatInfo;
    dateTimeFormat: string;
    personNameFormat: PersonNameFormat;
    constructor(id: string);
    clone(): CultureInfo;
    getFormat(): CultureInfo;
}
