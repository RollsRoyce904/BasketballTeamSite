let express = require('express');
let router = express.Router();
 
const players = require('../controllers/controller.js');

router.post('/api/player', players.createPlayer);
router.get('/api/player/:id', players.getPlayer);
router.get('/api/players', players.players);
router.put('/api/player', players.updatePlayer);
router.delete('/api/player/:id', players.deletePlayer);

module.exports = router;