import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure,
} from "vee-validate";
import {
  required,
  min,
  max,
  email,
  confirmed,
  min_value as minValue,
  max_value as maxValue,
  alpha_spaces as alphaSpaces,
  not_one_of as excluded,
} from "@vee-validate/rules";

export default {
  install(app, options) {
    //here we register components globally because we will use them many times
    app.component("VeeForm", VeeForm);
    app.component("VeeField", VeeField);
    app.component("ErrorMessage", ErrorMessage); //if there is no errorMsg nothing will be outputed bu default
    //here we register rules globally because we will use them many times, but we can also regesiter them locally

    defineRule("required", required);
    defineRule("tos", required);
    defineRule("min", min);
    defineRule("max", max);
    defineRule("alpha_spaces", alphaSpaces);
    defineRule("email", email);
    defineRule("min_value", minValue);
    defineRule("max_value", maxValue);
    defineRule("confirmed", confirmed);
    defineRule("excluded", excluded);
    defineRule("country_excluded", excluded);

    //second argument is a function that make the validation, and here we are using the default function required from the liberary. we can override the default functions, but there are some limitations, we can only override error msgs from global rules, also we can only ovrride functions that return false if error esixts

    configure({
      //the generateMessage functoin will be called every time a gloval validation function returns false
      generateMessage: (ctx) => {
        const msgs = {
          required: `The field ${ctx.field} is required.`,
          min: `The field ${ctx.field} is too short.`,
          max: `The field ${ctx.field} is too long.`,
          alpha_spaces: `The field ${ctx.field} may only contain alphabetical characters and spaces.`,
          email: `The field ${ctx.field} must be a valid email.`,
          min_value: `The field ${ctx.field} is too low.`,
          max_value: `The field ${ctx.field} is too high.`,
          excluded: `You are not allowed to use this value for the field ${ctx.field}.`,
          country_excluded:
            "Due to restrictions, we do not accept users from this location.",
          confirmed: "The passwords don't match.",
          tos: "You must accept the Terms of Service.",
        };
        const message = msgs[ctx.rule.name]
          ? msgs[ctx.rule.name]
          : `The field ${ctx.field} is invalid.`;

        return message;
      },
      validateOnBlur: true, //defaults to true
      validateOnChange: true, //defaults to true
      validateOnInput: false, //defaults to false
      validateOnModelUpdate: true, //defaults to true
    });
  },
};
