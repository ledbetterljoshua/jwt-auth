import React from "react";
import { useUsersQuery } from "../generated/graphql";

interface Props {}

export const Home: React.FC<Props> = () => {
  const { data } = useUsersQuery({ fetchPolicy: "network-only" });
  return (
    <div>
      <div>{!data && "loading..."}</div>
      {data &&
        data.users.map(({ email, id }) => (
          <div key={id}>
            {email} - {id}
          </div>
        ))}
    </div>
  );
};
