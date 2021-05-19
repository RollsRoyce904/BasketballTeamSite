module.exports = (sequelize, Sequelize) => {
	const Player = sequelize.define('player', {	
	  id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
	  firstname: {
			type: Sequelize.STRING
	    },
	  lastname: {
		  type: Sequelize.STRING
  	    },
	  age: {
			type: Sequelize.INTEGER
        }
	});
	
	return Player;
}