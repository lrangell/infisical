import { useForm } from "react-hook-form";

import { Button, Input } from "@app/components/v2";
import { apiRequest } from "@app/config/request";

type FormValues = { login: string; password: string };

export const CreateLoginForm = ({ handlePopUpToggle }: { handlePopUpToggle: Function }) => {
  const { handleSubmit, register } = useForm<FormValues>();
  const onFormSubmit = async (body: FormValues) => {
    await apiRequest.post("/api/v3/secrets/personal/logins", {
      login: body.login,
      plainTextPassword: body.password
    });
    handlePopUpToggle("createLogin", false);
  };
  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      {" "}
      <Input placeholder="login" type="text" {...register("login", { required: true })} />
      <Input placeholder="password" type="text" {...register("password", { required: true })} />
      <Button className="mt-4" size="sm" type="submit">
        Create Login
      </Button>
    </form>
  );
};
