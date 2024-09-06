import { UUID } from 'crypto';
import { fetchResource } from '../../infraestructure/api.endpoints';
import { DropDownListItem } from './dropdown-list-item.entity';

interface DropDownListData {
    id: UUID;
    list_name: string;
    is_active: boolean;
    dropdown_list_items?: DropDownListItem[];
}

export class DropDownList {

    id: UUID;
    list_name: string;
    is_active: boolean;
    dropdown_list_items?: DropDownListItem[];

    constructor(dropDownListdata: DropDownListData) {

        const { id, list_name, is_active, dropdown_list_items } = dropDownListdata;
        
        this.id = id;
        this.list_name = list_name;
        this.is_active = is_active;
        this.dropdown_list_items = dropdown_list_items
            ? dropdown_list_items.map(item => new DropDownListItem(item))
            : [];
    }

    static async getAll() {
        const data = await fetchResource('dropdown-lists');
        return data['dropdownLists'].map((item: DropDownListData) => new DropDownList(item));
    }

}