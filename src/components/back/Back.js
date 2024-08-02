import { Icon } from "components/lib"
import React from "react"
import { useNavigate } from "react-router-dom"

export function Back() {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(-1)}
      className="rounded-md px-3 bg-neutral-700 text-white hover:bg-neutral-800 transition-colors w-fit"
    >
      <div className="flex items-center gap-2">
        <Icon image="arrow-left" />
        <div className="text-sm font-light">Вернуться</div>
      </div>
    </button>
  )
}
