import { Card, CardBody } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import InputForm from "../../../components/inputs/InputForm.jsx";
import Select from "react-select";
import { USER_ROLES } from "../../../config/constant.js";
import makeAnimated from "react-select/animated";
import { wait } from "../../../utils/Utils.js";
import SubmitButton from "../../../components/buttons/SubmitButton.jsx";
import toast from "react-hot-toast";
import { addUserByAdmin } from "../../../service/UserService.js";

function AddUser() {
  const { register, handleSubmit, formState, control } = useForm();
  const animatedComponents = makeAnimated();

  const onSubmit = async (data) => {
    await wait(1000);
    data.roles = Array.from(data.roles).map((role) => role.value);
    await toast.promise(addUserByAdmin(data), {
      loading: "Traitement ...",
      success: (response) => response.message,
      error: (response) => response.message
    });
  };

  const { errors, isSubmitting } = formState;

  return (
    <>
      <h1>Add User</h1>
      <Card>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <InputForm
                    register={register}
                    label={"Adresse Mail"}
                    name={"email"}
                    type={"email"}
                    options={{
                      required: "Veuillez entrer votre adresse Email !",
                      minLength: {
                        value: 5,
                        message: "Ce champ doit comporter au moins 5 caractères"
                      }
                    }}
                    errorField={errors.email}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor={"input-roles"}>
                    Roles
                  </label>
                  <Controller
                    name="roles"
                    defaultValue={[USER_ROLES[0]]}
                    control={control}
                    rules={{
                      required: "Veuillez choisir au moins un rôle !"
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        onChange={(selectOptions) => {
                          field.onChange(selectOptions);
                        }}
                        isMulti
                        defaultValue={[USER_ROLES[0]]}
                        components={animatedComponents}
                        options={USER_ROLES}
                      />
                    )}
                  />
                  {errors.roles && (
                    <span className="text-danger">{errors.roles.message}</span>
                  )}
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <InputForm
                    register={register}
                    label={"Nom d'utilisateur"}
                    name={"username"}
                    type={"text"}
                    options={{
                      required: "Veuillez entrer votre nom d'utilisateur",
                      minLength: {
                        value: 5,
                        message: "Ce champ doit comporter au moins 5 caractères"
                      }
                    }}
                    errorField={errors.username}
                  />
                </div>
                <div className="mb-3">
                  <InputForm
                    register={register}
                    label={"Nom Complet"}
                    name={"fullname"}
                    type={"text"}
                    options={{
                      required: "Veuillez entrer votre nom complet !",
                      minLength: {
                        value: 5,
                        message: "Ce champ doit comporter au moins 5 caractères"
                      }
                    }}
                    errorField={errors.fullname}
                  />
                </div>
              </div>
              <div className="col-12">
                <SubmitButton
                  isSubmitting={isSubmitting}
                  defaultText={"Ajouter Utilisateur"}
                  submitText={"Ajout de l'utilisateur"}
                  className={"btn btn-primary w-100"}
                />
              </div>
            </div>
          </form>
        </CardBody>
      </Card>
    </>
  );
}

export default AddUser;
