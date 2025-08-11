import React, { useState, useEffect, FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAbility } from "../casl/AbilityContext";
import { useUser } from "../../authService/UserProvider";

interface AuthCheckerProps {
  subject?: string;
  bypassCasl?: boolean;
  onlyForSuperUser?: boolean;
  children: ReactNode;
};

export const ProtectedRoute: FC<AuthCheckerProps> = ({ subject, bypassCasl, onlyForSuperUser, children }) => {
  const { ability } = useAbility();
  const [can, setCan] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (onlyForSuperUser) {
      setCan(Boolean(user?.superUser));
      return;
    }
    if (subject && !bypassCasl) setCan(ability.can(subject, subject));
  }, [subject, bypassCasl, onlyForSuperUser, user?.superUser]);

  return can ? <>{children}</> : <Navigate to="/forbiden" replace />;
};
