import React, { useEffect, useReducer } from "react";

import { ValidatorType, validate } from "../../utils/validators";

type InputProps = {
  className?: string;
  type: string;
  id: string;
  label: string;
  validators: ValidatorType[];
  errorText: string;
  onInput: Function;
};

type InputState = {
  value: string;
  isTouched: boolean;
  isValid: boolean;
};

type InputAction = {
  type: "CHANGE" | "TOUCH" | "TOUCH_PHONE";
  val?: string;
  validators?: ValidatorType[];
};

const inputReducer = (state: InputState, action: InputAction): InputState => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val!,
        isValid: validate(action.val!, action.validators!),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    case "TOUCH_PHONE":
      return {
        ...state,
        isValid: true,
      };
    default:
      return state;
  }
};

const Input: React.FC<InputProps> = (props) => {
  const [inputState, dispatch] = useReducer<React.Reducer<InputState, InputAction>>(inputReducer, {
    value: "",
    isTouched: false,
    isValid: false,
  });

  const { id, onInput } = props;
  useEffect(() => {
    onInput(id, inputState.value, inputState.isValid);
  }, [inputState.isValid, inputState.value, onInput, id]);

  const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    dispatch({ type: "CHANGE", val: event.target.value, validators: props.validators });
  };

  const focusHandler = (event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (props.type === "phone") {
      dispatch({ type: "TOUCH_PHONE" });
    }
  };

  const touchHandler = (event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    dispatch({ type: "TOUCH" });
  };

  return (
    <>
      <label>
        <span style={{ display: "none" }}>{props.label}</span>
        {props.type === "textarea" ? (
          <textarea
            className={inputState.isTouched && !inputState.isValid ? "error" : ""}
            name={props.id}
            id={props.id}
            placeholder={props.label}
            onBlur={touchHandler}
            onChange={changeHandler}
            onFocus={focusHandler}
            value={inputState.value}
          />
        ) : (
          <input
            className={inputState.isTouched && !inputState.isValid ? "error" : ""}
            type={props.type}
            name={props.id}
            id={props.id}
            placeholder={props.label}
            onBlur={touchHandler}
            onChange={changeHandler}
            onFocus={focusHandler}
            value={inputState.value}
          />
        )}
      </label>
      {inputState.isTouched && !inputState.isValid && <div className="error-message">{props.errorText}</div>}
    </>
  );
};

export default Input;
