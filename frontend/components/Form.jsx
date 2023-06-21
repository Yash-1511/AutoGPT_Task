"use client";
import React, { useState } from "react";
import FormField from "./FormField";

const Form = () => {
  const [form, setForm] = useState({
    agentname: "",
    task: "",
  });
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8888/api/init",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...form }),
        }
      );

      await response.json();
      alert("Success");
    } catch (err) {
      alert(err);
    } finally {
        console.log("file saved successfully")
    }
  };
  return (
    <form className="mt-8 max-w-3xl" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-5">
        <FormField
          labelName="Agent Name"
          type="text"
          name="agentname"
          placeholder="Ex., AutoGPT"
          value={form.agentname}
          handleChange={handleChange}
        />
        <FormField
          labelName="Your Goal"
          type="text"
          name="task"
          placeholder="Make the world a Better place"
          value={form.task}
          handleChange={handleChange}
        />
      </div>
      <div className="mt-5 flex gap-5">
        <button
          type="submit"
          //   onClick={handleSubmit}
          className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Deploy Agent
        </button>
      </div>
    </form>
  );
};

export default Form;
