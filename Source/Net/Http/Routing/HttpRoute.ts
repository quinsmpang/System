import {IHttpRoute} from './IHttpRoute';
import {HttpRouteValueDictionary} from './HttpRouteValueDictionary';
import {IHttpRequestHandler} from '../IHttpRequestHandler';
import {HttpRouteData} from './HttpRouteData';
import {IHttpRouteConstraint} from './IHttpRouteConstraint';
import {HttpRequest} from '../HttpRequest';
import {IEnumerable} from '@typescript-standard-library/core/Source/Collections/IEnumerable';
import {FormattableString} from '@typescript-standard-library/core/Source/Text/FormattableString';
import {Dictionary} from '@typescript-standard-library/core/Source/Collections/Dictionary';


export class HttpRoute implements IHttpRoute {
    private _routeTemplate: string;
    private _handler: IHttpRequestHandler;
    private _constraints: IEnumerable<IHttpRouteConstraint>;
    private _additionalValues: HttpRouteValueDictionary;
    private _defaultValues: HttpRouteValueDictionary;
    private _template: FormattableString;


    public get routeTemplate(): string {
        return this._routeTemplate;
    }


    public get handler(): IHttpRequestHandler {
        return this._handler;
    }


    public get constraints(): IEnumerable<IHttpRouteConstraint> {
        return this._constraints;
    }


    public get additionalValues(): HttpRouteValueDictionary {
        return this._additionalValues;
    }


    public get defaultValues(): HttpRouteValueDictionary {
        return this._defaultValues;
    }


    public constructor(
        routeTemplate: string,
        handler: IHttpRequestHandler,
        defaultValues: HttpRouteValueDictionary = new HttpRouteValueDictionary(),
        additionalValues: HttpRouteValueDictionary = new HttpRouteValueDictionary(),
        constraints: IEnumerable<IHttpRouteConstraint> = []
    ) {
        this._routeTemplate = routeTemplate;
        this._handler = handler;
        this._defaultValues = defaultValues;
        this._additionalValues = additionalValues;
        this._constraints = constraints;

        this._template = new FormattableString(routeTemplate);
    }


    public getRouteData(request: HttpRequest): HttpRouteData {
        let routeData: HttpRouteData = this.extractRouteData(request.url.path);

        if (routeData == null) {
            return null;
        }

        this.addDefaultValues(routeData);
        this.addAdditionalValues(routeData);

        return routeData;
    }


    private extractRouteData(requestPath: string): HttpRouteData {
        let values: Dictionary<string, string> = this._template.tryExtractValues(requestPath);

        if (values == null) {
            return null;
        }

        return new HttpRouteData(this, new HttpRouteValueDictionary(values));
    }


    private addDefaultValues(routeData: HttpRouteData): void {
        for (let {key, value} of this.defaultValues) {
            if (!routeData.values.containsKey(key)) {
                routeData.values.set(key, value);
            }
        }
    }


    private addAdditionalValues(routeData: HttpRouteData): void {
        for (let {key, value} of this.additionalValues) {
            if (!routeData.values.containsKey(key)) {
                routeData.values.set(key, value);
            }
        }
    }
}
