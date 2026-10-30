import { useState, useRef } from "react";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";

const Form = () => {
  const form = useRef();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // REGEX PATTERNS
  const nameRegex = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/;
  const ageRegex = /^\d+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const numberRegex = /^[6-9]\d{9}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Clears the error of only one field
  const clearError = (field) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // NAME VALIDATION
    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (!nameRegex.test(name.trim())) {
      newErrors.name = "Use letters, spaces, apostrophes, or hyphens only";
    }

    // AGE VALIDATION
    if (!age.trim()) {
      newErrors.age = "Age is required";
    } else if (
      !ageRegex.test(age.trim()) ||
      Number(age) < 10 ||
      Number(age) > 60
    ) {
      newErrors.age = "Age must be a whole number between 10 and 60";
    }

    // EMAIL VALIDATION
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    // PASSWORD VALIDATION
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(password)) {
      newErrors.password =
        "Password must contain 8 characters, uppercase, lowercase, a number, and a special character";
    }

    // MOBILE NUMBER VALIDATION
    if (!number.trim()) {
      newErrors.number = "Mobile number is required";
    } else if (!numberRegex.test(number.trim())) {
      newErrors.number =
        "Enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9";
    }

    // DOB VALIDATION
    if (!dob) {
      newErrors.dob = "Date of birth is required";
    } else {
      const today = new Date().toLocaleDateString("en-CA");
      if (dob > today) {
        newErrors.dob = "Please select a valid date that is not in the future";
      }
    }

    // SHOW ALL ERRORS AT ONCE
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    // EMAILJS
    emailjs
      .sendForm("service_o70kh7q", "template_9890534", form.current, {
        publicKey: "p6hkOR5adBml4KhwX",
      })
      .then(
        () => {
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
          setPassword("");
          setShowPassword(false);
          setErrors({});
        },
        (error) => {
          console.log("FAILED...", error.text);

          Swal.fire({
            position: "center",
            icon: "error",
            title: "Submission Failed!",
            text: "Please try again.",
          });
        },
      );
  };

  return (
    <form
      ref={form}
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
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            clearError("name");
          }}
          placeholder="Please Enter Your Name"
          className="text-lg placeholder:font-medium placeholder:text-lg outline-borders border border-solid border-black/30 placeholder:text-input-text rounded-2xl p-2"
          type="text"
          autoComplete="name"
        />

        {errors.name && (
          <p className="text-lg font-semibold text-required">{errors.name}</p>
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
          name="age"
          value={age}
          onChange={(e) => {
            setAge(e.target.value);
            clearError("age");
          }}
          placeholder="Please Enter Your Age"
          min="1"
          max="1000"
          className="text-lg placeholder:font-medium placeholder:text-lg outline-borders border border-solid border-black/30 placeholder:text-input-text rounded-2xl p-2"
          type="number"
          autoComplete="off"
        />

        {errors.age && (
          <p className="text-lg font-semibold text-required">{errors.age}</p>
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
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            clearError("email");
          }}
          placeholder="Please Enter Your Email Address"
          className="text-lg placeholder:font-medium placeholder:text-lg outline-borders border border-solid border-black/30 placeholder:text-input-text rounded-2xl p-2"
          type="email"
          autoComplete="email"
        />

        {errors.email && (
          <p className="text-lg font-semibold text-required">{errors.email}</p>
        )}
      </div>

      {/* PASSWORD */}
      <div className="flex flex-col gap-2">
        <label
          className="text-black leading-normal text-lg font-semibold"
          htmlFor="password"
        >
          Password
        </label>

        <div className="relative flex items-center">
          <input
            id="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              clearError("password");
            }}
            placeholder="Please Enter Your Password"
            className="text-lg w-full placeholder:font-medium placeholder:text-lg outline-borders border border-solid border-black/30 placeholder:text-input-text rounded-2xl p-2 pr-20"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 text-sm font-semibold text-black cursor-pointer active:scale-95 transition-all duration-200"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {errors.password && (
          <p className="text-lg font-semibold text-required">
            {errors.password}
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
          name="number"
          value={number}
          onChange={(e) => {
            setNumber(e.target.value);
            clearError("number");
          }}
          placeholder="Enter your 10-digit mobile number"
          className="text-lg placeholder:font-medium placeholder:text-lg outline-borders border border-solid border-black/30 placeholder:text-input-text rounded-2xl p-2"
          type="tel"
          inputMode="numeric"
          maxLength={10}
          autoComplete="tel"
        />

        {errors.number && (
          <p className="text-lg font-semibold text-required">
            {errors.number}
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
          name="dob"
          value={dob}
          onChange={(e) => {
            setDob(e.target.value);
            clearError("dob");
          }}
          max={new Date().toLocaleDateString("en-CA")}
          className="text-lg placeholder:font-medium placeholder:text-lg outline-borders border border-solid border-black/30 placeholder:text-input-text rounded-2xl p-2"
          type="date"
          autoComplete="bday"
        />

        {errors.dob && (
          <p className="text-lg font-semibold text-required">{errors.dob}</p>
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