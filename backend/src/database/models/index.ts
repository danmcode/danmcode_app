import { Sequelize } from 'sequelize';
import { DropDownList } from './dropdown.list';
import { DropDownListItem } from './dropdown.list.item';
import { User } from './user.model';
import { Client } from './client.model';
import { Location } from './location';
import { SubLocation } from './sub.location';
import { JobTitle } from './job.titles.model';
import { Contact } from './contact';
import { Arl } from './arl';
import { Vehicle } from './vehicle';

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
Location.hasMany(SubLocation, { foreignKey: 'location_id', as: 'sublocations' })

SubLocation.belongsTo(User, { foreignKey: 'created_by', as: 'sub_location_created_by' });
SubLocation.belongsTo(User, { foreignKey: 'updated_by', as: 'sub_location_updated_by' });
SubLocation.belongsTo(DropDownListItem, { foreignKey: 'location_type_id', as: 'location_type' });
SubLocation.belongsTo(Location, { foreignKey: 'location_id', as: 'location' });

JobTitle.belongsTo(User, { foreignKey: 'created_by', as: 'location_type_created_by' });
JobTitle.belongsTo(User, { foreignKey: 'updated_by', as: 'location_type_updated_by' });
JobTitle.belongsTo(Client, { foreignKey: 'client_id', as: 'client' });

Contact.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Contact.belongsTo(DropDownListItem, { foreignKey: 'contact_type_id', as: 'contact_type' });
Contact.belongsTo(DropDownListItem, { foreignKey: 'resident_type_id', as: 'resident_type' });
Contact.belongsTo(JobTitle, { foreignKey: 'job_title_id', as: 'job_title' });
Contact.belongsTo(Client, { foreignKey: 'client_id', as: 'client' });
Contact.belongsTo(SubLocation, { foreignKey: 'sub_location_id', as: 'sub_location' });
Contact.belongsTo(User, { foreignKey: 'created_by', as: 'contact_created_by' });
Contact.belongsTo(User, { foreignKey: 'updated_by', as: 'contact_updated_by' });

Arl.belongsTo(User, { foreignKey: 'created_by', as: 'arl_created_by' });
Arl.belongsTo(User, { foreignKey: 'updated_by', as: 'arl_updated_by' });

Vehicle.belongsTo(Contact, { foreignKey: 'contact_id', as: 'contact' });
Vehicle.belongsTo(DropDownListItem, { foreignKey: 'vechicle_type_id', as: 'vehicle_type' });
Vehicle.belongsTo(User, { foreignKey: 'created_by', as: 'vehicle_created_by' });
Vehicle.belongsTo(User, { foreignKey: 'updated_by', as: 'vehicle_updated_by' });


export { DropDownList, DropDownListItem };