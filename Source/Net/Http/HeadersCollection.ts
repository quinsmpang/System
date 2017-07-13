import {Header} from './Header';
import {IEqualityComparator} from '@typescript-standard-library/core/Source/Collections/IEqualityComparator';
import {Enumerable} from '@typescript-standard-library/core/Source/Collections/Enumerable';
import {IgnoreCaseComparator} from '@typescript-standard-library/core/Source/Text/IgnoreCaseComparator';
import {Assert} from '@typescript-standard-library/core/Source/Assertion/Assert';
import {List} from '@typescript-standard-library/core/Source/Collections/List';
import {Collection} from '@typescript-standard-library/core/Source/Collections/Collection';
import {IteratorFunction} from '@typescript-standard-library/core/Source/Collections/types';
import {InvalidArgumentException} from '@typescript-standard-library/core/Source/Exceptions/InvalidArgumentException';
import {STANDALONE_HTTP_HEADERS} from './constants';


export class HeadersCollection
    extends
        Enumerable<Header> {

    private _nameComparator: IEqualityComparator<string>;


    public get nameComparator(): IEqualityComparator<string> {
        return this._nameComparator;
    }


    public constructor(nameComparator: IEqualityComparator<string> = IgnoreCaseComparator.instance) {
        super();

        Assert.argument('nameComparator', nameComparator).notNull();

        this._nameComparator = nameComparator;
    }


    public set(headerName: string, headerValue: string): void {
        this.assertHeaderNameNotEmpty(headerName);
        Assert.argument('headerValue', headerValue).notNull();

        let newHeader: Header = new Header(headerName, headerValue);

        if (STANDALONE_HTTP_HEADERS.contains(newHeader.name, this.nameComparator)) {
            List.prototype.removeBy.call(this, (header: Header): boolean => {
                return this.nameComparator.equals(header.name, newHeader.name);
            });
        }

        List.prototype.add.call(this, newHeader);
    }


    public getNames(): Collection<string> {
        let allNames: List<string> = List.prototype.select.call(this, (header: Header): string => {
            return header.name;
        });

        let uniqueNames: List<string> = allNames.distinct(this.nameComparator);

        return  uniqueNames.toCollection();
    }


    public find(headerName: string): string {
        this.assertHeaderNameNotEmpty(headerName);

        let foundHeader: Header = List.prototype.first.call(this, this.getSelector(headerName));

        if (foundHeader) {
            return foundHeader.value;
        }

        return null;
    }


    public findAll(headerName: string): Collection<string> {
        this.assertHeaderNameNotEmpty(headerName);

        let foundHeaders: List<Header> = List.prototype.where.call(this, this.getSelector(headerName));

        let values: List<string> = foundHeaders.select((header: Header): string => {
            return header.value;
        });

        return values.toCollection();
    }


    public remove(headerName: string): void {
        this.assertHeaderNameNotEmpty(headerName);

        List.prototype.removeBy.call(this, this.getSelector(headerName));
    }


    public contains(headerName: string): boolean {
        this.assertHeaderNameNotEmpty(headerName);

        return List.prototype.any.call(this, this.getSelector(headerName));
    }


    private getSelector(headerName: string): IteratorFunction<Header, boolean> {
        this.assertHeaderNameNotEmpty(headerName);

        return (header: Header): boolean => {
            return this.nameComparator.equals(header.name, headerName);
        };
    }


    private assertHeaderNameNotEmpty(headerName: string): void {
        Assert.argument('headerName', headerName).notNull();

        if (headerName.length === 0) {
            throw new InvalidArgumentException(`Header name cannot be empty.`);
        }
    }
}
