import React, { useState } from 'react'

export default function SearchProductForm({ handleSearch, searchProductName, searchCategoryName, searchProductBarcode, searchProductCreatedDateFrom, searchProductCreatedDateTo }) {
    const [patternProductName, setPatternProductName] = useState(searchProductName);
    const [patternCategoryName, setPatternCategoryName] = useState(searchCategoryName);
    const [patternProductBarcode, setPatternProductBarcode] = useState(searchProductBarcode);
    const [patternProductCreateDateFrom, setPatternProductCreateDateFrom] = useState(searchProductCreatedDateFrom);
    const [patternProductCreateDateTo, setPatternProductCreateDateTo] = useState(searchProductCreatedDateTo);

    return (
        <>
            <form action="#" onSubmit={(e) => handleSearch(e, patternProductName, patternCategoryName, patternProductBarcode, patternProductCreateDateFrom, patternProductCreateDateTo)}>
                <div className="row">
                    <div className="col-md-9">
                        <div className="row">

                            {/* Tìm theo tên sản phẩm */}
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Tên sản phẩm</label>
                                    <input onChange={(e) => setPatternProductName(e.target.value)} value={patternProductName}
                                        type="text" name="product_name" className="form-control" />
                                </div>
                            </div>

                            {/* Tìm theo tên danh mục */}
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Tên danh mục</label>
                                    <input onChange={(e) => setPatternCategoryName(e.target.value)} value={patternCategoryName}
                                        type="text" name="category_name" className="form-control" />
                                </div>
                            </div>

                            {/* Tìm theo barcode */}
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Barcode</label>
                                    <input onChange={(e) => setPatternProductBarcode(e.target.value)} value={patternProductBarcode}
                                        type="text" className="form-control" />
                                </div>
                            </div>

                            {/* Tìm theo ngày tạo */}
                            <div className="col-md-6">
                                <div className="d-flex justify-content-around">
                                    <div className="form-group">
                                        <label>Ngày tạo</label>
                                        <input onChange={(e) => setPatternProductCreateDateFrom(e.target.value)} value={patternProductCreateDateFrom}
                                            type="date" className="form-control" />
                                    </div>

                                    <div className="col-md-1 text-center" style={{ marginTop: "35px" }}>~</div>

                                    <div className="form-group">
                                        <label>&nbsp;</label>
                                        <input onChange={(e) => setPatternProductCreateDateTo(e.target.value)} value={patternProductCreateDateTo}
                                            type="date" className="form-control" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                <button type="submit" className="btn btn-primary btn-sm">Tìm kiếm</button>
            </form>
        </>
    )
}
