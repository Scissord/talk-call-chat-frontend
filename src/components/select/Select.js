import React from "react"

export function Select(props) {
  return (
    <form class="max-w-sm">
      {props.label && (
        <label
          for="countries"
          class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
        >
          {props.label}
        </label>
      )}

      <select
        onChange={(e) =>
          props.onChange && props.onChange(e.target.value ?? "unselected")
        }
        value={props.default || null}
        id={props.id}
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {props.options.map((o) => (
          <option className="" value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </form>
  )
}
