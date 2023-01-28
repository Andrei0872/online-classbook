import { useNavigate } from "react-router-dom";
import { UserRoles } from "../store/slices/user.slice"
import { useAppDispatch, useAppSelector } from "../utils/hooks/store";
import { ReactNode, useEffect } from 'react'

interface Props {
  roles: UserRoles[];
  redirectTo: ReactNode;
};

function RoleGuard (props: React.PropsWithChildren<Props>) {
  const currentUser = useAppSelector(state => state.user.currentUser);

  const { roles, redirectTo } = props;

  return (
    <>
      {roles.includes(currentUser?.role!) ? props.children : redirectTo}
    </>
  );
}

export default RoleGuard