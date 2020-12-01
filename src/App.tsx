import React, { useState, useEffect, ReactNode, ChangeEvent } from "react";
import "./App.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";
import { v4 } from "uuid";
import $ from "jquery";

interface IProps {
  destination: ReactNode;
  source: ReactNode;
}

interface commentsData {
  Name: string;
  commment: string;
}

interface item {
  id: string;
  name: string;
  date: string;
  comments: [commentsData];
}
interface DataSet {
  todo: {
    title: "Todo";
    items: [item];
  };
  inprogress: {
    title: "Progress";
    items: [];
  };
  done: {
    title: "Completed";
    items: [];
  };
}

const item = {
  id: v4(),
  name: "Fill the water bottles",
  date: "2020-11-30",
  comments: [],
};

function App() {
  const [newItemModal, setNewItemModal] = useState<string>("");
  const [date, setDate] = useState<any>(() => {
    var today: string | Date = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    return(
      today
    )
  });
  const [editId, setEditID] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [cardName, setCardName] = useState<string>("");
  const [modalType, setModalType] = useState<any>();
  const [state, setState] = useState<any>({
    todo: {
      title: "Todo",
      items: [item],
    },
    inprogress: {
      title: "Progress",
      items: [],
    },
    done: {
      title: "Completed",
      items: [],
    },
  });

  useEffect(() => {
    var today: string | Date = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;
    $("#minDate").attr("min", today);
    // setDate(today);
  });

  

  const handleDragEnd = ({ destination, source }: any) => {
    if (!destination) {
      return;
    }
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }

    // Creating a copy of item before removing it from state
    const itemCopy = { ...state[source.droppableId].items[source.index] };

    var prev = { ...state };
    prev[source.droppableId].items.splice(source.index, 1);
    prev[destination.droppableId].items.splice(destination.index, 0, itemCopy);
    setState(prev);
  };

  const handleChangeTextFields = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewItemModal(e.target.value);
  };
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };
  const handleChangeCommentField = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };
  const handleCardChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCardName(e.target.value);
  };

  const editSubmitModal = (id: any) => {
    setDate("2020-11-30");
    if (newItemModal !== "") {
      setNewItemModal("");
      var editState = state;
      editState.todo.items.map((item: any) => {
        if (item.id === id) {
          item.name = newItemModal;
          item.date = date;
        }
      });
      editState.inprogress.items.map((item: any) => {
        if (item.id === id) {
          item.name = newItemModal;
          item.date = date;
        }
      });
      editState.done.items.map((item: any) => {
        if (item.id === id) {
          item.name = newItemModal;
          item.date = date;
        }
      });
      setState(editState);
      $(`#${id + "div"}`).hide();
      setComment("");
      $("#myModal").hide();
    } else {
      alert("Please Enter Something");
    }
  };

  const closeModal = () => {
    $("#myModal").hide();
  };

  const openModal = (e: any) => {
    $("#myModal").show();
    var str = e.target.id;

    // console.log(e.target."data-Id")
    console.log($(`#${str}`).attr("data-id"));
    setModalType($(`#${str}`).attr("data-id"));

    str.replace("todo", "");
    setEditID(str);

    setNewItemModal($(`#${str + "todo"}`).html());
  };

  const addComment = (id: any) => {
    if (comment !== "") {
      var editState = state;
      editState.todo.items.map((item: any) => {
        if (item.id === id) {
          item.comments.push({
            Name:
              $('input[name="gender"]:checked').val() === undefined
                ? "Unknown User"
                : $('input[name="gender"]:checked').val(),
            commment: comment,
          });
        }
      });
      editState.inprogress.items.map((item: any) => {
        if (item.id === id) {
          item.comments.push({
            Name:
              $('input[name="gender"]:checked').val() === undefined
                ? "Unknown User"
                : $('input[name="gender"]:checked').val(),
            commment: comment,
          });
        }
      });
      editState.done.items.map((item: any) => {
        if (item.id === id) {
          item.comments.push({
            Name:
              $('input[name="gender"]:checked').val() === undefined
                ? "Unknown User"
                : $('input[name="gender"]:checked').val(),
            commment: comment,
          });
        }
      });
      setState(editState);
      $(`#${id + "div"}`).hide();
      setComment("");
    } else {
      alert("Please Enter Something");
    }
  };

  const addCard = (title: any) => {
    $(`#${title + "add-card-div"}`).show();
  };

  const submitAddCard = (title: any) => {
    if (cardName !== "") {
      $(`#${title + "add-card-div"}`).hide();
      if (title === "Todo") {
        setState((prev: any) => {
          return {
            ...prev,
            todo: {
              title: "Todo",
              items: [
                {
                  id: v4(),
                  name: cardName,
                  date: date,
                  comments: [],
                },
                ...prev.todo.items,
              ],
            },
          };
        });
      } else if (title === "Progress") {
        setState((prev: any) => {
          return {
            ...prev,
            inprogress: {
              title: "Progress",
              items: [
                {
                  id: v4(),
                  name: cardName,
                  date: date,
                  comments: [],
                },
                ...prev.inprogress.items,
              ],
            },
          };
        });
      } else {
        setState((prev: any) => {
          return {
            ...prev,
            done: {
              title: "Completed",
              items: [
                {
                  id: v4(),
                  name: cardName,
                  date: date,
                  comments: [],
                },
                ...prev.done.items,
              ],
            },
          };
        });
      }
    } else {
      alert("Please Enter Something");
    }
    setCardName("");
  };

  return (
    <div>
      <h1 className="app-title">TypeScript trello Table</h1>
      <div id="myModal" className="modal">
        {/* <!-- Modal content --> */}
        <div className="modal-content">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <div className="modal-container">
            <textarea
              className="card-text"
              value={newItemModal}
              onChange={handleChangeTextFields}
            ></textarea>
            <br />
            <span>Due Date :</span>
            <input
              id="minDate"
              type="date"
              value={date}
              onChange={handleDateChange}
            />
            <br />
            <h4>Comments:</h4>

            {modalType === "Todo"
              ? state.todo.items.map((item: any) => {
                  if (editId === item.id) {
                    return item.comments.map((text: any, index: any) => (
                      <div className="comment-dev" key={index + 1}>
                        <p className="comment-text">
                          <span>{text.Name + " :"} </span>
                          {text.commment}
                        </p>
                      </div>
                    ));
                  } else {
                    return null;
                  }
                })
              : null}
            {modalType === "Progress"
              ? state.inprogress.items.map((item: any) => {
                  if (editId === item.id) {
                    return item.comments.map((text: any, index: any) => (
                      <div className="comment-dev" key={index + 1}>
                        <p className="comment-text">
                          <span>{text.Name + " :"} </span>
                          {text.commment}
                        </p>
                      </div>
                    ));
                  } else {
                    return null;
                  }
                })
              : null}
            {modalType === "Completed"
              ? state.done.items.map((item: any) => {
                  if (editId === item.id) {
                    return item.comments.map((text: any, index: any) => (
                      <div className="comment-dev" key={index + 1}>
                        <p className="comment-text">
                          <span>{text.Name + " :"} </span>
                          {text.commment}
                        </p>
                      </div>
                    ));
                  } else {
                    return null;
                  }
                })
              : null}
            <div className="comment-dev">
              <p className="comment-text">
                <span>User : </span>Demo Comment
              </p>
            </div>
            <h4>Add Comments: </h4>
            <p>Please select your Name:</p>
            <input type="radio" id="Sourav" name="gender" value="Sourav" />
            <label>Sourav</label>
            <input type="radio" id="Sourav" name="gender" value="Riya" />
            <label>Riya</label>
            <br />
            <input
              type="text"
              id="comment"
              value={comment}
              placeholder="Add Comments..."
              onChange={handleChangeCommentField}
            ></input>
            <br />
            <button className="button" onClick={() => addComment(editId)}>
              <span>Submit</span>
            </button>
            <br />
            <a className="button3" onClick={() => editSubmitModal(editId)}>
              Save
            </a>
          </div>
        </div>
      </div>
      <div className="container" style={{ textAlign: "center" }}></div>
      <div className="drang-n-drop">
        <DragDropContext onDragEnd={handleDragEnd}>
          {_.map(state, (data, key) => {
            return (
              <div key={key} className={"column"}>
                <h2 style={{ color: "white" }}>{data.title}</h2>
                <Droppable droppableId={key}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={"droppable-col"}
                      >
                        {data.items.map((el: any, index: any) => {
                          return (
                            <Draggable
                              key={el.id}
                              index={index}
                              draggableId={el.id}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    className={`item ${
                                      snapshot.isDragging && "dragging"
                                    }`}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    data-id={data.title}
                                    id={el.id}
                                    onClick={(e) => openModal(e)}
                                  >
                                    <label id={el.id + "todo"}>{el.name}</label>
                                    <br />
                                    <label
                                      id={el.id + "date"}
                                      className="date-label"
                                    >
                                      DueDate :{" "}
                                      {el.date === "" ? "2020-11-27" : el.date}{" "}
                                    </label>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        <div className="card-composer-container js-card-composer-container">
                          <a
                            className="open-card-composer js-open-card-composer"
                            onClick={() => addCard(data.title)}
                          >
                            <span className="icon-sm icon-add"></span>
                            <span className="js-add-another-card">
                              Add a card
                            </span>
                          </a>
                        </div>
                        <div
                          id={data.title + "add-card-div"}
                          style={{ display: "none" }}
                        >
                          <input
                            type="text"
                            className="card-txt"
                            onChange={handleCardChange}
                            value={cardName}
                          />
                          <button
                            type="submit"
                            className="card-submit"
                            onClick={() => submitAddCard(data.title)}
                          >
                            Submit
                          </button>
                        </div>
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
}
export default App;
