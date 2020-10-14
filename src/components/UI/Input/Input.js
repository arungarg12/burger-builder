import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let inputElement = '';
    let inputElementClasses = [classes.InputElement];
    let validationError = '';
    console.log('inValid in input js=', props.inValid);
    console.log('element type in input js=', props.elementType);
    if (props.inValid && props.isTouched && props.shouldValidate) {
        inputElementClasses.push(classes.InValid)
        validationError = <p className={classes.ValidationMessage}>Please enter a valid value for {props.label}</p>
    }
    console.log(inputElementClasses);
    switch (props.elementType) {
        case ('input'):
            console.log('for', props.label);
            inputElement = <input
                className={inputElementClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.updateValue} />;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputElementClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.updateValue} />;
            break;
        case ('select'):
            console.log(props.elementConfig.options);
            inputElement = (<select
                className={inputElementClasses.join(' ')}
                value={props.value}
                onChange={props.updateValue}>
                {props.elementConfig.options.map(option => {
                    return (<option key={option.value}
                        value={option.value}>
                        {option.displayValue}
                    </option>
                    )
                })}
            </select>);
            break;
        default:
            inputElement = <input
                className={inputElementClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.updateValue} />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>

    );
}



export default input;