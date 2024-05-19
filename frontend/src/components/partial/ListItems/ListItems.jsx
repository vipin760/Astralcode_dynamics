import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteTask, TaskGet } from "../../../redux/tasks/task.action";
import Loading from "../Loading/Loading";
const ListItems = () => {
  const dispatch = useDispatch();
  const [Selected, setSelector] = useState("all");
  const [Count, setCount] = useState([]);
  const [Page, setPage] = useState();
  const [keyword,setKeyword]=useState('')
  const TaskDetails = useSelector((state) => state.TaskDetails);
  const { taskData, loading, error } = TaskDetails;
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

  const handleDelete = (id) => {
    dispatch(DeleteTask(id)).then((res) => {
      dispatch(TaskGet(Selected, Page));
    });
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

 const handleSubmit=(e)=>{
  e.preventDefault()
      if(keyword){
        setSelector("all");
        dispatch(TaskGet('all',1,keyword))
      }
  }
  return (
    <>
    <form action="" className='text-center mt-5 mb-2 shadow-lg' onSubmit={handleSubmit}>
      <input type="text" placeholder='Search here....' name='search' onChange={e=>setKeyword(e.target.value)} className='m-1 mt-4 text-center border rounded bg-slate-100'/><button type='submit' className='bg-white text-black pl-2 rounded m-1 pr-2 hover:bg-slate-200 '>Search</button>
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
          <a
            href="/create"
            className="text-white bg-violet-950 p-2 text-center w-80 rounded-2xl"
          >
            <i className="fa-solid fa-add text-white font-bold m-1"></i>CREATE
            NOTE
          </a>

          {TaskDetails.taskData && TaskDetails.taskData.data ? (
            <>
              {TaskDetails.taskData.data.length < 1 ? (
                <div className="text-white">Not Tasks is Here...</div>
              ) : (
                <>
                  {TaskDetails.taskData.data.map((data, index) => (
                    <div
                      key={index}
                      className="bg-violet-950 flex items-center justify-center p-3 md:w-1/4 w-9/12 sm:w-1/2 mt-5"
                    >
                      <div className="w-11/12">
                        <h3 className="text-2xl font-bold text-center text-white">
                          {data.title}
                        </h3>
                        <p className="text-sm m-3 scroll-m-2 text-white">
                          {data.description}
                        </p>
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
                    {taskData.countDocuments ? (
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
                                  parseInt(Page) === index + 1
                                    ? "bg-violet-500 text-black font-semibold"
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
              {<Loading />}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ListItems;
