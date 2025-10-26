import React from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";

const Input = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <label className="">{label}</label>

      <div className="input-box ">
        <input
          type={
            type == "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
          value={value}
          onChange={(e) => onChange(e)}
        />

        {type == "password" && (
          <>
            {showPassword ? (
              <FaRegEye
                className="text-primary cursor-pointer"
                onClick={togglePasswordPassword}
              />
            ) : (
              <FaRegEyeSlash
                className="text-slate-400 cursor-pointer"
                onClick={togglePasswordPassword}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
