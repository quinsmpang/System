import {Uri} from './Uri';
import {KeyValueCollection} from '@typescript-standard-library/core/Source/Collections/KeyValueCollection';
import {IEquatable} from '@typescript-standard-library/core/Source/types';
import {Assert} from '@typescript-standard-library/core/Source/Assertion/Assert';
import {KeyValueEqualityComparator} from '@typescript-standard-library/core/Source/Collections/KeyValueEqualityComparator';
import {StringBuilder} from '@typescript-standard-library/core/Source/Text/StringBuilder';


export class QueryParamsCollection
    extends KeyValueCollection<string, string>
    implements IEquatable<QueryParamsCollection> {

    public equals(other: QueryParamsCollection): boolean {
        Assert.argument('other', other).notNull();

        for (let currentItem of this) {
            if (!other.contains(currentItem, KeyValueEqualityComparator.instance)) {
                return false;
            }
        }

        for (let otherItem of other) {
            if (!this.contains(otherItem, KeyValueEqualityComparator.instance)) {
                return false;
            }
        }

        return true;
    }


    public toString(): string {
        let builder: StringBuilder = new StringBuilder();
        let index: number = 0;

        for (let {key, value} of this) {
            if (index > 0) {
                builder.append('&');
            }

            builder.append(
                Uri.encodeComponent(key) +
                '=' +
                Uri.encodeComponent(value)
            );

            index += 1;
        }

        return builder.toString();
    }
}
