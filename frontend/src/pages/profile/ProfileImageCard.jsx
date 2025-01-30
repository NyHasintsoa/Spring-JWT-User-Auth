import defaultProfile from "../../assets/profile/default_profile.svg";
import { PROFILE_IMAGE_PATH } from "../../config/constant.js";
import { FaUpload } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth.js";
import { useForm } from "react-hook-form";
import SubmitButton from "../../components/buttons/SubmitButton.jsx";
import toast from "react-hot-toast";
import { wait } from "../../utils/Utils.js";
import { uploadProfileImageRequest } from "../../service/UserService.js";
import { useAccountStore } from "../../store/authStore.js";

function ProfileImageCard() {
  const { setAccount } = useAccountStore();
  const { account } = useAuth();
  const { register, handleSubmit, formState } = useForm();

  const onSubmit = async (data) => {
    if (data.profileFile.length == 0)
      toast.error("Veuillez choisir une image !");
    else {
      await wait(1000);
      const formData = new FormData();
      formData.append("profileFile", data.profileFile[0]);
      await toast.promise(uploadProfileImageRequest(formData), {
        loading: "Envoi en cours ...",
        success: (data) => {
          setAccount(data.data);
          return data.message;
        },
        error: (data) => {
          return data.message;
        }
      });
    }
  };

  const { isSubmitting } = formState;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
      <div className="col-12">
        <label className="form-label">
          Upload your profile photo
          <span className="text-danger">*</span>
        </label>
        <div className="d-flex align-items-center">
          <label
            className="position-relative me-4"
            title="Replace profile image"
          >
            <span className="avatar avatar-xl">
              <img
                id="uploadfile-1-preview"
                className="avatar-img rounded-circle border border-white border-3 shadow"
                src={
                  account.profileImage == null
                    ? defaultProfile
                    : PROFILE_IMAGE_PATH + account.profileImage
                }
                alt=""
              />
            </span>
          </label>
          <label htmlFor="uploadfile-profile" className="btn btn-primary pb-2">
            <FaUpload size={"20px"} className="me-2" /> Change
          </label>
          <input
            {...register("profileFile")}
            id="uploadfile-profile"
            className="form-control d-none"
            type="file"
          />
          <SubmitButton
            className={"btn btn-success ms-3"}
            defaultText={"Appliquer changement"}
            isSubmitting={isSubmitting}
            submitText={"Envoi en cours..."}
          />
        </div>
      </div>
    </form>
  );
}

export default ProfileImageCard;
