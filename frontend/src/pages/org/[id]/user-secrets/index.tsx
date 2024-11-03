import { useEffect, useState } from "react";
import Head from "next/head";

import { Button, Table, TableContainer, TBody, Td, Th, THead, Tr } from "@app/components/v2/";
import { apiRequest } from "@app/config/request";
import { OrgPermissionActions, OrgPermissionSubjects } from "@app/context";
import { withPermission } from "@app/hoc";
import { usePopUp } from "@app/hooks";
import { AddLoginModal } from "@app/views/personal/Logins/AddLoginModal";
import { EditLoginModal } from "@app/views/personal/Logins/EditLoginModal";

type Login = { login: string; password: string; id: string };

const LoginItem = ({
  login,
  trigger,
  edit
}: {
  login: Login;
  trigger: Function;
  edit: Function;
}) => {
  return (
    <Tr>
      <Td>{login.login}</Td> <Td>{login.password}</Td>
      <Td>
        <Button
          colorSchema="secondary"
          onClick={() => {
            edit();
            trigger();
          }}
        >
          Edit
        </Button>
      </Td>
      <Td>
        <Button
          colorSchema="danger"
          onClick={async () => {
            await apiRequest.delete("/api/v3/secrets/personal/logins", { data: { id: login.id } });
            trigger();
          }}
        >
          Delete
        </Button>
      </Td>
    </Tr>
  );
};

const UserSecrets = withPermission(
  () => {
    const [passwords, setPasswords] = useState([]);
    const [rerenderhack, trigger] = useState(true);
    const { popUp, handlePopUpToggle, handlePopUpOpen } = usePopUp(["createLogin"] as const);
    const editPopup = usePopUp(["editLogin"] as const);

    useEffect(() => {
      const get = async () => {
        await apiRequest("/api/v3/secrets/personal/logins", { method: "GET" }).then(({ data }) =>
          setPasswords(data)
        );
      };
      get();
    }, [popUp.createLogin.isOpen, rerenderhack]);

    return (
      <div>
        <Head>
          <title>User Secrets</title>
        </Head>
        <div className="flex h-full w-full flex-col items-center  gap-6 bg-bunker-800 p-20 text-white">
          <div className="mt-6 w-full max-w-7xl ">
            <p className="text-3xl font-semibold">User Secrets</p>
            <p className="text-lg">Manage your personal secrets</p>
          </div>
          <div className="m-10 w-full rounded-lg border border-mineshaft-600 bg-mineshaft-900 p-10">
            <Button
              colorSchema="primary"
              onClick={() => {
                handlePopUpOpen("createLogin");
              }}
            >
              Add
            </Button>
            <AddLoginModal popUp={popUp} handlePopUpToggle={handlePopUpToggle} />
            <EditLoginModal
              popUp={editPopup.popUp}
              handlePopUpToggle={editPopup.handlePopUpToggle}
            />

            <TableContainer className="mt-4 w-full">
              <Table>
                <THead>
                  <Tr>
                    <Th>Login</Th>
                    <Th>Pasword</Th>
                    <Th>Edit</Th>
                    <Th>Delete</Th>
                  </Tr>
                </THead>
                <TBody>
                  {passwords.map((login) => (
                    <LoginItem
                      login={login}
                      key={login.id}
                      trigger={() => trigger(!rerenderhack)}
                      edit={() => editPopup.handlePopUpOpen("editLogin")}
                    />
                  ))}
                </TBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    );
  },
  { action: OrgPermissionActions.Read, subject: OrgPermissionSubjects.SecretScanning }
);
Object.assign(UserSecrets, { requireAuth: true });

export default UserSecrets;
