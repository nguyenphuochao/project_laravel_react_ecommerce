import React from 'react'
import { Link } from 'react-router-dom';

export default function Pagination({ pagination, handlePage, handlePrePage, handleNextPage }) {
    const totalPage = pagination.totalPage;
    const page = Number(pagination.page);
    const pageNumbers = [];
    for (let i = 1; i <= totalPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <ul className="pagination pull-right">
            <li className={`${page === 1 ? "disabled" : ""}`}><Link to="#" onClick={(e) => handlePrePage(e, page)}>«</Link></li>

            {
                pageNumbers.map((num, index) =>
                    <li className={`${page === num ? "active" : ""}`}><Link to="#" onClick={(e) => handlePage(e, num)}>{num}</Link></li>
                )
            }

            <li className={`${page === totalPage ? "disabled" : ""}`}><Link to="#" onClick={(e) => handleNextPage(e, page)}>»</Link></li>
        </ul>
    )
}
