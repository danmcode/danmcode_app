import { Sequelize } from 'sequelize';
import { DropDownList } from './dropdown.list';
import { DropDownListItem } from './dropdown.list.item';
import { User } from './user.model';
import { Client } from './client.model';

DropDownList.hasMany(DropDownListItem, { foreignKey: 'list_id', as: 'dropdown_list_items' });
DropDownListItem.belongsTo(DropDownList, { foreignKey: 'list_id', as: 'dropdown_list' });

User.belongsTo(DropDownListItem, { foreignKey: 'identification_type_id', as: 'identification_type' });

Client.belongsTo(DropDownListItem, { foreignKey: 'client_type_id', as: 'client_type' });
Client.belongsTo(User, { foreignKey: 'created_by', as: 'client_created_by' });
Client.belongsTo(User, { foreignKey: 'updated_by', as: 'client_updated_by' });

export { DropDownList, DropDownListItem };