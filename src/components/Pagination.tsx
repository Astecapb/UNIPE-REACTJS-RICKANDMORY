/*interface Props {
  next: string | null
  prev: string | null
  onNavigate: (url: string) => void
}

export default function Pagination({ next, prev, onNavigate }: Props) {
  return (
    <div className="flex justify-between mt-6">
      <button disabled={!prev} onClick={() => prev && onNavigate(prev)} className="btn">Anterior</button>
      <button disabled={!next} onClick={() => next && onNavigate(next)} className="btn">Próxima</button>
    </div>
  )
}


interface Props {
  next: string | null
  prev: string | null
  onNavigate: (url: string) => void
  currentPage: number
  totalPages: number
}*/



/*
export default function Pagination({ next, prev, onNavigate, currentPage, totalPages }: Props) {
  return (
    <div className="mt-8 text-center space-x-4">
      <button
        disabled={!prev}
        onClick={() => prev && onNavigate(prev)}
        className="px-4 py-2 bg-orange-100 rounded hover:bg-orange-200 disabled:opacity-50"
      >
        Anterior
      </button>
      <span className="font-medium">Página {currentPage} de {totalPages}</span>
      <button
        disabled={!next}
        onClick={() => next && onNavigate(next)}
        className="px-4 py-2 bg-orange-100 rounded hover:bg-orange-200 disabled:opacity-50"
      >
        Próxima
      </button>
    </div>
  )
}



interface Props {
  next: string | null
  prev: string | null
  onNavigate: (url: string) => void
  currentPage: number
  totalPages: number
}

export default function Pagination({ next, prev, onNavigate, currentPage, totalPages }: Props) {
  return (
    <div className="mt-8 text-center space-x-4">
      <button
        disabled={!prev}
        onClick={() => prev && onNavigate(prev)}
        className="px-4 py-2 bg-orange-100 rounded hover:bg-orange-200 disabled:opacity-50"
      >
        Anterior
      </button>
      <span className="font-medium">Página {currentPage} de {totalPages}</span>
      <button
        disabled={!next}
        onClick={() => next && onNavigate(next)}
        className="px-4 py-2 bg-orange-100 rounded hover:bg-orange-200 disabled:opacity-50"
      >
        Próxima
      </button>
    </div>
  )
}*/


interface Props {
  next: string | null
  prev: string | null
  onNavigate: (url: string) => void
  currentPage: number
  totalPages: number
}

export default function Pagination({ next, prev, onNavigate, currentPage, totalPages }: Props) {
  return (
    <div className="mt-8 text-center space-x-4">
      <button
        disabled={!prev}
        onClick={() => prev && onNavigate(prev)}
        className="px-4 py-2 bg-orange-100 rounded hover:bg-orange-200 disabled:opacity-50"
      >
        Anterior
      </button>
      <span className="font-medium">Página {currentPage} de {totalPages}</span>
      <button
        disabled={!next}
        onClick={() => next && onNavigate(next)}
        className="px-4 py-2 bg-orange-100 rounded hover:bg-orange-200 disabled:opacity-50"
      >
        Próxima
      </button>
    </div>
  )
}
