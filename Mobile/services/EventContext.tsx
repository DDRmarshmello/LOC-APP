import React, { createContext, useContext, useState, ReactNode } from "react";

// Define el tipo de los datos que vamos a almacenar
interface EventRegister {
  username: string;
  usernameId: number;
  description: string;
  cedula_rnc: string;
  latitud: string;
  longitud: string;
  notas: string;
  nombre_empresa: string;
}

// Define el tipo para el contexto
interface EventContextType {
  event: EventRegister;
  setEvent: React.Dispatch<React.SetStateAction<EventRegister>>;
}

// Crea el contexto
const EventContext = createContext<EventContextType | undefined>(undefined);

// Crea un hook personalizado para acceder al contexto
export const useEventContext = (): EventContextType => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEventContext must be used within an EventProvider");
  }
  return context;
};

// Crea un proveedor para envolver la aplicación
interface EventProviderProps {
  children: ReactNode;
}

export const EventProvider: React.FC<EventProviderProps> = ({ children }) => {
  const [event, setEvent] = useState<EventRegister>({
    username: "",
    usernameId: 0,
    description: "",
    cedula_rnc: "",
    latitud: "",
    longitud: "",
    notas: "",
    nombre_empresa: "",
  });

  return (
    <EventContext.Provider value={{ event, setEvent }}>
      {children}
    </EventContext.Provider>
  );
};
