import React from "react";
import AddNewUser from "../component/AddNewUser";

export const metadata = {
  title: "Add New User",
};

const AddNewUserPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Add a new user</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill in the details and submit to save the user.
        </p>
      </div>
      <AddNewUser />
    </div>
  );
};

export default AddNewUserPage;
