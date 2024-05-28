import React from "react";

interface RoleContextProps {
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
}

export const RoleContext = React.createContext<RoleContextProps | undefined>(undefined);
