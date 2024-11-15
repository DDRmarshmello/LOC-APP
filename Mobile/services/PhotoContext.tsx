// PhotoContext.tsx
import React, { createContext, useState, ReactNode, useContext } from "react";

interface PhotoContextType {
  photos: string[];
  addPhoto: (uri: string) => void;
  removePhoto: (index: number) => void; // Añadimos la función removePhoto
  resetPhotos: () => void
}

export const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

interface PhotoProviderProps {
  children: ReactNode;
}

export const PhotoProvider: React.FC<PhotoProviderProps> = ({ children }) => {
  const [photos, setPhotos] = useState<string[]>([]);

  const addPhoto = (uri: string) => {
    setPhotos((prevPhotos) => [...prevPhotos, uri]);
  };

  const removePhoto = (index: number) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  const resetPhotos = () => {
    setPhotos([]);  // Restablece el estado de 'photos' a su valor por defecto (arreglo vacío)
  };

  return (
    <PhotoContext.Provider value={{ photos, addPhoto, removePhoto, resetPhotos }}>
      {children}
    </PhotoContext.Provider>
  );
};

// Custom hook para simplificar el uso del contexto en los componentes
export const usePhotoContext = (): PhotoContextType => {
  const context = useContext(PhotoContext);
  if (!context) {
    throw new Error("usePhotoContext debe usarse dentro de un PhotoProvider");
  }
  return context;
};
