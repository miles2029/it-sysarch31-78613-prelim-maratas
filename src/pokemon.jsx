import './pokemon.css';

const Pokemon = ({ pokemon, language, currentPage }) => {
  const { id, name, type, base, image } = pokemon;

  return (
    <>
      <div className="card">
        <img src={image} alt="pokemon pic" />
        <h2>
          [{id}]<span>{name[language] || name}</span>
        </h2>
        <h3>{type.map((type, index) => (<span key={index}> {type}</span>))}</h3>
        <p>HP: {base.HP}<span>Speed: {base.Speed}</span></p>
        <p>Attk: {base.Attack} <span>Sp.Attk: {base['Sp. Attack']}</span> </p>
        <p>Def:{base.Defense} <span>Sp.Def: {base['Sp. Defense']} </span> </p>
        <p>Current Page: {currentPage}</p>
      </div>
    </>
  );
};

export default Pokemon;