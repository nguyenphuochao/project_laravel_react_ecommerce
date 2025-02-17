import React, { useEffect, useState } from 'react'
import { axiosNonAuthInstance } from '../../helper/util';
import { useLocation, useNavigate } from 'react-router-dom';


export default function SearchForm() {
    const navigate = useNavigate();

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search"); // Lấy giá trị 'test'

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!query) {
            setResults([]);
            return;
        }

        const timeoutId = setTimeout(() => {
            fetchResults(query);
        }, 500); // Chờ 500ms trước khi gửi request

        return () => clearTimeout(timeoutId); // Hủy timeout nếu user nhập tiếp
    }, [query]);

    const fetchResults = async (search) => {
        setLoading(true);
        try {
            const response = await axiosNonAuthInstance().get(`/site/products?search=${search}`);
            setResults(response.data.items);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setLoading(false);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/san-pham.html?search=${query}`);
    }


    return (
        <form className="header-form" action="#" onSubmit={(e) => handleSearch(e)}>
            <div className="input-group">
                <input onChange={(e) => setQuery(e.target.value)} value={searchQuery} type="search" className="form-control search" placeholder="Nhập từ khóa tìm kiếm" name="search" autoComplete="off" />
                <div className="input-group-btn">
                    <button className="btn bt-search bg-color" type="submit"><i className="fa fa-search" style={{ color: '#fff' }} />
                    </button>
                </div>
            </div>
            <div className="search-result" style={{ display: "block" }}>
                {loading && <p>Đang tìm kiếm...</p>}
                <ul>
                    {
                        results.map((item, index) =>
                            <li key={index}>
                                <img src={item.featured_image} alt="" width={50} />
                                {item.product_name} - {item.sale_price}
                            </li>
                        )
                    }
                </ul>
            </div>
        </form>
    )
}
