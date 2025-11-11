import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center px-4 text-center">
      
      <div className="relative mb-8">
        <FontAwesomeIcon icon={faTriangleExclamation} className="text-9xl text-neon/20 absolute top-0 left-0.5 animate-pulse" />
        <FontAwesomeIcon icon={faTriangleExclamation} className="text-9xl text-red-500/20 absolute top-0 -left-0.5 animate-pulse delay-75" />
        <FontAwesomeIcon icon={faTriangleExclamation} className="text-9xl text-neon relative z-10" />
      </div>

      <h1 className="text-6xl md:text-8xl font-heading font-bold text-white mb-4">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-heading text-white mb-6">
        Página não encontrada_
      </h2>
      
      <p className="text-gray-muted text-lg max-w-md mb-10 font-mono">
        O recurso que você está tentando acessar foi movido, deletado ou nunca existiu nesta dimensão.
      </p>

      <Link 
        href="/" 
        className="bg-neon text-dark font-heading font-bold px-8 py-4 rounded-xl hover:bg-neon-dark hover:scale-105 transition-all duration-300 flex items-center gap-3 shadow-neon"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        Voltar para a Base
      </Link>

    </div>
  );
}