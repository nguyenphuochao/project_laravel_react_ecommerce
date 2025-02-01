import React from 'react'
import { Link } from 'react-router-dom';

export default function Pagination({ pagination, handlePage, handlePreviousPage, handleNextPage }) {
    const totalPage = pagination.totalPage;
    const page = pagination.page;

    const pageNumbers = [];
    for (let i = 1; i <= totalPage; i++) {
        pageNumbers.push(i)
    }

    return (
        <>
            <nav aria-label="...">
                <ul className="pagination justify-content-end">
                    <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                        <Link onClick={(e) => handlePreviousPage(e, page)} className="page-link" to="#">Previous</Link>
                    </li>

                    {
                        pageNumbers.map(num =>
                            <li className={`page-item ${page === num ? "active" : ""}`}>
                                <Link onClick={(e) => handlePage(e, num)} className="page-link" to="#">{num}</Link>
                            </li>
                        )
                    }

                    <li className={`page-item ${page === totalPage ? "disabled" : ""}`}>
                        <Link onClick={(e) => handleNextPage(e, page)} className="page-link" to="#">Next</Link>
                    </li>
                </ul>
            </nav>

        </>
    )
}
