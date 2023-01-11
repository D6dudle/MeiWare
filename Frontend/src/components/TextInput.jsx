import { useState } from "react";
import { Search } from "react-feather";
import React from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./calendar.css";

import Lupa from "../assets/search.svg";

const lupa = () => ({
  alignItems: "center",
  display: "flex",
  ":before": {
    display: "inline-block",
    paddingTop: "5px",
    content: `url(${Lupa})`,
    zoom: "100%",
    marginRight: 8,
    height: "fit-content",
    width: "fit-content",
  },
});

const nada = () => ({
  alignItems: "center",
  display: "flex",
  ":before": {
    content: '""',
    display: "block",
    marginRight: 8,
    width: "1.8rem",
  },
});

export const customStyles = (valid, iconName, empty) => {
  const icon = (ico) => {
    switch (ico) {
      case "lupa":
        return lupa();
      default:
        return null;
    }
  };

  const space = (ico, emp) => {
    if (emp) {
      return null;
    }
    switch (ico) {
      case "lupa":
        return nada();
      default:
        return null;
    }
  };

  return {
    option: (styles, { isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled
          ? "#3e3e3e"
          : isSelected
          ? "white"
          : isFocused
          ? "#ECC039"
          : "#3e3e3e",
        color: isDisabled ? "#ccc" : isSelected ? "black" : "white",
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? "white"
              : "#ECC039"
            : undefined,
        },
      };
    },
    noOptionsMessage: (base) => ({
      ...base,
      background: "#282828",
    }),
    loadingMessage: (base) => ({
      ...base,
      background: "#282828",
    }),
    control: (base, { isFocused }) => ({
      ...base,
      background: "#282828",
      color: "#F2F2F2",
      backgroundColor: isFocused ? "#ECC039" : "#3e3e3e",

      borderColor: valid ? "#6D6D6D" : "#FF9090",

      // Removes weird border around container
      boxShadow: isFocused ? "#ECC039" : "#ECC039",
      "&:hover": {
        // Overwrittes the different states of border
        borderColor: isFocused ? "#ECC039" : "#ECC039",
      },
    }),
    input: (styles) => ({
      ...styles,
      ...space(iconName, empty),
      color: "#ccc",
    }),
    singleValue: (styles) => ({
      ...styles,
      ...icon(iconName),
      color: "#F2F2F2",
    }),
    placeholder: (styles) => ({ ...styles, ...icon(iconName) }),
    menuList: (base) => ({
      ...base,
      // kill the white space on first and last option
      padding: 0,
    }),
    multiValue: (styles) => {
      return {
        ...styles,
        backgroundColor: "#ECC039",
      };
    },
    multiValueRemove: (styles) => ({
      ...styles,
      color: "#FF9090",
      ":hover": {
        backgroundColor: "white",
        color: "red",
      },
    }),
  };
};

