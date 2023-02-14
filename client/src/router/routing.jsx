import FormCard from "../components/FormCard";
import FormCardV3 from "../components/FormCard copy";
import FormCardV2 from "../components/FormCardV2";
import Login from "../components/Login";

export const Router = [
  {
    path: "auth",
    exact: true,
    children: [{ path: "form", element: <FormCard /> }],
  },
  // {
  //   path: "auth",
  //   exact: true,
  //   children: [{ path: "form2", element: <FormCardV2 /> }],
  // },
  {
    path: "/",
    exact: true,
    children: [{ path: "/", element: <Login /> }],
  },
];
