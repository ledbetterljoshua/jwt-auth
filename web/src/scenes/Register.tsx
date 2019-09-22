import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRegisterMutation } from "../generated/graphql";
import { RouteComponentProps } from "react-router";

interface Errors {
  email?: string;
}

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [register] = useRegisterMutation();
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={values => {
        let errors: Errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        return errors;
      }}
      onSubmit={async ({ email, password }, { setSubmitting }) => {
        const response = await register({
          variables: {
            email,
            password
          }
        });
        console.log("response", response);
        history.push("/");
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" />
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};
