import React, { useState } from 'react';

interface PersonalityFormProps {
  onSubmit: (data: { personality: string; genres: string[] }) => void;
}

const GENRES = [
  'Action',
  'Adventure',
  'Comedy',
  'Drama',
  'Fantasy',
  'Horror',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Thriller'
];

export default function PersonalityForm({ onSubmit }: PersonalityFormProps) {
  const [formData, setFormData] = useState({
    personality: '',
    genres: [] as string[]
  });

  const [errors, setErrors] = useState({
    personality: '',
    genres: ''
  });

  const validateForm = () => {
    const newErrors = {
      personality: '',
      genres: ''
    };

    if (!formData.personality.trim()) {
      newErrors.personality = 'Please tell us about your personality';
    }

    if (formData.genres.length === 0) {
      newErrors.genres = 'Please select at least one genre';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleGenreChange = (genre: string) => {
    setFormData(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre]
    }));
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="rounded-md shadow-sm space-y-6">
        <div>
          <label htmlFor="personality" className="block text-sm font-medium text-gray-700">
            Tell us about your personality
          </label>
          <textarea
            id="personality"
            name="personality"
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="I am an outgoing person who loves..."
            value={formData.personality}
            onChange={(e) => setFormData({ ...formData, personality: e.target.value })}
          />
          {errors.personality && <p className="mt-1 text-sm text-red-600">{errors.personality}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select your favorite genres
          </label>
          <div className="grid grid-cols-2 gap-4">
            {GENRES.map((genre) => (
              <div key={genre} className="flex items-center">
                <input
                  id={genre}
                  name="genres"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={formData.genres.includes(genre)}
                  onChange={() => handleGenreChange(genre)}
                />
                <label htmlFor={genre} className="ml-2 block text-sm text-gray-900">
                  {genre}
                </label>
              </div>
            ))}
          </div>
          {errors.genres && <p className="mt-1 text-sm text-red-600">{errors.genres}</p>}
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Complete Registration
        </button>
      </div>
    </form>
  );
}