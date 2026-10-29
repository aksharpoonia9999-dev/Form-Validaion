import { useState } from "react";
import Swal from "sweetalert2";

const Form = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [dob, setDob] = useState("");
  const [submitted, setSubmitted] = useState("");

  // REGEX PATTERNS
  const nameRegex = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/;
  const ageRegex = /^\d+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const numberRegex = /^[6-9]\d{9}$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    // NAME VALIDATION
    if (!name.trim()) {
      setSubmitted("name");
      return;
    } else if (!nameRegex.test(name.trim())) {
      setSubmitted("name-format");
      return;
    }

    // AGE VALIDATION
    if (!age.trim()) {
      setSubmitted("age");
      return;
    } else if (!ageRegex.test(age) || Number(age) < 10 || Number(age) > 60) {
      setSubmitted("age-format");
      return;
    }

    // EMAIL VALIDATION
    if (!email.trim()) {
      setSubmitted("email");
      return;
    } else if (!emailRegex.test(email.trim())) {
      setSubmitted("email-format");
      return;
    }

    // MOBILE NUMBER VALIDATION
    if (!number.trim()) {
      setSubmitted("number");
      return;
    } else if (!numberRegex.test(number.trim())) {
      setSubmitted("number-format");
      return;
    }

    /// DOB VALIDATION
    if (!dob) {
      setSubmitted("dob");
      return;
    } else {
      const today = new Date().toLocaleDateString("en-CA");

      if (dob > today) {
        setSubmitted("dob-format");
        return;
      }
    }

    // SUCCESS
    setSubmitted("");

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your Form Has Been Submitted!",
      showConfirmButton: true,
      timer: 1500,
    });

    setName("");
    setAge("");
    setEmail("");
    setNumber("");
    setDob("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-main max-w-100 w-full h-auto p-5 rounded-3xl flex flex-col gap-5"
    >
      {/* NAME */}
      <div className="flex flex-col gap-2">
        <label
          className="text-black leading-normal text-lg font-semibold"
          htmlFor="name"
        >
          Name
        </label>

        <input
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (submitted.startsWith("name")) setSubmitted("");
          }}
          placeholder="Please Enter Your Name"
          className="text-lg placeholder:font-medium placeholder:text-lg outline-borders border border-solid border-black/30 placeholder:text-input-text rounded-2xl p-2"
          type="text"
          autoComplete="name"
        />

        {submitted.startsWith("name") && (
          <p className="text-lg font-semibold text-required">
            {submitted === "name"
              ? "Name is required"
              : "Use letters, spaces, apostrophes, or hyphens only"}
          </p>
        )}
      </div>

      {/* AGE */}
      <div className="flex flex-col gap-2">
        <label
          className="text-black leading-normal text-lg font-semibold"
          htmlFor="age"
        >
          Age
        </label>

        <input
          id="age"
          value={age}
          onChange={(e) => {
            setAge(e.target.value);
            if (submitted.startsWith("age")) setSubmitted("");
          }}
          placeholder="Please Enter Your Age"
          min="1"
          max="1000"
          className="text-lg placeholder:font-medium placeholder:text-lg outline-borders border border-solid border-black/30 placeholder:text-input-text rounded-2xl p-2"
          type="number"
          autoComplete="off"
        />

        {submitted.startsWith("age") && (
          <p className="text-lg font-semibold text-required">
            {submitted === "age"
              ? "Age is required"
              : "Age must be a whole number between 10 and 60"}
          </p>
        )}
      </div>

      {/* EMAIL */}
      <div className="flex flex-col gap-2">
        <label
          className="text-black leading-normal text-lg font-semibold"
          htmlFor="email"
        >
          Email
        </label>

        <input
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (submitted.startsWith("email")) setSubmitted("");
          }}
          placeholder="Please Enter Your Email Address"
          className="text-lg placeholder:font-medium placeholder:text-lg outline-borders border border-solid border-black/30 placeholder:text-input-text rounded-2xl p-2"
          type="email"
          autoComplete="email"
        />

        {submitted.startsWith("email") && (
          <p className="text-lg font-semibold text-required">
            {submitted === "email"
              ? "Email is required"
              : "Please enter a valid email address"}
          </p>
        )}
      </div>

      {/* MOBILE NUMBER */}
      <div className="flex flex-col gap-2">
        <label
          className="text-black leading-normal text-lg font-semibold"
          htmlFor="number"
        >
          Mobile Number
        </label>

        <input
          id="number"
          value={number}
          onChange={(e) => {
            setNumber(e.target.value);
            if (submitted.startsWith("number")) setSubmitted("");
          }}
          placeholder="Enter your 10-digit mobile number"
          className="text-lg placeholder:font-medium placeholder:text-lg outline-borders border border-solid border-black/30 placeholder:text-input-text rounded-2xl p-2"
          type="tel"
          inputMode="numeric"
          maxLength={10}
          autoComplete="tel"
        />

        {submitted.startsWith("number") && (
          <p className="text-lg font-semibold text-required">
            {submitted === "number"
              ? "Mobile number is required"
              : "Enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9"}
          </p>
        )}
      </div>

      {/* DATE OF BIRTH */}
      <div className="flex flex-col gap-2">
        <label
          className="text-black leading-normal text-lg font-semibold"
          htmlFor="dob"
        >
          Date of Birth
        </label>

        <input
          id="dob"
          value={dob}
          onChange={(e) => {
            setDob(e.target.value);
            if (submitted.startsWith("dob")) setSubmitted("");
          }}
          max={new Date().toLocaleDateString("en-CA")}
          className="text-lg placeholder:font-medium placeholder:text-lg outline-borders border border-solid border-black/30 placeholder:text-input-text rounded-2xl p-2"
          type="date"
          autoComplete="bday"
        />

        {submitted.startsWith("dob") && (
          <p className="text-lg font-semibold text-required">
            {submitted === "dob"
              ? "Date of birth is required"
              : "Please select a valid date that is not in the future"}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="bg-button p-4 rounded-full text-white h-12.5 flex items-center justify-center font-bold text-lg cursor-pointer active:scale-80 transition-all duration-200 ease-in-out"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
