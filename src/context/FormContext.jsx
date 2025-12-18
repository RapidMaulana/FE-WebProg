import React, { createContext, useState, useCallback } from "react";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormDataState] = useState({
    login: { email: "", password: "" },
    register: {
      nama: "",
      email: "",
      password: "",
      password_confirmation: "",
      nomor_telepon: "",
      alamat: "",
    },
  });

  // Reset form data
  const resetFormData = useCallback(() => {
    setFormDataState({});
  }, []);

  // Set specific form data
  const setFormData = useCallback((formName, data) => {
    setFormDataState((prev) => ({
      ...prev,
      [formName]: data,
    }));
  }, []);

  // Get specific form data
  const getFormData = useCallback(
    (formName) => {
      return formData[formName] || {};
    },
    [formData]
  );

  // Update single field in form
  const updateField = useCallback((formName, fieldName, value) => {
    setFormDataState((prev) => ({
      ...prev,
      [formName]: {
        ...prev[formName],
        [fieldName]: value,
      },
    }));
  }, []);

  // Clear specific form
  const clearForm = useCallback((formName) => {
    setFormDataState((prev) => {
      const newState = { ...prev };
      delete newState[formName];
      return newState;
    });
  }, []);

  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        getFormData,
        updateField,
        resetFormData,
        clearForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useForm = (formName) => {
  const context = React.useContext(FormContext);
  if (!context) {
    throw new Error("useForm must be used within FormProvider");
  }

  const { setFormData, getFormData, updateField, clearForm } = context;
  const currentFormData = getFormData(formName);

  return {
    formData: currentFormData,
    setFormData: (data) => setFormData(formName, data),
    updateField: (fieldName, value) => updateField(formName, fieldName, value),
    clearForm: () => clearForm(formName),
  };
};
