import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const token = (await cookies()).get("token");

  redirect("/admin");

  // if (!token) {
  //   redirect("/auth/login");
  // } else {
  //   redirect("/admin");
  // }
}
