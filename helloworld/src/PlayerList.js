import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class PlayerList extends Component {

  constructor(props) {
    super(props);
    this.state = {players: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('api/players')
      .then(response => response.json())
      .then(data => this.setState({players: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/api/player/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedPlayers = [...this.state.players].filter(i => i.id !== id);
      this.setState({players: updatedPlayers});
    });
  }

  render() {
    const {players, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const playerList = players.map(player => {
      return <tr key={player.id}>
        <td style={{whiteSpace: 'nowrap'}}>{player.firstname}</td>
        <td>{player.lastname}</td>
        <td>{player.age}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/players/" + player.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(player.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/players/new">Add Player</Button>
          </div>
          <h3>Player List</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">Firstname</th>
                <th width="20%">Lastname</th>
                <th width="10%">Age</th>
                <th width="10%">Actions</th>
              </tr>
            </thead>
            <tbody>
            {playerList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default PlayerList;