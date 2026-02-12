"use client";

import { useActionState } from "react";
import { createBook } from "@/lib/actions";

export default function CreateBookForm() {
  const [state, actionFn, isPending] = useActionState(createBook, {});

  return (
    <main className="w-container max-w-5xl mx-auto mt-12">
      <form
        onSubmit={(e) => {
          actionFn(new FormData(e.currentTarget));
        }}
      >
        <div>
          <label htmlFor="title"> Title </label>
          <input type="text" id="title" name="title" className="border-1" />
        </div>
        <div>
          <label htmlFor="author"> Author </label>
          <input type="text" id="author" name="author" className="border-1" />
        </div>
        <div>
          <label htmlFor="price"> Price </label>
          <input type="number" id="price" name="price" className="border-1" />
        </div>
        <div>
          <label htmlFor="image"> Image </label>
          <input type="file" id="image" name="image" accept="image/*" />
        </div>
        <div>
          <label htmlFor="bookCollection"> Collection</label>
          <input
            type="string"
            id="bookCollection"
            name="bookCollection"
            className="border-1"
          />
        </div>
        <div>
          <label htmlFor="category"> Category </label>
          <input
            type="string"
            id="category"
            name="category"
            className="border-1"
          />
        </div>
        <div>
          <label htmlFor="borrowTimes"> Borrow Times</label>
          <input
            type="number"
            id="borrowTimes"
            name="borrowTimes"
            className="border-1"
          />
        </div>
        <div>
          <label htmlFor="isbn"> ISBN</label>
          <input type="string" id="isbn" name="ISBN" className="border-1" />
        </div>
        <div>
          <label htmlFor="availableCopies"> Available Copies </label>
          <input
            type="number"
            id="availableCopies"
            name="availableCopies"
            className="border-1"
          />
        </div>
        <div>
          <label htmlFor="copies"> Copies </label>
          <input type="number" id="copies" name="copies" className="border-1" />
        </div>
        <div>
          <label htmlFor="publisher"> Publisher </label>
          <input
            type="string"
            id="publisher"
            name="publisher"
            className="border-1"
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            className="border-1"
          ></textarea>
        </div>
        <button> Submit </button>
      </form>
    </main>
  );
}
