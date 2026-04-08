import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "filterClient",
})
export class FilterClientPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items || !searchText) {
            return items;
        }
        searchText = searchText.toLowerCase();

        return items.filter((it: any) => {
            return Object.keys(it).some((key) => {
                return it[key].toString().toLowerCase().includes(searchText);
            });
        });
    }
}
