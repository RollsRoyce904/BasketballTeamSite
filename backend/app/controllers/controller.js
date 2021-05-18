const db = require('../config/db.config.js');
const Player = db.Player;

/**
 * Save a Player object to database MySQL/PostgreSQL
 * @param {*} req 
 * @param {*} res 
 */
exports.createPlayer = (req, res) => {
    let player = {};

    try{
        // Building Player object from upoading request's body
        player.firstname = req.body.firstname;
        player.lastname = req.body.lastname;
        player.age = req.body.age;
    
        // Save to MySQL database
        Player.create(player, 
                          {attributes: ['id', 'firstname', 'lastname', 'age']})
                    .then(result => {    
                      res.status(200).json(result);
                    });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

/**
 * Retrieve Player information from database
 * @param {*} req 
 * @param {*} res 
 */
exports.players = (req, res) => {
    // find all Player information from 
    try{
        Player.findAll({attributes: ['id', 'firstname', 'lastname', 'age']})
        .then(players => {
            res.status(200).json(players);
        })
    }catch(error) {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
    }
}

exports.getPlayer = (req, res) => {
    Player.findByPk(req.params.id, 
                        {attributes: ['id', 'firstname', 'lastname', 'age']})
        .then(player => {
          res.status(200).json(player);
        }).catch(error => {
          // log on console
          console.log(error);

          res.status(500).json({
              message: "Error!",
              error: error
          });
        })
}

/**
 * Updating a Player
 * @param {*} req 
 * @param {*} res 
 */
exports.updatePlayer = async (req, res) => {
    try{
        let player = await Player.findByPk(req.body.id);
    
        if(!player){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a player with id = " + playerId,
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                age: req.body.age
            }
            let result = await Player.update(updatedObject,
                              { 
                                returning: true, 
                                where: {id: req.body.id},
                                attributes: ['id', 'firstname', 'lastname', 'age']
                              }
                            );

            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a player with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json(result);
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a player with id = " + req.params.id,
            error: error.message
        });
    }
}

/**
 *  Delete a Player by ID
 * @param {*} req 
 * @param {*} res 
 */
exports.deletePlayer = async (req, res) => {
    try{
        let playerId = req.params.id;
        let player = await Player.findByPk(playerId);

        if(!player){
            res.status(404).json({
                message: "Does Not exist a Player with id = " + playerId,
                error: "404",
            });
        } else {
            await player.destroy();
            res.status(200);
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a player with id = " + req.params.id,
            error: error.message
        });
    }
}