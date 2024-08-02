import React, { useState, useEffect } from "react";
import { default as RSS } from "react-select-search";
import "./react-select-search.css";
import { Icon } from "components/lib";

export function SelectSearch(props) {
  const [options, setOptions] = useState([])

  useEffect(() => {
    let arr = props.options ?? []

    arr.forEach((option) => {
      option.value = option[props.id ?? "id"]
    })

    setOptions([...arr])
  }, [props.options])

  const css = {
    wrapper: "select-type-1 relative",
    icon: "absolute right-1.5 top-2 hover:text-slate-400 cursor-pointer text-slate-500 z-10",
  }

  return (
    <div
      className={
        css.wrapper + " " + (props.className ?? "") + props.disabled ??
        " pointer-events-none opacity-60 "
      }
    >
      <RSS
        options={options ?? []}
        value={props.value}
        name={props.name ?? "name"}
        placeholder={props.placeholder ?? "Поиск..."}
        search={true}
        onChange={props.onChange}
        disabled={props.disabled}
      />

      {/* {props.hide ||
        (props.value && (
          <div
            onClick={() => props.onChange(null)}
            className={props.disabled ? "hidden" : "block"}
          >
            <Icon image={"x"} size={14} className={css.icon} />
          </div>
        ))} */}
    </div>
  )
}
