import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the /payment page after component mounts
    router.push("/payment");
  }, [router]);

  return <div>{/* Your Home page content (if any) */}</div>;
}
