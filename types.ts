export enum Genre {
  ACTION = 'Ação',
  COMEDY = 'Comédia',
  HORROR = 'Terror',
  DRAMA = 'Drama',
  SCI_FI = 'Ficção Científica',
  ROMANCE = 'Romance',
  ANIMATION = 'Animação',
  THRILLER = 'Suspense'
}

export enum AgeRating {
  LIVRE = 'Livre (L)',
  TEN = '10 Anos',
  TWELVE = '12 Anos',
  FOURTEEN = '14 Anos',
  SIXTEEN = '16 Anos',
  EIGHTEEN = '18 Anos'
}

export interface MovieRecommendation {
  title: string;
  originalTitle: string;
  year: number;
  director: string;
  plot: string;
  ageRating: string;
  genre: string;
  verdict: 'Excellent' | 'Good' | 'Average' | 'Bad';
  verdictText: string;
  reasoning: string;
}