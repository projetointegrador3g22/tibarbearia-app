import { useContext } from "react";
import { AuthContext } from "../context/auth";
import RoutesOpen from "./routesOpen";
import RoutesPrivate from "./routesPrivate";

export default function Routes(){
  const {user} = useContext(AuthContext);

  return user.id_user ? <RoutesPrivate /> : <RoutesOpen />
  
}