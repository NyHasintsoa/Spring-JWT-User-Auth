import { Card, CardBody, CardHeader } from "react-bootstrap";
import InputForm from "../../components/inputs/InputForm.jsx";
import { useForm } from "react-hook-form";
import SubmitButton from "../../components/buttons/SubmitButton.jsx";
import { wait } from "../../utils/Utils.js";

function ProfilePasswordCard() {
  const { register, handleSubmit, formState } = useForm();

  const onSubmit = async (data) => {
    await wait();
    console.log(data);
  };

  const { errors, isSubmitting } = formState;
  return (
    <Card>
      <CardHeader>
        <h4 className="mb-0">Changer mot de passe</h4>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="mb-3">
            <InputForm
              register={register}
              label={"Ancien mot de passe"}
              name={"lastPassword"}
              type={"password"}
              options={{
                required: "Veuillez entrer votre ancien mot de passe !",
                minLength: {
                  value: 5,
                  message: "Ce champ doit comporter au moins 5 caractères"
                }
              }}
              errorField={errors.lastPassword}
            />
          </div>

          <div className="mb-3">
            <InputForm
              register={register}
              label={"Nouveau mot de passe"}
              name={"password"}
              type={"password"}
              options={{
                required: "Veuillez entrer votre adresse Email !",
                minLength: {
                  value: 5,
                  message: "Ce champ doit comporter au moins 5 caractères"
                }
              }}
              errorField={errors.password}
            />
          </div>

          <div className="mb-3">
            <InputForm
              register={register}
              label={"Confirmation nouveau mot de passe"}
              name={"confirmation"}
              type={"password"}
              options={{
                required: "Veuillez entrer votre adresse Email !",
                minLength: {
                  value: 5,
                  message: "Ce champ doit comporter au moins 5 caractères"
                }
              }}
              errorField={errors.confirmation}
            />
          </div>

          <div className="text-end">
            <SubmitButton
              isSubmitting={isSubmitting}
              className={"btn btn-primary"}
              defaultText={"Changer mot de passe"}
              submitText={"Modification ..."}
            />
          </div>
        </form>
      </CardBody>
    </Card>
  );
}

export default ProfilePasswordCard;
