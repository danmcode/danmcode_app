import { UUID } from 'crypto';
import { fetchResource } from '../../infraestructure/api.endpoints';

interface DropDownListItemData {
    id: UUID;
    list_id: UUID;
    list_item_name: string;
    description: string;
    is_active: boolean;
}

export class DropDownListItem {

    id: UUID;
    list_id: UUID;
    list_item_name: string;
    description: string;
    is_active: boolean;

    constructor(DropDownListItemdata: DropDownListItemData) {
        const { id, list_item_name, is_active, list_id, description } = DropDownListItemdata;
        this.id = id;
        this.list_id = list_id;
        this.list_item_name = list_item_name;
        this.description = description;
        this.is_active = is_active;
    }

    static async getAll() {
        const data = await fetchResource('dropdown-lists');
        return data['DropDownListItems'].map((item: DropDownListItemData) => new DropDownListItem(item));
    }

}