"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface IdProps {
  params: {
    id: string;
  };
}

const Page = ({ params }: IdProps) => {
  console.log(params.id);
  const router = useRouter();

  useEffect(() => {
    callApi();
  }, [params]);

  const callApi = async () => {
    try {
      const { id } = params;
      const { data } = await axios.get(`/api/short-url/${id}`);

      if (data.url) {
        router.push(data.url);
      } else {
        console.log("URL not found");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      router.push("/");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-4xl">Redirecting...</h1>
    </div>
  );
};

export default Page;
