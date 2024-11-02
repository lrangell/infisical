// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { OrgPermissionActions, OrgPermissionSubjects, useServerConfig } from "@app/context";
import Head from "next/head";

import { OrgPermissionActions, OrgPermissionSubjects } from "@app/context";
// import { Button } from "@app/components/v2";
import { withPermission } from "@app/hoc";
// import * as yup from "yup";

const UserSecrets = withPermission(
  () => {
    return (
      <div>
        <Head>
          <title>User Secrets</title>
        </Head>
        <div className="flex h-full w-full flex-col items-center  gap-6 bg-bunker-800 text-white">
          <div className="mt-6 w-full max-w-7xl px-6">
            <p className="text-3xl font-semibold">User Secrets</p>
            <p className="text-lg">Manage your personal secrets</p>
          </div>
          <div className="m-10 rounded-lg border border-mineshaft-600 bg-mineshaft-900 p-6">
            aaa
          </div>
        </div>
      </div>
    );
  },
  { action: OrgPermissionActions.Read, subject: OrgPermissionSubjects.SecretScanning }
);
Object.assign(UserSecrets, { requireAuth: true });

export default UserSecrets;
