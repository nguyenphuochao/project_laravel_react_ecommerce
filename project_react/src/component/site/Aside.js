import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { axiosNonAuthInstance } from '../../helper/util';
import { toast } from 'react-toastify';
import Loading from './Loading';

export default function Aside({ handleCategoryId, handlePriceRange, priceRange, categoryId }) {

    const [categories, setCategories] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const getCategories = async () => {
        try {
            const response = await axiosNonAuthInstance().get('/site/categories');
            setCategories(response.data);
            setIsLoaded(true);
        } catch (error) {
            toast.error(error.message);
            setIsLoaded(true);
        }
    }

    useEffect(() => {
        getCategories();
    }, [])


    return (
        <>
            <aside className="col-md-3">
                <div className="inner-aside">
                    <div className="category">
                        <h5>Danh mục sản phẩm</h5>
                        <ul>
                            <li className={`${categoryId === "all" ? "active" : ""}`}>
                                <Link to="#" onClick={(e) => handleCategoryId(e, "all")} title="Tất cả sản phẩm" target="_self">Tất cả sản phẩm</Link>
                            </li>

                            {
                                !isLoaded ? <Loading /> :
                                    categories.map((category, index) =>
                                        <li key={index} className={`${Number(categoryId) === category.id ? "active" : ""}`}>
                                            <Link to="#" onClick={(e) => handleCategoryId(e, category.id)} title={category.name} target="_self">{category.name}</Link>
                                        </li>
                                    )
                            }

                        </ul>
                    </div>

                    <div className="price-range">
                        <h5>Khoảng giá</h5>
                        <ul>
                            <li>
                                <label htmlFor="filter-less-100">
                                    <input defaultChecked={`${priceRange === '0-100000' ? "checked" : ""}`} type="radio" id="filter-less-100" name="filter-price" onChange={(e) => handlePriceRange(e.target.value)} defaultValue="0-100000" />
                                    <i className="fa" />
                                    &nbsp; Giá dưới 100.000đ
                                </label>
                            </li>
                            <li>
                                <label htmlFor="filter-100-200">
                                    <input defaultChecked={`${priceRange === '100000-200000' ? "checked" : ""}`} type="radio" id="filter-100-200" name="filter-price" onChange={(e) => handlePriceRange(e.target.value)} defaultValue="100000-200000" />
                                    <i className="fa" />
                                    &nbsp; 100.000đ - 200.000đ
                                </label>
                            </li>
                            <li>
                                <label htmlFor="filter-200-300">
                                    <input defaultChecked={`${priceRange === '200000-300000' ? "checked" : ""}`} type="radio" id="filter-200-300" name="filter-price" onChange={(e) => handlePriceRange(e.target.value)} defaultValue="200000-300000" />
                                    <i className="fa" />
                                    &nbsp; 200.000đ - 300.000đ
                                </label>
                            </li>
                            <li>
                                <label htmlFor="filter-300-500">
                                    <input defaultChecked={`${priceRange === '300000-500000' ? "checked" : ""}`} type="radio" id="filter-300-500" name="filter-price" onChange={(e) => handlePriceRange(e.target.value)} defaultValue="300000-500000" />
                                    <i className="fa" />
                                    &nbsp; 300.000đ - 500.000đ
                                </label>
                            </li>
                            <li>
                                <label htmlFor="filter-500-1000">
                                    <input defaultChecked={`${priceRange === '500000-1000000' ? "checked" : ""}`} type="radio" id="filter-500-1000" name="filter-price" onChange={(e) => handlePriceRange(e.target.value)} defaultValue="500000-1000000" />
                                    <i className="fa" />
                                    &nbsp; 500.000đ - 1.000.000đ
                                </label>
                            </li>
                            <li>
                                <label htmlFor="filter-greater-1000">
                                    <input defaultChecked={`${priceRange === '1000000-greater' ? "checked" : ""}`} type="radio" id="filter-greater-1000" name="filter-price" onChange={(e) => handlePriceRange(e.target.value)} defaultValue="1000000-greater" />
                                    <i className="fa" />
                                    &nbsp; Giá trên 1.000.000đ
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
            </aside>
        </>
    )
}
