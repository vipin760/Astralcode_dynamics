import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteTask,
  TaskGet,
  TogglePriority,
} from "../../../redux/tasks/task.action";
import Loading from "../Loading/Loading";
import Modal from "../Modal/Modal";
const ListItems = () => {
  const dispatch = useDispatch();
  const [Selected, setSelector] = useState("all");
  const [Count, setCount] = useState([]);
  const [Page, setPage] = useState("1");
  const [keyword, setKeyword] = useState("");
  const TaskDetails = useSelector((state) => state.TaskDetails);
  const { error, taskData, loading } = TaskDetails;
  const [onModal, setOnModal] = useState(false);
  const [data, setData] = useState({});
  const [TaskData, setTaskData] = useState([]);
  useEffect(() => {
    setPage(1);
    dispatch(TaskGet("all", 1));
  }, []);

  useEffect(() => {
    if (taskData && taskData.countDocuments) {
      const numbersArray = Array.from(
        { length: taskData.countDocuments },
        (_, index) => index + 1
      );
      setCount(numbersArray);
    }
  }, [taskData]);

  useEffect(() => {
    if (taskData && taskData.data) {
      setTaskData(taskData.data);
    }
  }, [taskData]);

  const handleSelect = (e) => {
    if (e.target.id === "all") {
      dispatch(TaskGet("all", "1"));
      setPage("1");
      setSelector("all");
    } else if (e.target.id === "progress") {
      dispatch(TaskGet("progress", "1"));
      setPage("1");
      setSelector("progress");
    } else if (e.target.id === "pending") {
      dispatch(TaskGet("pending", "1"));
      setPage("1");
      setSelector("pending");
    } else if (e.target.id === "completed") {
      dispatch(TaskGet("completed", "1"));
      setPage("1");
      setSelector("completed");
    }
  };

  const handleNext = (value) => {
    if (value === "next") {
      if (parseInt(Page) >= taskData.countDocuments) {
        value = taskData.countDocuments;
      } else {
        value = parseInt(Page) + 1;
      }
    }
    if (value === "prev") {
      if (parseInt(Page) <= 1) {
        value = 1;
      } else {
        value = parseInt(Page) - 1;
      }
    }
    if (value === "last") {
      value = taskData.countDocuments;
    }
    setPage(value);
    if (Page) {
      dispatch(TaskGet(Selected, value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword) {
      setSelector("all");
      dispatch(TaskGet("all", 1, keyword));
    }
  };

  const handleCustomeSelect=(data)=>{
    if(data){
      dispatch(TaskGet(Selected,1,undefined,data))
    }
  }
  const handlePopup = (data) => {
    setOnModal(true);
    setData(data);
  };
  //  const handlePriority = (id)=>{
  //   console.log("idddd",id,taskData.data)
  //   taskData.data.forEach(element => {
  //     if(element._id===id){
  //       element.priority=true;
  //       console.log("element",element)
  //     }
  //   });
  //   console.log("taskData.data",taskData.data)
  //  }
  const handlePriority = (id) => {
    setTaskData((prevTaskData) => {
      const updatedTaskData = prevTaskData.map((element) => {
        if (element._id === id) {
          dispatch(TogglePriority(id));
          return { ...element, priority: !element.priority };
        } else {
          return element;
        }
      });
      return updatedTaskData;
    });
  };

  const handleDelete = async(id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    if(confirmDelete){
      dispatch(DeleteTask(id)).then((res) => {
        dispatch(TaskGet(Selected, Page));
      });
    };
    }

  return (
    <>
      <form
        action=""
        className="text-center mt-5 mb-2 shadow-lg"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Search here...."
          name="search"
          onChange={(e) => setKeyword(e.target.value)}
          className="m-1 mt-4 text-center border rounded bg-slate-100"
        />
        <button
          type="submit"
          className="bg-white text-black pl-2 rounded m-1 pr-2 hover:bg-slate-200 "
        >
          Search
        </button>
      </form>
      <div className="w-full h-full md:flex md:flex-col sm:justify-start">
        <div className="md:w-full mt-">
          <ul
            className="flex justify-evenly w-full shadow-lg cursor-pointer"
            onClick={handleSelect}
          >
            <li
              className={`w-1/4 text-center ${
                Selected === "all" ? "bg-violet-600 text-white font-bold" : ""
              }`}
              id="all"
            >
              All
            </li>
            <li
              className={`w-1/4 text-center ${
                Selected === "progress"
                  ? "bg-violet-600 text-white font-bold"
                  : ""
              }`}
              id="progress"
            >
              progress
            </li>
            <li
              className={`w-1/4 text-center ${
                Selected === "pending"
                  ? "bg-violet-600 text-white font-bold"
                  : ""
              }`}
              id="pending"
            >
              pending
            </li>
            <li
              className={`w-1/4 text-center ${
                Selected === "completed"
                  ? "bg-violet-600 text-white font-bold"
                  : ""
              }`}
              id="completed"
            >
              completed
            </li>
          </ul>
        </div>
        <div className="w-full mt-4 flex flex-col items-center justify-center">
          <div className="gap-2">
          <a
            href="/create"
            className="text-white bg-violet-950 p-2 text-center w-80 rounded-2xl mr-2"
          >
            <i className="fa-solid fa-add text-white font-bold m-1"></i>CREATE
            NOTE
          </a>
          <select name="data" id="" className="rounded-sm bg-violet-950 text-white p-1" onChange={(e)=>handleCustomeSelect(e.target.value)}>
            <option value="none">none</option>
            <option value="work">work</option>
            <option value="form">1</option>
          </select>
          </div>

          {TaskDetails.taskData && TaskDetails.taskData.data ? (
            <>
              {TaskDetails.taskData.data.length < 1 ? (
                <div className="text-white">Not Tasks is Here...</div>
              ) : (
                <>
                  {onModal ? (
                    <div onClick={() => setOnModal(false)}>
                      <Modal data={data} />
                    </div>
                  ) : (
                    <></>
                  )}
                  {TaskData.map((data, index) => (
                    <div
                      key={index}
                      className={` bg-violet-950 shadow-xl transition-transform duration-500 ease-in-out transform hover:-translate-y-1 flex items-center justify-center p-3 md:w-1/4 w-9/12 sm:w-1/2 mt-5 ${
                        data.priority ? "border-l-4 border-red-600" : ""
                      }`}
                    >
                      <div className="w-11/12">
                        <h3
                          className="text-2xl font-bold text-center text-white"
                          onDoubleClick={() => handlePriority(data._id)}
                        >
                          {data.title}
                        </h3>
                        <p
                          className="text-sm m-3 scroll-m-2 text-white"
                          onClick={() => handlePopup(data)}
                        >
                          {data.description.length >= 20 ? (
                            <>{data.description.slice(0, 20)}.......</>
                          ) : (
                            <>{data.description}</>
                          )}
                        </p>
                        <p className="text-white">{data.date}</p>
                      </div>

                      <div className="w-1/12 m-1 text-white">
                        <a onClick={() => handleDelete(data._id)}>
                          <i className="fa-solid fa-trash"></i>
                        </a>
                        <a href={`/edit/${data._id}`}>
                          <i className="fa-solid fa-edit mt-5"></i>
                        </a>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center flex-wrap justify-center md:w-1/4 w-9/12 sm:w-1/2 mt-5">
                    {taskData.countDocuments && Count.length >= 2 ? (
                      <>
                        <div
                          className="bg-violet-950 p-2 border text-white cursor-pointer"
                          onClick={() => handleNext("next")}
                        >
                          next
                        </div>
                        <div
                          className="bg-violet-950 p-2 border text-white cursor-pointer"
                          onClick={() => handleNext("prev")}
                        >
                          prev
                        </div>
                        {Count &&
                          Count.map((data, index) => (
                            <div key={index}>
                              <div
                                className={`bg-violet-950 p-2 border text-white cursor-pointer ${
                                  Page === index + 1
                                    ? "bg-white text-violet-900 font-semibold"
                                    : ""
                                }`}
                                onClick={() => handleNext(data)}
                              >
                                {data}
                              </div>
                            </div>
                          ))}
                        <div
                          className="bg-violet-950 p-2 border text-white cursor-pointer"
                          onClick={() => handleNext("last")}
                        >
                          last
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="w-full text-white flex items-center justify-center mt-12">
              {error}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ListItems;
