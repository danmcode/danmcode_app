import { UUID } from 'crypto';
import { getResource, postResource } from '../../infraestructure/api.endpoints';
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
        const data = await getResource('dropdown-lists');
        return data['dropdownLists'].map((item: DropDownListData) => new DropDownList(item));
    }

    static async create(data: any) {
        try {
            const response = await postResource('dropdown-lists', data);
            return response;
          } catch (error: any) {
            throw error;
          }
    }

    static async edit(data: any) {
        try {
            const response = await postResource('dropdown-lists/update', data);
            return response;
          } catch (error: any) {
            throw error;
          }
    }

    static async search(data: any) {
        try {
            const response = await postResource('dropdown-lists/search', data);
            return response;
          } catch (error: any) {
            throw error;
          }
    }

    static async delete(data: any) {
        const response = await postResource('dropdown-lists/delete', data);
        return response;
    }
}