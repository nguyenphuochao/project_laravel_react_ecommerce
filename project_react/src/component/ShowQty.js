import React from 'react'

export default function ShowQty({perPage, showQtyItem}) {
    return (
        <>
            <form>
                <label>Hiển thị : </label>

                <select className="ml-2 mr-2" onChange={(e) => showQtyItem(e) }>
                    <option selected={`${perPage === 5 ? "selected" : ""}`} value="5">5</option>
                    <option selected={`${perPage === 10 ? "selected" : ""}`} value="10">10</option>
                    <option selected={`${perPage === 15 ? "selected" : ""}`} value="15">15</option>
                    <option selected={`${perPage === 20 ? "selected" : ""}`} value="15">20</option>
                    <option selected={`${perPage === 25 ? "selected" : ""}`} value="15">25</option>
                </select>

                <label>mục</label>
            </form>
        </>
    )
}
