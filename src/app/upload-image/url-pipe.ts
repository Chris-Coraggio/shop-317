import { PipeTransform, Pipe } from "@angular/core";

@Pipe({name: 'url'})
export class UrlPipe implements PipeTransform {
    transform(obj: Object): string {
        console.log(obj);
        if(obj === null || Object.keys(obj).length == 0){
            return "";
        }
        return obj["url"];
    }
}