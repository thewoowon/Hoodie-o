'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Files', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fileName: {
        type: Sequelize.STRING
      },
      fileSize: {
        type: Sequelize.INTEGER
      },
      fileType: {
        type: Sequelize.STRING
      },
      fileLocation: {
        type: Sequelize.STRING
      },
      wdate: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addColumn("Files","Notice_code",{
      type:Sequelize.INTEGER,
    });
    await queryInterface.addConstraint("Files",{
      fields:["Notice_code"],
      type: "foreign key",
      name:"Notices_Files_id_fk",
      references:{
        table:"Notices",
        field:"id",
      },
      onDelete:"cascade",
      onUpdate:"cascade",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Files');
  }
};