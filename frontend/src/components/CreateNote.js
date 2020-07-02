import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class CreateNote extends Component {
  state = {
    users: [],
    userSelected: "",
    title: "",
    content: "",
    date: new Date(),
    editing: false,
    _id: "",
  };

  async componentDidMount() {
    const res = await axios.get("http://localhost:4000/api/users");
    this.setState({
      users: res.data.map((users) => users.user),
      userSelected: res.data[0].user,
    });
    if (this.props.match.params.id) {
      const res = await axios.get(
        "http://localhost:4000/api/notes/" + this.props.match.params.id
      );
      this.setState({
        title: res.data.title,
        content: res.data.content,
        userSelected: res.data.author,
        date: new Date(res.data.date),
        editing: true,
        _id: res.data._id,
      });
    }
  }

  onSubmit = async (e) => {
    e.preventDefault();
    if (this.state.editing) {
      const updateNote = {
        title: this.state.title,
        content: this.state.content,
        date: this.state.date,
        author: this.state.userSelected,
      };
      await axios.put(
        "http://localhost:4000/api/notes/" + this.state._id,
        updateNote
      );
    } else {
      const newNote = {
        title: this.state.title,
        content: this.state.content,
        date: this.state.date,
        author: this.state.userSelected,
      };
      await axios.post("http://localhost:4000/api/notes", newNote);
    }
    window.location.href = "/";
  };

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onChangeDate = (date) => {
    this.setState({ date });
  };

  render() {
    return (
      <div className="col-md-6 offset-md-3">
        <div className="card card-body">
          <h4>Create a Note</h4>
          {/* SELECT USER */}
          <div className="form-group">
            <select
              className="form-control"
              name="userSelected"
              onChange={this.onInputChange}
              value={this.state.userSelected}
            >
              {this.state.users.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="title"
              name="title"
              required
              onChange={this.onInputChange}
              value={this.state.title}
            />
          </div>

          <div className="form-group">
            <textarea
              className="form-control"
              placeholder="content"
              name="content"
              required
              onChange={this.onInputChange}
              value={this.state.content}
            ></textarea>
          </div>
          <div className="form-group">
            <DatePicker
              className="form-control"
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
          <form onSubmit={this.onSubmit}>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}
