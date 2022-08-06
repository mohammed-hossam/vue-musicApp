import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
} from "vee-validate";
import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
} from "@vee-validate/rules";

export default {
  install(app, options) {
    //here we register components globally because we will use them many times
    app.component("VeeForm", VeeForm);
    app.component("VeeField", VeeField);
    app.component("ErrorMessage", ErrorMessage); //if there is no errorMsg nothing will be outputed bu default
    //here we register rules globally because we will use them many times, but we can also regesiter them locally

    defineRule("required", required);
    defineRule("min", min);
    defineRule("max", max);
    defineRule("alpha_spaces", alphaSpaces);
    //second argument is a function that make the validation, and here we are using the default function required from the liberary
  },
};
