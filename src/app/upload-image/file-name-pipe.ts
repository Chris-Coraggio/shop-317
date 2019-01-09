import { PipeTransform, Pipe } from "@angular/core";

@Pipe({name: 'filename'})
export class FileNamePipe implements PipeTransform {
    transform(obj: Object): string {;
        if(obj === null || Object.keys(obj).length == 0){
            return "";
        }
        return obj["fileName"];
    }
}