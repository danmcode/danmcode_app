import { Sequelize } from 'sequelize';
import { DropDownList } from './dropdown.list';
import { DropDownListItem } from './dropdown.list.item';
import { User } from './user.model';
import { Client } from './client.model';
import { Location } from './location';

DropDownList.hasMany(DropDownListItem, { foreignKey: 'list_id', as: 'dropdown_list_items' });
DropDownListItem.belongsTo(DropDownList, { foreignKey: 'list_id', as: 'dropdown_list' });

User.belongsTo(DropDownListItem, { foreignKey: 'identification_type_id', as: 'identification_type' });

Client.belongsTo(DropDownListItem, { foreignKey: 'client_type_id', as: 'client_type' });
Client.belongsTo(User, { foreignKey: 'created_by', as: 'client_created_by' });
Client.belongsTo(User, { foreignKey: 'updated_by', as: 'client_updated_by' });
Client.hasMany(Location, { foreignKey: 'client_id', as: 'locations' })

Location.belongsTo(User, { foreignKey: 'created_by', as: 'location_created_by' });
Location.belongsTo(User, { foreignKey: 'updated_by', as: 'location_updated_by' });
Location.belongsTo(Client, { foreignKey: 'client_id', as: 'client' });
Location.belongsTo(DropDownListItem, { foreignKey: 'location_type_id', as: 'location_type' });

export { DropDownList, DropDownListItem };