import {QueryParamsCollection} from './QueryParamsCollection';
import {Uri} from './Uri';
import {ICustomParser} from '@typescript-standard-library/core/Source/types';
import {Assert} from '@typescript-standard-library/core/Source/Assertion/Assert';


const KEY_VALUE_PAIRS_DELIMITER: string = '&';
const KEY_VALUE_DELIMITER: string = '=';


export class QueryStringParser implements ICustomParser<QueryParamsCollection> {
    public static parse(queryString: string): QueryParamsCollection {
        let parser: QueryStringParser = new QueryStringParser();

        return parser.parse(queryString);
    }


    public parse(queryString: string): QueryParamsCollection {
        Assert.argument('queryString', queryString).notNull();

        let pairs: string[] = queryString.split(KEY_VALUE_PAIRS_DELIMITER);
        let queryParams: QueryParamsCollection = new QueryParamsCollection();

        pairs.forEach((pair: string): void => {
            if (pair) {
                let [key, value] = pair.split(KEY_VALUE_DELIMITER);

                queryParams.put(
                    Uri.decodeComponent(key),
                    Uri.decodeComponent(value)
                );
            }
        });

        return queryParams;
    }
}
