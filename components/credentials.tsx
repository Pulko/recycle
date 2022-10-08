import React from 'react'

const Credentials = () => (
  <div className="flex flex-col justify-between">
    <div className="text-emerald-200 text-xs flex">
      {new Date().getFullYear()}
      {' (c) '}
      Made by
      <a
        href="https://www.github.com/Pulko"
        className="mx-1 underline"
        target="_blank"
        rel="noreferrer"
      >
        Pulko
      </a>
    </div>

    <p className="text-emerald-200 text-xs underline">
      <a
        href="https://api.hamburg.de/datasets/v1/abfall_recycling/api#/"
        target="_blank"
        rel="noreferrer"
      >
        Abfall und Recycling Hamburg API
      </a>
    </p>
  </div>
)

export default Credentials
