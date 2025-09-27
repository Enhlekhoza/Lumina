import { useState } from "react";
import RoleSelector from "@/components/RoleSelector";
import Dashboard from "@/components/Dashboard";

type UserRole = 'admin' | 'student' | 'customer' | null;

const Index = () => {
  const [userRole, setUserRole] = useState<UserRole>(null);

  const handleRoleSelect = (role: 'admin' | 'student' | 'customer') => {
    setUserRole(role);
  };

  const handleLogout = () => {
    setUserRole(null);
  };

  if (!userRole) {
    return <RoleSelector onRoleSelect={handleRoleSelect} />;
  }

  return <Dashboard userRole={userRole} onLogout={handleLogout} />;
};

export default Index;