import React from 'react';
import CategoryCard from '../Card/CategoryCard';

class Home extends React.Component{

    render(){
        return(
            <div  className="d-flex justify-content-center align-items-center h-100">
                                <a href="/characters">
                                    <CategoryCard>
                                        <h1>Characters</h1>
                                    </CategoryCard>
                                </a>

                                <a href="/locations">
                                    <CategoryCard>
                                        <h1>Locations</h1>
                                    </CategoryCard>
                                </a>

                                <a href="/episodes">
                                    <CategoryCard>
                                        <h1>Episodes</h1>
                                    </CategoryCard>
                                </a>
                                </div>
        )
    }

}

export default Home;