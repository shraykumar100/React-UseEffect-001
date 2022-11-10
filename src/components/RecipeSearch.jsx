import React, { useState, useEffect } from "react";

const RecipeSearch = () => {

  const [ recipeItem, setRecipeItem ] = useState( "" );

  const [ data, setData ] = useState( [] );

  const [ clickHandler, setClickHandler ] = useState( false );

    useEffect( () => {
        fetch(
            `https://api.edamam.com/api/recipes/v2?q=${ recipeItem }&app_id=39f5a4f5&app_key=8926e463e917ad2f8009f5eb97ad6272&type=public`
        )
            .then( ( Response ) => Response.json() )
            .then( ( data ) => {
                const fetchedData = data.hits;
                setData( fetchedData );
            } );
    }, [ clickHandler, recipeItem ] );


  return (
    <div>
      <div className="input-div">
        <input className="input-field" type="text" onChange={ ( e ) => {
          setRecipeItem( e.target.value );
        } }
          placeholder="Search"
        ></input>
        <button className="search-btn"
          onClick={ () => {
            setClickHandler( !clickHandler );
          } }
        >
          🔍
        </button>
      </div>
      <div className="img-div">
        { data.map( ( item, i ) => {
          return (
            <div key={ i }>
              <img className="img" src={ item.recipe.image } alt="recipe_img" />
              <br />
              <h3 className="recipe-name">{ item.recipe.label }</h3>
            </div>
          );
        } ) }
      </div>
    </div>
  );
};

export default RecipeSearch;