function TextInput({
  index,
  name,
  callback,
  type,
  value = "",
  error,
  list = [],
  multi = false,
  style = null,
  trigger,
  searchCall,
  showTitle = true,
  titleStyle = null,
  placeholder,
}) {
  const [isSubmitted, setSubmitted] = useState(false);
  const [isValid, setValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState(() => {
    if (error == null) {
      switch (type) {
        case "datepicker":
          return "Selecione uma data!";
        case "dropdown":
          if (multi) {
            return "Selecione pelo menos um valor!";
          } else {
            return "Selecione um valor!";
          }
        case "textarea":
          return "Preencha este campo!";
        default:
          return "Preencha este campo!";
      }
    } else {
      return error;
    }
  });

  const validate = () => {
    setSubmitted(true);
  };

  if (trigger) {
    React.useEffect(() => {
      trigger.current = validate;
    }, [trigger]);
  }

  const loadOptions = (inputValue, fetch) => {
    setTimeout(() => {
      fetch(searchCall(inputValue));
    }, 1000);
  };

  switch (type) {
    case "dropsearch":
      return (
        <div className="mb-4">
          <label
            style={{ display: showTitle ? "block" : "none" }}
            htmlFor={name}
            className={`text-gray5 text-[14px] ${titleStyle}`}
          >
            {name}
          </label>
          <AsyncSelect
            noOptionsMessage={() => "Não encontrado"}
            loadingMessage={() => "a pesquisar..."}
            placeholder={placeholder ? placeholder : "pesquisa..."}
            className={` ${style}`}
            styles={
              multi
                ? value.length == 0
                  ? customStyles(true, "lupa", false)
                  : customStyles(true, "lupa", true)
                : customStyles(true, "lupa", false)
            }
            isMulti={multi}
            cacheOptions
            loadOptions={loadOptions}
            defaultOptions
            value={value}
            onChange={(e) => {
              callback(index, e);
              value == null ? setValid(false) : setValid(true);
            }}
          />
          <p
            style={{ display: isSubmitted && !isValid ? "block" : "none" }}
            className="inputTextErrors bottom-0"
          >
            {errorMsg}
          </p>
        </div>
      );
    case "searchbar":
      return (
        <div>
          <label
            style={{ display: showTitle ? "block" : "none" }}
            htmlFor={name}
            className={`text-gray5 text-[14px] ${titleStyle}`}
          >
            {name}
          </label>
          <div className="relative flex items-center">
            <Search className="absolute ml-2" />
            <input
              type="search"
              className={`inputFilter pl-[35px] ${style}`}
              id={name}
              placeholder={placeholder ? placeholder : "pesquisa..."}
              onChange={(e) => {
                callback(index, e);
              }}
              value={value}
            />
          </div>
        </div>
      );
    case "datepicker":
      const [datePick, setDatePick] = useState(false);
      const [date, setDate] = useState(new Date());
      return (
        <div>
          <label
            style={{ display: showTitle ? "block" : "none" }}
            htmlFor={name}
            className={`text-gray5 text-[14px] ${titleStyle}`}
          >
            {name}
          </label>
          <div className="relative">
            <input
              readOnly={true}
              type="text"
              className={`inputText ${style} ${
                isSubmitted ? (isValid ? null : "border-error") : null
              }`}
              id={name}
              placeholder={placeholder ? placeholder : name}
              value={date.toLocaleDateString()}
              onClick={(e) => {
                setDatePick(!datePick);
              }}
            />
            <p className="inputTextErrors">{error}</p>
            <div style={{ display: datePick ? "block" : "none" }}>
              <Calendar
                className="relative"
                color=""
                onChange={(e) => {
                  setDate(e);
                  setDatePick(!datePick);
                  setValid(true);
                  callback(index, e);
                }}
                date={date}
              />
            </div>
          </div>
          <p
            style={{ display: isSubmitted && !isValid ? "block" : "none" }}
            className="inputTextErrors"
          >
            {errorMsg}
          </p>
        </div>
      );
    case "dropdown":
      return (
        <div className="">
          <label
            style={{ display: showTitle ? "block" : "none" }}
            htmlFor={name}
            className={`text-gray5 text-[14px] ${titleStyle}`}
          >
            {name}
          </label>
          <div className="relative">
            <Select
              className={` ${style} ${
                isSubmitted ? (value ? null : "border-error") : null
              }`}
              styles={
                value.length == 0 && isSubmitted === true
                  ? customStyles(false)
                  : customStyles(true)
              }
              options={list}
              isMulti={multi}
              placeholder={placeholder ? placeholder : name}
              value={value}
              onChange={(e) => {
                callback(index, e);
                value == null ? setValid(false) : setValid(true);
              }}
            />
            <p
              style={{ display: isSubmitted && !isValid ? "block" : "none" }}
              className="relative top-1 text-xs text-error"
            >
              {errorMsg}
            </p>
          </div>
        </div>
      );
    case "textarea":
      return (
        <div className="mb-4">
          <label
            style={{ display: showTitle ? "block" : "none" }}
            htmlFor={name}
            className={`text-gray5 text-[14px] ${titleStyle}`}
          >
            {name}
          </label>
          <textarea
            className={`inputText min-h-[130px] ${style} ${
              isSubmitted ? (value ? null : "border-error") : null
            }`}
            id={name}
            placeholder={placeholder ? placeholder : name}
            onChange={(e) => {
              callback(index, e);
              value == null ? setValid(false) : setValid(true);
            }}
            value={value}
          />
          <p
            style={{ display: isSubmitted && !isValid ? "block" : "none" }}
            className="inputTextErrors"
          >
            {errorMsg}
          </p>
        </div>
      );
    default:
      return (
        <div>
          <label
            style={{ display: showTitle ? "block" : "none" }}
            htmlFor={name}
            className={`text-gray5 text-[14px] ${titleStyle}`}
          >
            {name}
          </label>
          <div className="relative">
            <input
              type="text"
              className={`inputText ${style} ${
                isSubmitted ? (value ? null : "border-error") : null
              }`}
              id={name}
              placeholder={placeholder ? placeholder : name}
              onChange={(e) => {
                callback(index, e);
                value == null ? setValid(false) : setValid(true);
              }}
              value={value}
            />
          </div>
          <p
            style={{ display: isSubmitted && !isValid ? "block" : "none" }}
            className="inputTextErrors"
          >
            {errorMsg}
          </p>
        </div>
      );
  }
}

export default TextInput;
