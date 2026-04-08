import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "filterPersonnel",
})
export class FilterPersonnelPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items || !searchText) {
            return items;
        }
        searchText = searchText.toLowerCase();

        return items.filter((it) => {
            return Object.keys(it).some((key) => {
                return it[key].toString().toLowerCase().includes(searchText);
            });
        });
    }
}
