import React, { Component } from 'react';
import SearchBar from './search-bar';
import CharacterList from './character-list';
import Details from './details';

import md5 from 'md5';
import $ from 'jquery';

const API_URL = 'http://gateway.marvel.com/v1/public/';
const publicKey = 'f1c934882efbd3f32f5fc7d7544987ac';
const privateKey = '00ad36f43c0abd2961789d27b58d0345670d095a';
const ts = '1';
const auth = `ts=${ts}&apikey=${publicKey}&hash=${md5(`${ts}${privateKey}${publicKey}`)}`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      characters: null,
      selectedCharacter: null,
    };

    this.characterSearch = this.characterSearch.bind(this);
    this.handleCharacterSelect = this.handleCharacterSelect.bind(this);
  }

  componentWillMount() {
    this.getInitialChararcters();
  };

  getInitialChararcters() {
    $.getJSON(`${API_URL}/characters?${auth}&limit=5`, result => {
      const characters = result.data.results;
      this.setState({ characters });
    });
  }

  characterSearch(term) {
    $.getJSON(`${API_URL}/characters?${auth}&limit=5&nameStartsWith=${term}`, result => {
      const characters = result.data.results;
      this.setState({ characters });
    });
  }

  handleCharacterSelect(character) {
    this.setState({ selectedCharacter : character });
  };

  render() {
    if (!this.state.characters) return <h1>Loading...</h1>;
    return (
      <div className="container">
        <SearchBar onSearchButtonClick={this.characterSearch} />
        <CharacterList
          characters={this.state.characters}
          onCharacterSelect={this.handleCharacterSelect}
        />
        <Details character={this.state.selectedCharacter || this.state.characters[0]} />
      </div>
    );
  }
}

export default App;
