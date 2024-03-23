import React, { useState, useEffect } from 'react';
import Pokemon from './pokemon.jsx';

function Pokedex() {
    const [pokemonList, setPokemonList] = useState([]);
    const [language, setLanguage] = useState('english');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemon = async () => {
            setLoading(true);
            const response = await fetch(`https://us-central1-it-sysarch32.cloudfunctions.net/pagination?page=${currentPage}`);
            const data = await response.json();
            setPokemonList(data.data || []);
            setTotalPages(data.totalPages || 0);
            setLoading(false);
        };

        fetchPokemon();
    }, [currentPage]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleChangeLanguage = (newLanguage) => {
        setLanguage(newLanguage);
    };

    return (
        <div>
            <div>
                <button onClick={() => handleChangeLanguage('english')}>English</button>
                <button onClick={() => handleChangeLanguage('japanese')}>Japanese</button>
                <button onClick={() => handleChangeLanguage('chinese')}>Chinese</button>
                <button onClick={() => handleChangeLanguage('french')}>French</button>
            </div>
            <div className='pageCounter'>
                <p>{currentPage} to  {totalPages}</p>
            </div>
            <div className="pagination">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Back
                </button>
                {[...Array(totalPages).keys()].map((page) => (
                    <button key={page + 1} onClick={() => handlePageChange(page + 1)} className={currentPage === page + 1 ? 'active' : ''}>
                        {page + 1}
                    </button>
                ))}
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>

            <div className="pokedex">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    pokemonList.map(pokemon => (
                        <Pokemon key={pokemon.id} pokemon={pokemon} language={language} />
                    ))
                )}
            </div>
        </div>

        
    );
}

export default Pokedex;
