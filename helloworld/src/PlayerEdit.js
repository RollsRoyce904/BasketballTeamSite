
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class PlayerEdit extends Component {

  emptyPlayer = {
    firstname: '',
    lastname: '',
    age: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyPlayer
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const player = await (await fetch(`/api/player/${this.props.match.params.id}`)).json();
      this.setState({item: player});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    await fetch('/api/player', {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/players');
  }

  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Edit Player' : 'Add Player'}</h2>;

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="firstname">Firstname</Label>
            <Input type="text" name="firstname" id="firstname" value={item.firstname || ''}
                   onChange={this.handleChange} autoComplete="firstname"/>
          </FormGroup>
          <FormGroup>
            <Label for="lastname">Lastname</Label>
            <Input type="text" name="lastname" id="lastname" value={item.lastname || ''}
                   onChange={this.handleChange} autoComplete="lastname"/>
          </FormGroup>          
          <FormGroup>
            <Label for="age">Age</Label>
            <Input type="text" name="age" id="age" value={item.age || ''}
                   onChange={this.handleChange} autoComplete="age"/>
          </FormGroup>
         
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/players">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(PlayerEdit);