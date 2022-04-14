'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Comments","User_code",{
      type:Sequelize.INTEGER,
    });
    await queryInterface.addConstraint("Comments",{
      fields:["User_code"],
      type: "foreign key",
      name:"Users_Comments_id_fk",
      references:{
        table:"Users",
        field:"id",
      },
      onDelete:"cascade",
      onUpdate:"cascade",
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Comments","User_code");
  }
};
