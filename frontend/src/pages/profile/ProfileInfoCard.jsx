import { useAuth } from "../../hooks/useAuth.js";
import { useForm } from "react-hook-form";
import InputForm from "../../components/inputs/InputForm.jsx";
import SubmitButton from "../../components/buttons/SubmitButton.jsx";
import { updateProfileRequest } from "../../service/UserService.js";
import { useAccountStore } from "../../store/authStore.js";
import toast from "react-hot-toast";

function ProfileInfoCard() {
  const { account } = useAuth();
  const { register, handleSubmit, formState } = useForm();
  const { setAccount } = useAccountStore();

  const onSubmit = async (data) => {
    await toast.promise(updateProfileRequest(data), {
      loading: "Envoi en cours ...",
      success: (response) => {
        setAccount(response.data);
        return response.message;
      },
      error: (data) => {
        setAccount(null);
        return data.message;
      }
    });
  };

  const { errors, isSubmitting } = formState;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
      <div className="col-md-6">
        <InputForm
          register={register}
          label={"UserName"}
          name={"username"}
          type={"text"}
          options={{
            required: "Veuillez entrer votre adresse Email !",
            minLength: {
              value: 5,
              message: "Ce champ doit comporter au moins 5 caractères"
            }
          }}
          errorField={errors.username}
          defaultValue={account.username}
        />
      </div>

      <div className="col-md-6">
        <InputForm
          register={register}
          label={"Full Name"}
          name={"fullname"}
          type={"text"}
          options={{
            required: "Veuillez entrer votre adresse Email !",
            minLength: {
              value: 5,
              message: "Ce champ doit comporter au moins 5 caractères"
            }
          }}
          errorField={errors.fullname}
          defaultValue={account.fullname}
        />
      </div>

      <div className="col-12 text-end">
        <SubmitButton
          isSubmitting={isSubmitting}
          className={"btn btn-primary"}
          defaultText={"Save changes"}
          submitText={"Submiting..."}
        />
      </div>
    </form>
  );
}

export default ProfileInfoCard;
