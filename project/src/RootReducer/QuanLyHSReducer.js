let qlhs = {
  mangSV: [
    { maSV: "001", hoTen: "nhat", sdt: "1", email: "a@gmail.com" },
    { maSV: "002", hoTen: "linh", sdt: "2", email: "b@gmail.com" },
    { maSV: "003", hoTen: "nam", sdt: "3", email: "a@gmail.com" },
  ],
  sinhVien: {
    values: {
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
  },
  infor: {
    maSV: "",
    hoTen: "",
    sdt: "",
    email: "",
  },
};
export const QuanLyHSReducer = (state = qlhs, action) => {
  switch (action.type) {
    case "HANDLE_INPUT":
      state.sinhVien = action.sv;

      return { ...state };

    case "THEM_SV":
      state.mangSV = [...state.mangSV, action.sv];

      return { ...state };
    case "XOA_SV":
      let mangNDXoa = [...state.mangSV];
      state.mangSV = mangNDXoa.filter((sv) => {
        return sv.maSV !== action.maSV;
      });

      return { ...state };
    case "XEM_THONG_TIN":
      state.infor = action.infor;

      return { ...state };

    case "CAP_NHAP":
      let mangCapNhap = [...state.mangSV];
      let sinhVienUpdate= mangCapNhap.find((sv)=>{
        return sv.maSV=== action.sv.maSV
      })

      if(sinhVienUpdate){
        sinhVienUpdate.hoTen = action.sv.hoTen
        sinhVienUpdate.sdt = action.sv.sdt
        sinhVienUpdate.email = action.sv.email
      }
      state.mangSV = mangCapNhap;

      return { ...state };

    default:
      return state;
  }
};
