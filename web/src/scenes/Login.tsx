import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useLoginMutation, MeQuery, MeDocument } from "../generated/graphql";
import { RouteComponentProps } from "react-router";
import { setAccessToken } from "../accessToken";

interface Errors {
  email?: string;
}

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [login] = useLoginMutation();
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
        const response = await login({
          variables: {
            email,
            password
          },
          update: (store, { data }) => {
            if (!data) {
              return null;
            }

            store.writeQuery<MeQuery>({
              query: MeDocument,
              data: {
                me: data.login.user
              }
            });
          }
        });

        if (response && response.data) {
          setAccessToken(response.data.login.accessToken);
        }

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
