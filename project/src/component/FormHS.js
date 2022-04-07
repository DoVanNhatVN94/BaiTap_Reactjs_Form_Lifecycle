import React, { Component } from "react";
import { connect } from "react-redux";

class FormHS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sv: {
        maSV: "",
        hoTen: "",
        sdt: "",
        email: "",
      },
      errors: {
        maSV: "",
        hoTen: "",
        sdt: "",
        email: "",
      },
    };
  }

  handleInput = (event) => {
    let { value, name } = event.target;

    let newValues = { ...this.state.sv };
    newValues[name] = value;

    let newError = { ...this.state.errors };

    let message = "";
    //kt empty
    if (value.trim() === "") {
      message = name + " không được để trống";
    }
    let attrValue = event.target.getAttribute("data-type");
    let reg = "";
    if (attrValue === "email") {
      reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!reg.test(value)) {
        //không đúng thì thông báo lỗi
        message = name + " không đúng định dạng";
      }
    }
    newError[name] = message;
    this.setState({
      sv: newValues,
      errors: newError,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    let isValid = true;
    let isValu = true;
    for (let key in this.state.errors) {
      if (this.state.errors[key] != "") {
        isValid = false;

        break;
      }
    }
    for (let key in this.state.sv) {
      if (this.state.sv[key] == "") {
        isValu = false;
        break;
      }
    }
    if (!isValu) {
      alert("Chưa nhập hết giá trị kìa");
      return;
    }
    if (!isValid) {
      alert("Còn lỗi nè");
      return;
    }

    let { mangSV } = this.props;
    let check = mangSV.some((sv) => {
      return sv.maSV == this.state.sv.maSV;
    });
    if (!check) {
      let action = {
        type: "THEM_SV",
        sv: this.state.sv,
      };
      this.props.dispatch(action);
    } else {
      alert("Đã có sv có mã trùng");
      const input = document.getElementById("maSV");
      input.focus();
      input.setSelectionRange(0, 0);
    }
  };
  capNhapSV = () => {
    document.getElementById("maSV").removeAttribute("disabled");
    document.getElementById("update").classList.add("none");
    document.getElementById("add").classList.remove("none");
    let curentValue = {...this.state.vn}
    let action = {
      type: "CAP_NHAP",
      sv: this.state.sv,
    };
    this.props.dispatch(action);
    let checkUpdate = this.props.mangSV.find(sv=> curentValue===sv)
    if(!checkUpdate){
      alert("update ko thanh cong tai du lieu bi khong con")
    }
    
  };

  render() {
    let { sv } = this.state;
    let { maSV, hoTen, sdt, email } = this.state.errors;
    return (
      <div>
        <form id="myForm" onSubmit={this.handleSubmit}>
          <div className="card-header bg-dark text-white p-3">
            <h2>Thông tin sinh viên</h2>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="form-group col-6">
                <label>Mã Sinh Viên</label>
                <input
                  id="maSV"
                  onChange={this.handleInput}
                  type="text"
                  name="maSV"
                  className="form-control"
                  value={sv.maSV}
                />
                <p className="text-danger">{maSV}</p>
              </div>
              <div className="form-group col-6">
                <label>Họ Tên</label>
                <input
                  onChange={this.handleInput}
                  type="text"
                  name="hoTen"
                  className="form-control"
                  value={sv.hoTen}
                />
                <p className="text-danger">{hoTen}</p>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-6">
                <label>Số điện thoại</label>
                <input
                  onChange={this.handleInput}
                  type="text"
                  name="sdt"
                  className="form-control"
                  value={sv.sdt}
                />
                <p className="text-danger">{sdt}</p>
              </div>
              <div className="form-group col-6">
                <label>Email</label>
                <input
                  data-type="email"
                  onChange={this.handleInput}
                  type="text"
                  name="email"
                  className="form-control"
                  value={sv.email}
                />
                <p className="text-danger">{email}</p>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <button id="add" className="btn btn-success">
              Thêm Sinh Viên
            </button>
            <button
              type="button"
              id="update"
              className="btn btn-primary"
              onClick={() => {
                this.capNhapSV();
              }}
            >
              Cập Nhật
            </button>
          </div>
        </form>
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.infor !== this.props.infor) {
      if (this.props.infor !== prevState.sv) {
        this.setState({
          sv: this.props.infor,
        });
      }
    }
  }

  componentDidMount() {
    document.getElementById("update").classList.add("none");
    document.getElementById("add").classList.remove("none");
  }
}
const mapStateToProps = (rootReducer) => {
  return {
    mangSV: rootReducer.QuanLyHSReducer.mangSV,
    values: rootReducer.QuanLyHSReducer.sinhVien.values,
    errors: rootReducer.QuanLyHSReducer.sinhVien.errors,
    infor: rootReducer.QuanLyHSReducer.infor,
  };
};
export default connect(mapStateToProps)(FormHS);
