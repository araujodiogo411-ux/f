import React, { useState } from 'react';
import { Film, Clapperboard, AlertCircle } from 'lucide-react';
import { Genre, AgeRating, MovieRecommendation } from './types';
import { getMovieRecommendation } from './services/geminiService';
import { Select } from './components/Select';
import { Button } from './components/Button';
import { MovieResult } from './components/MovieResult';

const App: React.FC = () => {
  const [genre, setGenre] = useState<Genre>(Genre.ACTION);
  const [ageRating, setAgeRating] = useState<AgeRating>(AgeRating.TWELVE);
  const [loading, setLoading] = useState<boolean>(false);
  const [movie, setMovie] = useState<MovieRecommendation | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setMovie(null);

    try {
      const result = await getMovieRecommendation(genre, ageRating);
      setMovie(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const genreOptions = Object.values(Genre).map(g => ({ label: g, value: g }));
  const ageOptions = Object.values(AgeRating).map(a => ({ label: a, value: a }));

  return (
    <div className="min-h-screen pb-20 bg-[#141414] text-white selection:bg-netflix-red selection:text-white">
      {/* Navbar */}
      <nav className="border-b border-neutral-800 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Film className="w-8 h-8 text-netflix-red" />
              <span className="text-xl font-bold tracking-tight text-netflix-red">CINEPICKER AI</span>
            </div>
            <div className="text-xs text-gray-500 hidden sm:block">
              Powered by Gemini 2.5
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
            Não sabe o que assistir?
          </h1>
          <p className="text-xl text-gray-400">
            Deixe nossa IA escolher o filme perfeito para você com base no seu gosto e classificação desejada.
          </p>
        </div>

        {/* Controls */}
        <div className="bg-neutral-900/50 p-6 rounded-xl border border-neutral-800 shadow-xl max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Select 
              label="Qual o gênero?"
              value={genre}
              onChange={(val) => setGenre(val as Genre)}
              options={genreOptions}
              icon={<Clapperboard className="w-5 h-5" />}
            />
            
            <Select 
              label="Classificação Indicativa"
              value={ageRating}
              onChange={(val) => setAgeRating(val as AgeRating)}
              options={ageOptions}
              icon={<AlertCircle className="w-5 h-5" />}
            />
          </div>

          <Button 
            onClick={handleSearch} 
            isLoading={loading} 
            className="w-full text-lg h-14"
          >
            SORTEAR FILME
          </Button>

          {error && (
            <div className="mt-4 p-4 bg-red-900/20 border border-red-900/50 text-red-200 rounded-md text-center">
              {error}
            </div>
          )}
        </div>

        {/* Results */}
        <div className="min-h-[400px]">
          {movie && <MovieResult movie={movie} />}
          
          {!movie && !loading && !error && (
            <div className="flex flex-col items-center justify-center h-64 text-gray-600 mt-10">
              <Film className="w-16 h-16 mb-4 opacity-20" />
              <p>Selecione os filtros e clique em sortear.</p>
            </div>
          )}
        </div>

      </main>
    </div>
  );
};

export default App;