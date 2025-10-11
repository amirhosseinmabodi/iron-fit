import React from "react";

function contact() {
  return (
    <div>
      <div className="h-full">
        <form
          method="post"
          className="flex flex-col max-w-4xl p-8 border-gray-200 shadow-2xl rounded-2xl gap-4 border m-8"
        >
          <h1 className="text-center text-2xl font-bold text-orange-500">
            contact us
          </h1>
          <input
            className="border p-2 rounded border-gray-300"
            type="email"
            placeholder="@example.com"
          />
          <textarea
            className="border p-2 rounded border-gray-300"
            name=""
            id=""
            cols="30"
            rows="10"
          ></textarea>
          <input
            className="border bg-orange-500 text-xl hover:scale-105 transition-all duration-300 cursor-pointer  text-white font-bold p-2 rounded border-gray-300"
            type="submit"
            value="submit"
          />
        </form>
      </div>
    </div>
  );
}

export default contact;
