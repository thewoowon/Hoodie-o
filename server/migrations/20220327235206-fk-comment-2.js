'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addColumn("Comments","Notice_code",{
      type:Sequelize.INTEGER,
    });
    await queryInterface.addConstraint("Comments",{
      fields:["Notice_code"],
      type: "foreign key",
      name:"Notices_Comments_id_fk",
      references:{
        table:"Notices",
        field:"id",
      },
      onDelete:"cascade",
      onUpdate:"cascade",
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Comments","Notice_code");
  }
};
