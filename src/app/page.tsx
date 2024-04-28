"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function Home() {
  const navigate = useRouter();
  console.log("navigate", navigate);

  const [url, setUrl] = React.useState("");
  const [shortUrl, setShortUrl] = React.useState("");

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    console.log(value);
    setUrl(value);
  };

  const onSubmitGetShortUrlForm = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    // preventing default form behavior
    event.preventDefault();

    if (url === "") return alert("URL is required");

    try {
      const { data } = await axios.post("/api/short-url", { url });

      setShortUrl(data.uniqueId);
    } catch (error) {
      console.error("Catch_Error", error);
    }
  };

  return (
    <main className="h-screen flex flex-col justify-center items-center gap-24">
      <h1 className="text-4xl font-semibold text-center">URL Shortener</h1>
      <div className="flex justify-center items-center">
        <form
          autoComplete="off"
          className="flex flex-col justify-center items-center gap-2"
          onSubmit={onSubmitGetShortUrlForm}
        >
          <label
            htmlFor="url"
            className="block text-lg font-semibold text-center"
          >
            Enter URL
          </label>
          <input
            value={url}
            onChange={handleUrlChange}
            type="url"
            id="url"
            name="url"
            className="block w-96 text-lg font-semibold text-center bg-gray-100 border-2 border-gray-300 rounded-lg text-pink-700"
          />

          <button
            type="submit"
            className="border-2 border-gray-400 hover:border-gray-100 rounded-lg transition-colors duration-300 outline-none  px-4 py-2"
          >
            Get Short URL
          </button>
        </form>
      </div>

      {shortUrl && (
        <div>
          <h4 className="text-center">Your Short Url</h4>
          <a target="_blank" href={`/${shortUrl}`}>
            {window.location.href + shortUrl}
          </a>
        </div>
      )}
    </main>
  );
}
