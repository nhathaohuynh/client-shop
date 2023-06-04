import React, { useEffect, useState } from "react";
import { categoriesData } from "../../static/data";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/style";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../Loading";
import { useRef } from "react";
import { createEvent } from "../../redux/actions/event";

const CreateEvent = () => {
  const dispatch = useDispatch();
  const { successCreate, loadingCreate, error } = useSelector(
    (state) => state.event
  );
  const { seller } = useSelector((state) => state.seller);
  const initValueInputs = {
    name: "",
    description: "",
    category: "",
    tags: "",
    originalPrice: "", 
    discountPrice: "",
    stock: "",
    images: [],
    start_date: null,
    finish_date: null,
  };
  const [inputs, setInputs] = useState(initValueInputs);
  const today = new Date().toISOString().slice(0, 10);
  const minEndDate = inputs.start_date
    ? new Date(inputs.start_date.getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    : "";
  const endDateRef = useRef();

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
        theme: "colored",
      });
    }
    if (successCreate) {
      toast.success("Event was created successfully", {
        position: "bottom-center",
        theme: "colored",
      });
      window.location.reload(true);
    }
  }, [dispatch, error, successCreate]);

  const handleChangeInputs = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeImages = (e) => {
    let files = Array.from(e.target.files);
    setInputs({
      ...inputs,
      [e.target.name]: [...inputs.images, ...files],
    });
  };

  const handleChangeStartDate = (e) => {
    const startDate = new Date(e.target.value);
    const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
    setInputs({
      ...inputs,
      start_date: startDate,
      finish_date: null,
    });
    endDateRef.current.min = minEndDate.toISOString().slice(0, 10);
  };

  const handleChangeEndDate = (e) => {
    const endtDate = new Date(e.target.value);

    setInputs({
      ...inputs,
      finish_date: endtDate,
    });
  };

  const handleClickDeleteImage = (index) => {
    setInputs({
      ...inputs,
      images: inputs.images.filter((image, i) => i !== index),
    });
  };

  console.log(inputs);
  const handleSubmit = (e) => {
    e.preventDefault();

    const Form = new FormData();

    inputs.images.forEach((image) => Form.append("images", image));
    Form.append("name", inputs.name);
    Form.append("description", inputs.description);
    Form.append("category", inputs.category);
    Form.append("tags", inputs.tags);
    Form.append("originalPrice", inputs.originalPrice);
    Form.append("discountPrice", inputs.discountPrice);
    Form.append("startDate", inputs.start_date);
    Form.append("finishDate", inputs.finish_date);
    Form.append("stock", inputs.stock);
    Form.append("shopId", seller?._id);
    dispatch(createEvent(Form));
    setInputs(initValueInputs);
  };
  return loadingCreate ? (
    <Loading></Loading>
  ) : (
    <>
      <div className="mt-5 w-[95%] 800px:w-[80%] bg-white shadow rounded-[4px] p-5 pt-0 overflow-y-auto detailCard">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <br />
          <div>
            <label className="pb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your event product name..."
              value={inputs.name}
              onChange={handleChangeInputs}
            />
          </div>
          <br />
          <div>
            <label className="pb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              cols="30"
              required
              rows="8"
              type="text"
              name="description"
              className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your event product description..."
              value={inputs.description}
              onChange={handleChangeInputs}
            ></textarea>
          </div>
          <br />
          <div>
            <label className="pb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full mt-2 border h-[35px] rounded-[5px] px-2 text-gray-400"
              name="category"
              onChange={handleChangeInputs}
            >
              <option value="Choose a category">Choose a category</option>
              {categoriesData &&
                categoriesData.map((i) => (
                  <option value={i.title} key={i.title}>
                    {i.title}
                  </option>
                ))}
            </select>
          </div>
          <br />
          <div>
            <label className="pb-2">Tags</label>
            <input
              type="text"
              name="tags"
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your event tags..."
              value={inputs.tags}
              onChange={handleChangeInputs}
            />
          </div>
          <br />
          <div>
            <label className="pb-2" htmlFor="start-date">
              Event Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="start_date"
              id="start-date"
              value={
                inputs.start_date
                  ? inputs?.start_date.toISOString().slice(0, 10)
                  : ""
              }
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={handleChangeStartDate}
              min={today}
              placeholder="Enter your event product stock..."
            />
          </div>
          <br />
          <div>
            <label className="pb-2" htmlFor="finish-date">
              Event End Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="finish-date"
              id="finish-date"
              ref={endDateRef}
              value={
                inputs.finish_date
                  ? inputs.finish_date.toISOString().slice(0, 10)
                  : ""
              }
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={handleChangeEndDate}
              min={minEndDate}
              placeholder="Enter your event product stock..."
            />
          </div>
          <br />
          <div>
            <label className="pb-2">Original Price</label>
            <input
              type="number"
              name="originalPrice"
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your event product price..."
              value={inputs.originalPrice}
              onChange={handleChangeInputs}
            />
          </div>
          <br />
          <div>
            <label className="pb-2">
              Price (With Discount) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="discountPrice"
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your vent price with discount..."
              value={inputs.discountPrice}
              onChange={handleChangeInputs}
            />
          </div>
          <br />
          <div>
            <label className="pb-2">
              Product Stock <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="stock"
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your event product stock..."
              value={inputs.stock}
              onChange={handleChangeInputs}
            />
          </div>
          <br />
          <div>
            <label className="pb-2">
              Upload Images <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              name="images"
              id="upload"
              className="hidden"
              multiple
              onChange={handleChangeImages}
            />
            <div className="w-full flex items-center flex-wrap">
              <label htmlFor="upload">
                <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
              </label>
              {inputs?.images.length > 0 &&
                inputs?.images.map((i, index) => (
                  <div key={crypto.randomUUID()} className="relative">
                    <img
                      src={URL.createObjectURL(i)}
                      alt=""
                      className="h-[100px] w-[100px] object-cover m-2"
                    />
                    <div
                      className="absolute top-[10px] right-[10px] w-[20px] h-[20px] bg-white flex justify-center items-center rounded-full cursor-pointer "
                      onClick={() => handleClickDeleteImage(index)}
                    >
                      <RxCross1 className=" text-red-500" size={16}></RxCross1>
                    </div>
                  </div>
                ))}
            </div>
            <br />
            <div>
              <button
                type="submit"
                className={` ${styles.button} !bg-white text-[18px] mt-2 border border-gray-300 w-full font-[500] focus:outline-none focus:ring-blue-500 focus:border-blue-50`}
              >
                Create Event
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateEvent;
