"use client";

import { useActionState } from "react";
import { addBook } from "@/lib/actions";

export default function CreateBookPage() {
  const [state, formAction, isPending] = useActionState(addBook, {
    success: false,
    errors: {},
    message: "",
  });
  return (
    <>
      <h1 className="text-xl max-w-xl w-minus-50 mx-auto font-bold mt-8">
        Add Book
      </h1>
      <form
        action={formAction}
        className="max-w-xl w-minus-50 my-8 mx-auto space-y-6"
      >
        <label className="block space-y-2 cursor-pointer">
          <span className="block font-semibold">Book Title</span>
          <input
            type="text"
            name="title"
            className="border focus:outline-1 block w-full border-gray-300 rounded-md p-2"
          />
          {state.errors?.title && (
            <p className="text-red-500 text-sm">{state.errors.title[0]}</p>
          )}
        </label>
        <label className="block space-y-2 cursor-pointer">
          <span className="block font-semibold">Author</span>
          <input
            type="text"
            name="author"
            className="border focus:outline-1 block w-full border-gray-300 rounded-md p-2"
          />
          {state.errors?.author && (
            <p className="text-red-500 text-sm">{state.errors.author[0]}</p>
          )}
        </label>
        <label className="block space-y-2 cursor-pointer">
          <span className="block font-semibold">Collection</span>
          <select
            name="bookCollection"
            className="py-1 border focus:outline-1 block border-gray-300 rounded-md"
          >
            <option value="SGBC Library">SGBC Library</option>
            <option value="GTS">GTS</option>
          </select>
        </label>
        <label className="block space-y-2 cursor-pointer">
          <span className="block font-semibold">Category</span>
          <input
            type="text"
            name="category"
            className="border focus:outline-1 block w-full border-gray-300 rounded-md p-2"
          />
          {state.errors?.category && (
            <p className="text-red-500 text-sm">{state.errors.category[0]}</p>
          )}
        </label>
        <label className="block space-y-2 cursor-pointer">
          <span className="block font-semibold">ISBN</span>
          <input
            type="text"
            name="ISBN"
            className="border focus:outline-1 block w-full border-gray-300 rounded-md p-2"
          />
          {state.errors?.ISBN && (
            <p className="text-red-500 text-sm">{state.errors.ISBN[0]}</p>
          )}
        </label>
        <label className="block space-y-2 cursor-pointer">
          <span className="block font-semibold">Publisher</span>
          <input
            type="text"
            name="publisher"
            className="border focus:outline-1 block w-full border-gray-300 rounded-md p-2"
          />
          {state.errors?.publisher && (
            <p className="text-red-500 text-sm">{state.errors.publisher[0]}</p>
          )}
        </label>
        {/* <label className="block space-y-2 cursor-pointer"> */}
        {/*   <span className="block font-semibold">Image URL</span> */}
        {/*   <input */}
        {/*     type="text" */}
        {/*     name="imageURL" */}
        {/*     className="border focus:outline-1 block w-full border-gray-300 rounded-md p-2" */}
        {/*   /> */}
        {/* </label> */}
        <label className="block space-y-2 cursor-pointer">
          <span className="block font-semibold">Number of Times Borrowed</span>
          <input
            type="number"
            name="borrowTimes"
            className="border focus:outline-1 block border-gray-300 rounded-md p-2"
            defaultValue="0"
          />
          {state.errors?.borrowTimes && (
            <p className="text-red-500 text-sm">
              {state.errors.borrowTimes[0]}
            </p>
          )}
        </label>
        <label className="block space-y-2 cursor-pointer">
          <span className="block font-semibold">Copies</span>
          <input
            type="number"
            name="copies"
            className="border focus:outline-1 block border-gray-300 rounded-md p-2"
            defaultValue="1"
          />
          {state.errors?.copies && (
            <p className="text-red-500 text-sm">{state.errors.copies[0]}</p>
          )}
        </label>
        <label className="block space-y-2 cursor-pointer">
          <span className="block font-semibold">Available Copies</span>
          <input
            type="number"
            name="availableCopies"
            className="border focus:outline-1 block border-gray-300 rounded-md p-2"
            defaultValue="1"
          />
          {state.errors?.availableCopies && (
            <p className="text-red-500 text-sm">
              {state.errors.availableCopies[0]}
            </p>
          )}
        </label>
        <label className="block space-y-2 cursor-pointer">
          <span className="block font-semibold">Description</span>
          <textarea
            name="description"
            className="border w-full min-h-[300px] focus:outline-1 block border-gray-300 rounded-md p-2"
          ></textarea>
        </label>
        <button
          type="submit"
          className="inline-block bg-black text-white py-2 px-4 rounded-md cursor-pointer hover:bg-black/75"
        >
          {isPending ? "Adding..." : "Add Book"}
        </button>
        {state.success && (
          <p className="text-green-600 text-sm">{state.message}</p>
        )}
      </form>
    </>
  );
}
