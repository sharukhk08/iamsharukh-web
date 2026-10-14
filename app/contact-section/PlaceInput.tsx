'use client'
import { KeyboardEvent, useState } from 'react'
import { PLACES } from './places'

// A text field with a suggestion list that opens directly under it. Replaces the
// browser's <datalist>, whose popup can appear far from the field inside animated
// or transformed containers. People can still type any place.
export default function PlaceInput({
  id,
  value,
  onChange,
  className,
  invalid,
  describedBy,
}: {
  id: string
  value: string
  onChange: (value: string) => void
  className: string
  invalid?: boolean
  describedBy?: string
}) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)

  const query = value.trim().toLowerCase()
  const matches = PLACES.filter((place) =>
    query ? place.toLowerCase().includes(query) : true,
  )
    .filter((place) => place.toLowerCase() !== query)
    .slice(0, 6)
  const visible = open && matches.length > 0

  const choose = (place: string) => {
    onChange(place)
    setOpen(false)
    setActive(-1)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setOpen(true)
      setActive((current) => (current + 1) % Math.max(matches.length, 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActive((current) => (current <= 0 ? matches.length - 1 : current - 1))
    } else if (event.key === 'Enter' && visible && active >= 0) {
      event.preventDefault()
      choose(matches[active])
    } else if (event.key === 'Escape' && visible) {
      event.stopPropagation()
      setOpen(false)
    }
  }

  return (
    <div className="relative">
      <input
        id={id}
        type="text"
        role="combobox"
        aria-expanded={visible}
        aria-controls={`${id}-list`}
        aria-autocomplete="list"
        aria-activedescendant={active >= 0 && visible ? `${id}-opt-${active}` : undefined}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        autoComplete="off"
        placeholder="Start typing, for example Hisar"
        maxLength={100}
        value={value}
        className={className}
        onChange={(event) => {
          onChange(event.target.value)
          setOpen(true)
          setActive(-1)
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={onKeyDown}
      />
      {visible && (
        <ul
          id={`${id}-list`}
          role="listbox"
          className="absolute left-0 right-0 top-full z-20 mt-1 max-h-60 overflow-auto rounded-xl border border-gray-600 bg-secondary py-1 shadow-xl"
        >
          {matches.map((place, index) => (
            <li
              key={place}
              id={`${id}-opt-${index}`}
              role="option"
              aria-selected={index === active}
              // mousedown, not click, so the field does not lose focus first
              onMouseDown={(event) => {
                event.preventDefault()
                choose(place)
              }}
              onMouseEnter={() => setActive(index)}
              className={`cursor-pointer px-3 py-2 text-[15px] ${
                index === active ? 'bg-ink/15' : ''
              }`}
            >
              {place}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
