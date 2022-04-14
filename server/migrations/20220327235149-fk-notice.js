'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addColumn("Notices","User_code",{
      type:Sequelize.INTEGER,
    });
    await queryInterface.addConstraint("Notices",{
      fields:["User_code"],
      type: "foreign key",
      name:"Users_Notices_id_fk",
      references:{
        table:"Users",
        field:"id",
      },
      onDelete:"cascade",
      onUpdate:"cascade",
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Notices","User_code");
  }
};
