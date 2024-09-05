import { UUID } from 'crypto';
import { fetchResource } from '../../infraestructure/api.endpoints';

interface DropDownListData {
    id: UUID;
    list_name: string;
    is_active: boolean;
}

export class DropDownList {

    id: UUID;
    list_name: string;
    is_active: boolean;

    constructor(dropDownListdata: DropDownListData) {
        const { id, list_name, is_active } = dropDownListdata;
        this.id = id;
        this.list_name = list_name;
        this.is_active = is_active;
    }

    static async getAll() {
        const data = await fetchResource('dropdown-lists');
        return data['dropdownLists'].map((item: DropDownListData) => new DropDownList(item));
    }


}