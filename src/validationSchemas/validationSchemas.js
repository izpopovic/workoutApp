import * as Yup from "yup";

export const SignUpSchemaModel = Yup.object().shape({
  username: Yup.string()
  .min(4)
  .max(30)
  .required(),
  password: Yup.string()
  .min(3)
  .max(30)
  .required()
});
