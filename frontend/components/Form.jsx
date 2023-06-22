"use client";
import React, { useState } from "react";
import FormField from "./FormField";

const Form = () => {
  const [form, setForm] = useState({
    ai_name: "",
    ai_role: "",
    ai_goals: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "ai_goals") {
      if (value.includes(",")) {
        // Split the comma-separated values into an array
        const goalsArray = value.split(",").map((goal) => goal.trim());
        setForm((prevFormData) => ({
          ...prevFormData,
          [name]: goalsArray,
        }));
      } else {
        setForm((prevFormData) => ({
          ...prevFormData,
          [name]: [value.trim()],
        }));
      }
    } else {
      setForm((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ ...form });
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
          name="ai_name"
          placeholder="Ex., AutoGPT"
          value={form.ai_name}
          handleChange={handleChange}
        />
        <FormField
          labelName="Role"
          type="text"
          name="ai_role"
          placeholder="Make the world a Better place"
          value={form.ai_role}
          handleChange={handleChange}
        />
        <FormField
          labelName="Goal"
          type="text"
          name="ai_goals"
          placeholder="Enter goals for AI with comma seperated"
          value={form.ai_goals}
          handleChange={handleChange}
        />
      </div>
      <div className="mt-5 flex gap-5">
        <button
          type="submit"
          className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Deploy Agent
        </button>
      </div>
    </form>
  );
};

export default Form;
