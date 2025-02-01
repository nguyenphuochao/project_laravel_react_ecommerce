import React from 'react'

export default function Dashboard() {
  return (
    <>
      <div id="content-wrapper">
        <div className="container-fluid">
          {/* Breadcrumbs*/}
          <ol className="breadcrumb">
            <li className="breadcrumb-item active">Tổng quan</li>
          </ol>
          <div className="mb-3 my-3">
            <a href="#" className="active btn btn-primary">Hôm nay</a>
            <a href="#" className="btn btn-primary">Hôm qua</a>
            <a href="#" className="btn btn-primary">Tuần này</a>
            <a href="#" className="btn btn-primary">Tháng này</a>
            <a href="#" className="btn btn-primary">3 tháng</a>
            <a href="#" className="btn btn-primary">Năm này</a>
            <div className="dropdown" style={{ display: 'inline-block' }}>
              <a className="btn btn-primary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <div style={{ margin: 20 }}>
                  Từ ngày <input type="date" className="form-control" id="usr" />
                  Đến ngày <input type="date" className="form-control" id="usr" />
                  <br />
                  <input type="submit" defaultValue="Tìm" className="btn btn-primary form-control" />
                </div>
              </div>
            </div>
          </div>
          {/* Icon Cards*/}
          <div className="row">
            <div className="col-xl-4 col-sm-6 mb-3">
              <div className="card text-white bg-warning o-hidden h-100">
                <div className="card-body">
                  <div className="card-body-icon">
                    <i className="fas fa-fw fa-list" />
                  </div>
                  <div className="mr-5">2 Đơn hàng</div>
                </div>
                <a className="card-footer text-white clearfix small z-1" href="#">
                  <span className="float-left">Chi tiết</span>
                  <span className="float-right">
                    <i className="fas fa-angle-right" />
                  </span>
                </a>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 mb-3">
              <div className="card text-white bg-success o-hidden h-100">
                <div className="card-body">
                  <div className="card-body-icon">
                    <i className="fas fa-fw fa-shopping-cart" />
                  </div>
                  <div className="mr-5">Doanh thu 3,500,000 đ</div>
                </div>
                <a className="card-footer text-white clearfix small z-1" href="#">
                  <span className="float-left">Chi tiết</span>
                  <span className="float-right">
                    <i className="fas fa-angle-right" />
                  </span>
                </a>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 mb-3">
              <div className="card text-white bg-danger o-hidden h-100">
                <div className="card-body">
                  <div className="card-body-icon">
                    <i className="fas fa-fw fa-life-ring" />
                  </div>
                  <div className="mr-5">1 đơn hàng bị hủy</div>
                </div>
                <a className="card-footer text-white clearfix small z-1" href="#">
                  <span className="float-left">Chi tiết</span>
                  <span className="float-right">
                    <i className="fas fa-angle-right" />
                  </span>
                </a>
              </div>
            </div>
          </div>
          {/* DataTables Example */}
          <div className="card mb-3">
            <div className="card-header">
              <i className="fas fa-table" />
              Đơn hàng
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover" id="dataTable" width="100%" cellSpacing={0}>
                  <thead>
                    <tr>
                      <th>Mã</th>
                      <th>Tên khách hàng</th>
                      <th>Điện thoai</th>
                      <th>Email</th>
                      <th>Trạng Thái</th>
                      <th>Ngày đặt hàng</th>
                      <th>Phương thức thanh toán</th>
                      <th>Người nhận</th>
                      <th>Số điện thoại nhận</th>
                      <th>Ngày giao hàng</th>
                      <th>Phí giao hàng</th>
                      <th>Tạm tính</th>
                      <th>Tổng cộng</th>
                      <th>Địa chỉ giao hàng</th>
                      <th>Nhân viên phụ trách</th>
                      <th />
                      <th />
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#112</td>
                      <td>Nguyễn Văn A</td>
                      <td>0932538468</td>
                      <td>nguyenvana@gmail.com</td>
                      <td>Đang xử lý</td>
                      <td>2019-03-10 15:35:59 </td>
                      <td>Trả tiền khi nhận hàng</td>
                      <td>Nguyễn Văn E</td>
                      <td>0123456789</td>
                      <td>2019-03-13</td>
                      <td>50,000 đ</td>
                      <td>2,000,000 đ</td>
                      <td>2,050,000 đ</td>
                      <td>278 Hòa Bình, Hiệp Tân, Tân Phú, TP.HCM</td>
                      <td>Nguyễn Hữu Lộc</td>
                      <td> <input type="button" onclick="Confirm('1');" defaultValue="Xác nhận" className="btn btn-primary btn-sm" /></td>
                      <td> <input type="button" onclick="Edit('1');" defaultValue="Sửa" className="btn btn-warning btn-sm" /></td>
                      <td> <input type="button" onclick="Delete('1');" defaultValue="Xóa" className="btn btn-danger btn-sm" /></td>
                    </tr>
                    <tr>
                      <td>#113</td>
                      <td>Nguyễn Văn B</td>
                      <td>0932222444</td>
                      <td>nguyenvanb@gmail.com</td>
                      <td>Đã xác nhận</td>
                      <td>2019-01-10 15:35:59 </td>
                      <td>Thanh toán qua ngân hàng</td>
                      <td>Nguyễn Văn E</td>
                      <td>0123456789</td>
                      <td>2019-01-13</td>
                      <td>30,000 đ</td>
                      <td>1,500,000 đ</td>
                      <td>1,530,000 đ</td>
                      <td>279 Hòa Bình, Hiệp Tân, Tân Phú, TP.HCM</td>
                      <td>Nguyễn Thị Lệ</td>
                      <td> </td>
                      <td> <input type="button" onclick="Edit('1');" defaultValue="Sửa" className="btn btn-warning btn-sm" /></td>
                      <td> <input type="button" onclick="Delete('1');" defaultValue="Xóa" className="btn btn-danger btn-sm" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
