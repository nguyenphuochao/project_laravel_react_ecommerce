import React, { useState } from 'react'

export default function Search({handleSearch, search}) {
    const [patern, setPatern] = useState(search);

    return (

        <>
            <form action="list.html" method="GET" onSubmit={(e) => handleSearch(e, patern)}>
                <label className="form-inline justify-content-end">Tìm kiếm:
                    <input onChange={(e) => setPatern(e.target.value)} value={patern} type="search" name="search" className="form-control" />
                    <button className="btn btn-danger">Tìm</button>
                </label>
            </form>
        </>
    )
}
