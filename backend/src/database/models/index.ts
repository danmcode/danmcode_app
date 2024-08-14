import { Sequelize } from 'sequelize';
import { DropDownList } from './dropdown.list';
import { DropDownListItem } from './dropdown.list.item';
import { User } from './user.model';

DropDownList.hasMany(DropDownListItem, { foreignKey: 'list_id', as: 'dropdown_list_items' });
DropDownListItem.belongsTo(DropDownList, { foreignKey: 'list_id', as: 'dropdown_list' });

User.belongsTo(DropDownListItem, { foreignKey: 'identification_type_id', as: 'identification_type' });

export { DropDownList, DropDownListItem };