import React from 'react';
import { MovieRecommendation } from '../types';
import { Play, ThumbsUp, ThumbsDown, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface MovieResultProps {
  movie: MovieRecommendation;
}

export const MovieResult: React.FC<MovieResultProps> = ({ movie }) => {
  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'Excellent': return 'text-green-400 border-green-500/30 bg-green-500/10';
      case 'Good': return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
      case 'Average': return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10';
      case 'Bad': return 'text-red-500 border-red-500/30 bg-red-500/10';
      default: return 'text-gray-400';
    }
  };

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case 'Excellent': return <ThumbsUp className="w-5 h-5 mr-2" />;
      case 'Good': return <CheckCircle className="w-5 h-5 mr-2" />;
      case 'Average': return <Info className="w-5 h-5 mr-2" />;
      case 'Bad': return <ThumbsDown className="w-5 h-5 mr-2" />;
      default: return null;
    }
  };

  const trailerUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + " " + movie.year + " trailer oficial legendado")}`;

  return (
    <div className="w-full max-w-2xl mx-auto bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl animate-fade-in-up mt-8">
      {/* Header Banner Style */}
      <div className="bg-gradient-to-r from-neutral-800 to-neutral-900 p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Play className="w-32 h-32" />
        </div>
        
        <div className="relative z-10">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-netflix-red text-white text-xs font-bold px-2 py-1 rounded">
              {movie.genre}
            </span>
            <span className="bg-white text-black text-xs font-bold px-2 py-1 rounded">
              {movie.year}
            </span>
            <span className={`border border-white/30 text-white text-xs font-bold px-2 py-1 rounded`}>
              {movie.ageRating}
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 leading-tight">
            {movie.title}
          </h2>
          {movie.originalTitle !== movie.title && (
            <p className="text-gray-400 italic text-sm mb-4">Original: {movie.originalTitle}</p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8 space-y-6">
        
        <div>
          <h3 className="text-gray-400 text-xs uppercase tracking-wider font-semibold mb-2">Sinopse</h3>
          <p className="text-gray-100 leading-relaxed text-lg">
            {movie.plot}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg border flex flex-col justify-between ${getVerdictColor(movie.verdict)}`}>
             <div className="flex items-center mb-2 font-bold">
               {getVerdictIcon(movie.verdict)}
               {movie.verdictText}
             </div>
             <p className="text-sm opacity-90">{movie.reasoning}</p>
          </div>
          
          <div className="p-4 rounded-lg bg-neutral-800 border border-neutral-700">
            <h4 className="text-gray-400 text-xs uppercase tracking-wider font-semibold mb-2">Direção</h4>
            <p className="text-white font-medium">{movie.director}</p>
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-800">
          <a 
            href={trailerUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full block"
          >
            <button className="w-full bg-white text-black hover:bg-gray-200 font-bold text-lg py-4 rounded-md transition-colors flex items-center justify-center group">
              <Play className="w-6 h-6 mr-3 fill-black group-hover:scale-110 transition-transform" />
              Assistir Trailer no YouTube
            </button>
          </a>
          <p className="text-center text-xs text-gray-500 mt-3">
            O link abrirá uma busca direta pelo trailer no YouTube.
          </p>
        </div>

      </div>
    </div>
  );
};