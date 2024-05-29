import React, { useEffect } from "react";

interface RoleContextProps {
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
}

export const RoleContext = React.createContext<RoleContextProps>({} as RoleContextProps);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = React.useState<string>(() => {
    const savedRole = localStorage.getItem("role");
    return savedRole || "guest";
  });

  useEffect(() => {
    localStorage.setItem("role", role);
  }, [role]);

  return <RoleContext.Provider value={{ role, setRole }}>{children}</RoleContext.Provider>;
};
