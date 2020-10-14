import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css'

const burger = (props) => {
    console.log(props.burgerIngredients);
    let transformedIngredient = Object.keys(props.burgerIngredients)
            .map(igkey=> {
                    return [...Array(props.burgerIngredients[igkey])]
                    .map((_,i)=>{ 
                        return (
                        <BurgerIngredient key={igkey+i} type={igkey} />
                    )
                    })
            }  ).reduce((arr,el)=>{
                return arr.concat(el);
            },[])

           // console.log('transformedIngredient:',transformedIngredient,transformedIngredient);
           if(transformedIngredient.length===0){
               transformedIngredient = <p>Please start adding ingredients</p>
           }
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {transformedIngredient}
            <BurgerIngredient type='bread-bottom'></BurgerIngredient>
            
        </div>
    )

}

export default burger;