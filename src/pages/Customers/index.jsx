import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useLocalStorage from "../../hook/useLocalStorage";
import "./style.scss";

function CustomerList() {
  const [customerList, setCustomerList] = useLocalStorage("customers", []);
  const [editIndex, setEditIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const myFileInput = useRef();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      location: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter Name"),
      email: Yup.string().required("Please enter Email"),
      location: Yup.string().required("Please enter Location"),
      phone: Yup.string()
        .required("Please enter Phone Number")
        .matches(/^[0-9]+$/, "Phone number must contain only digits")
        .min(10, "Phone number must be at least 10 digits"),
    }),
    onSubmit: (values) => {
      const newCustomer = {
        name: values.name,
        email: values.email,
        location: values.location,
        phone: values.phone,
        photo,
      };

      if (editIndex !== null) {
        const updatedList = [...customerList];
        updatedList[editIndex] = newCustomer;
        setCustomerList(updatedList);
        setEditIndex(null);
      } else {
        setCustomerList([...customerList, newCustomer]);
      }

      formik.resetForm();
      setPhoto(null);
      setImagePreview("");
      setShowForm(false);
    },
  });

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const editCustomer = (index) => {
    const customer = customerList[index];
    formik.setValues({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      location: customer.location,
    });
    setImagePreview(customer.photo);
    setPhoto(customer.photo);
    setEditIndex(index);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteCustomer = (index) => {
    const updatedList = customerList.filter((_, i) => i !== index);
    setCustomerList(updatedList);
  };

  const handleCancel = () => {
    formik.resetForm();
    setPhoto(null);
    setImagePreview("");
    setShowForm(false);
    setEditIndex(null);
  };

  return (
    <div className="customer-list">
      <button className="add-button" onClick={() => setShowForm(true)}>
        Add Customer
      </button>

      <div className="forms">
        {showForm && (
          <div className="form">
            <div className="addImage">
              {imagePreview ? (
                <img
                  style={{ width: "320px" }}
                  src={imagePreview}
                  alt="Preview"
                />
              ) : (
                <img
                  className="person"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
                  alt="Default"
                />
              )}
            </div>

            <form className="customer-form" onSubmit={formik.handleSubmit}>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="choosePhoto"
                ref={myFileInput}
              />
              <div
                className="upload"
                onClick={() => {
                  myFileInput.current.click();
                }}
              >
                <i className="fa-solid fa-upload"></i> <span>Add Image</span>
              </div>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="error">{formik.errors.name}</div>
              ) : null}
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error">{formik.errors.email}</div>
              ) : null}
              <input
                type="tel"
                placeholder="Phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="error">{formik.errors.phone}</div>
              ) : null}
              <input
                type="text"
                placeholder="Location"
                name="location"
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.location && formik.errors.location ? (
                <div className="error">{formik.errors.location}</div>
              ) : null}
              <button type="submit">
                {editIndex !== null ? "Update" : "Add Customer"}
              </button>
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>

      <div className="table">
        <div className="customer-table">
          <div className="customer-header">
            <div className="header-item">Photo</div>
            <div className="header-item">Name</div>
            <div className="header-item">Email</div>
            <div className="header-item">Phone</div>
            <div className="header-item">Location</div>
            <div className="header-item">Action</div>
          </div>
          {customerList.map((customer, index) => (
            <div key={index} className="customer-row">
              <div className="customer-item">
                <img
                  src={
                    customer.photo ||
                    "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg"
                  }
                  alt="Customer"
                />
              </div>
              <div className="customer-item">{customer.name}</div>
              <div className="customer-item">{customer.email}</div>
              <div className="customer-item">{customer.phone}</div>
              <div className="customer-item">{customer.location}</div>
              <div className="customer-item">
                <button className="edit" onClick={() => editCustomer(index)}>
                  Edit
                </button>
                <button
                  className="delete"
                  onClick={() => deleteCustomer(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomerList;
