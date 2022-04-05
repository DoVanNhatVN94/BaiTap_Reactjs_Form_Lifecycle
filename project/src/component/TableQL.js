import React, { Component } from "react";
import { connect } from "react-redux";

class TableQL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mangSV: [],
      mangSearch: [],
    };
  }
  searchInput = (event) => {
    let { mangSV, mangSearch } = this.state;
    let { value } = event.target;

    let svCanTim = [];
    if (value != "") {
      svCanTim = mangSV.filter((sv) => sv.hoTen.toLowerCase().includes(value));
      this.setState({
        mangSearch: svCanTim,
      });
    } else {
      this.setState({
        mangSearch: this.state.mangSV,
      });
    }
  };
  renderTable = () => {
    let { mangSearch } = this.state;
    return mangSearch.map((sv, index) => {
      return (
        <tr key={`sv ${index}`}>
          <td>{sv.maSV}</td>
          <td>{sv.hoTen}</td>
          <td>{sv.sdt}</td>
          <td>{sv.email}</td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => {
                let action = {
                  type: "XOA_SV",
                  maSV: sv.maSV,
                };

                this.props.dispatch(action);
              }}
            >
              {" "}
              Xóa
            </button>
            <button
              className="btn btn-info"
              onClick={() => {
                document
                  .getElementById("maSV")
                  .setAttribute("disabled", "disabled");
                document.getElementById("add").classList.add("none");
                document.getElementById("update").classList.remove("none");
                let action = {
                  type: "XEM_THONG_TIN",
                  infor: sv,
                };
                this.props.dispatch(action);
              }}
            >
              Xem
            </button>
          </td>
        </tr>
      );
    });
  };
  render() {
    return (
      <div className="mt-5">
        <div className="search mt-5 bg-black text-white m-auto">
          <div className="row d-flex align-items-center p-2">
            <div className="col-3">
              <p>Tìm kiếm Sinh Viên</p>
            </div>
            <div className="col-8">
              <input
                id="searchInp"
                type="text"
                className="form-control"
                placeholder="Nhập Tên Sinh Viên Ở Đây"
                onChange={this.searchInput}
              />
            </div>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr className="bg-dark text-white">
              <th scope="col">Mã Sinh Viên</th>
              <th scope="col">Họ tên</th>
              <th scope="col">SĐT</th>
              <th scope="col">Email</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>{this.renderTable()}</tbody>
        </table>
      </div>
    );
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.mangSV !== this.props.mangSV) {
      if (prevState.mangSV === prevState.mangSearch)
        this.setState({
          mangSV: this.props.mangSV,
          mangSearch: this.props.mangSV,
        });
    }
  }

  componentDidMount() {
    this.setState({
      mangSV: this.props.mangSV,
      mangSearch: this.props.mangSV,
    });
  }
}
const mapStateToProps = (rootReducer) => {
  return {
    mangSV: rootReducer.QuanLyHSReducer.mangSV,
  };
};
export default connect(mapStateToProps)(TableQL);
