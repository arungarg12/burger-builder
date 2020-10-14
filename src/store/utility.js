export const utilityMethod = (state,updatedProperties) =>{
 return{
     ...state,
     ...updatedProperties
 }
}