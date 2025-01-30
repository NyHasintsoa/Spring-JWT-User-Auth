import { useForm } from "react-hook-form";
import contactImage from "../../assets/image/contact.jpg";
import InputForm from "../../components/inputs/InputForm.jsx";
import SubmitButton from "../../components/buttons/SubmitButton.jsx";
import TextareaForm from "../../components/inputs/TextareaForm.jsx";
import { sendContactMessage } from "../../service/ContactService.js";
import toast from "react-hot-toast";

function ContactForm() {
  const { register, handleSubmit, formState } = useForm();

  const onSubmit = async (data) => {
    await toast.promise(sendContactMessage(data), {
      loading: "Envoi en cours ...",
      success: (data) => {
        return data.message;
      },
      error: (data) => {
        return data.message;
      }
    });
  };

  const { errors, isSubmitting } = formState;
  return (
    <section className="py-4 pt-md-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-6">
            <h1>Lets talk about traveling</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
              <div className="mb-4">
                <InputForm
                  register={register}
                  label={"Your name"}
                  name={"name"}
                  type={"text"}
                  options={{
                    required: "Veuillez entrer votre nom !",
                    minLength: {
                      value: 3,
                      message: "Ce champ doit comporter au moins 3 caractères"
                    }
                  }}
                  errorField={errors.name}
                />
              </div>
              <div className="mb-4">
                <InputForm
                  register={register}
                  label={"Email address"}
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
              <div className="mb-4">
                <TextareaForm
                  register={register}
                  label={"Message"}
                  name={"message"}
                  options={{
                    required: "Veuillez entrer votre adresse Email !",
                    minLength: {
                      value: 5,
                      message: "Ce champ doit comporter au moins 5 caractères"
                    }
                  }}
                  errorField={errors.message}
                />
              </div>
              <SubmitButton
                isSubmitting={isSubmitting}
                className={"btn btn-lg btn-primary mb-0"}
                type="button"
                defaultText={"Send Message"}
                submitText={"Sending"}
              />
            </form>
          </div>

          <div className="col-lg-6 col-xl-5 text-center text-lg-end position-relative ms-auto">
            <img
              src={contactImage}
              className="rounded-3 position-relative"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
