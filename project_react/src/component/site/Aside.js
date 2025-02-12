import React from 'react'
import { Link } from 'react-router-dom'

export default function Aside() {
    return (
        <>
            <aside className="col-md-3">
                <div className="inner-aside">
                    <div className="category">
                        <h5>Danh mục sản phẩm</h5>
                        <ul>
                            <li>
                                <Link to="#" title="Tất cả sản phẩm" target="_self">Tất cả sản phẩm</Link>
                            </li>
                            <li className>
                                <Link to="#" title="Kem Chống Nắng" target="_self">Kem Chống Nắng</Link>
                            </li>
                            <li className="active">
                                <a href="#" title="Kem Dưỡng Da" target="_self">Kem Dưỡng Da</a>
                            </li>
                            <li className>
                                <a href="#" title="Kem Trị Mụn" target="_self">Kem Trị Mụn</a>
                            </li>
                            <li className>
                                <a href="#" title="Kem Trị Thâm Nám" target="_self">Kem Trị Thâm Nám</a>
                            </li>
                            <li className>
                                <a href="#" title="Sữa Rửa Mặt" target="_self">Sữa Rửa Mặt</a>
                            </li>
                            <li className>
                                <a href="#" title="Sữa Tắm" target="_self">Sữa Tắm</a>
                            </li>
                        </ul>
                    </div>
                    <div className="price-range">
                        <h5>Khoảng giá</h5>
                        <ul>
                            <li>
                                <label htmlFor="filter-less-100">
                                    <input type="radio" id="filter-less-100" name="filter-price" defaultValue="0-100000" />
                                    <i className="fa" />
                                    Giá dưới 100.000đ
                                </label>
                            </li>
                            <li>
                                <label htmlFor="filter-100-200">
                                    <input type="radio" id="filter-100-200" name="filter-price" defaultValue="100000-200000" />
                                    <i className="fa" />
                                    100.000đ - 200.000đ
                                </label>
                            </li>
                            <li>
                                <label htmlFor="filter-200-300">
                                    <input type="radio" id="filter-200-300" name="filter-price" defaultValue="200000-300000" />
                                    <i className="fa" />
                                    200.000đ - 300.000đ
                                </label>
                            </li>
                            <li>
                                <label htmlFor="filter-300-500">
                                    <input type="radio" id="filter-300-500" name="filter-price" defaultValue="300000-500000" />
                                    <i className="fa" />
                                    300.000đ - 500.000đ
                                </label>
                            </li>
                            <li>
                                <label htmlFor="filter-500-1000">
                                    <input type="radio" id="filter-500-1000" name="filter-price" defaultValue="500000-1000000" />
                                    <i className="fa" />
                                    500.000đ - 1.000.000đ
                                </label>
                            </li>
                            <li>
                                <label htmlFor="filter-greater-1000">
                                    <input type="radio" id="filter-greater-1000" name="filter-price" defaultValue="1000000-greater" />
                                    <i className="fa" />
                                    Giá trên 1.000.000đ
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
            </aside>
        </>
    )
}
