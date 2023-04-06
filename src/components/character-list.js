import React from 'react';
import CharacterListItem from './character-list-item';

const CharacterList = props => {

	return (
		<div className="col-md-4">
			{props.characters.map(character => (
				<CharacterListItem
					key={character.id}
					character={character}
					onCharacterSelect={props.onCharacterSelect}
				/>
			))}
		</div>
	);
};

export default CharacterList;
