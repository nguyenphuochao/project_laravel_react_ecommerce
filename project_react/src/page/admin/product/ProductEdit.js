
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import EditProductForm from '../../../component/admin/EditProductForm'
import Loading from '../../../component/admin/Loading';
import { axiosAuthInstance } from '../../../helper/util';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';

export default function ProductEdit() {
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [isLoaded, setisLoaded] = useState(false);
    const { slug } = useParams();

    const getProduct = async () => {
        try {
            const response = await axiosAuthInstance().get(`/products/${slug}`);
            setProduct(response.data);
            setisLoaded(true);
        } catch (error) {
            console.log(error);
            setisLoaded(true);
        }
    }

    // Cập nhật sản phẩm
    const handleUpdate = async (values, file) => {
        try {
            // console.log(values);
            const formData = new FormData();
            formData.append('barcode', values.barcode);
            formData.append('sku', values.sku);
            formData.append('name', values.name);
            formData.append('price', values.price);
            formData.append('inventory_qty', values.inventory_qty);
            formData.append('category_id', values.category_id);
            formData.append('brand_id', values.brand_id);
            formData.append('featured', values.featured.length === 0 ? 0 : 1);
            formData.append('description', values.description);
            formData.append('featured_image', file ? file : "");

            formData.append("_method", "PUT"); // để laravel hiểu được đang truyền bằng form-data là PUT

            const response = await axiosAuthInstance().post(`/products/${slug}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            toast.success(`Đã cập nhật ${response.data.name}`);
            navigate('/admin/product/list');
        } catch (error) {
            toast.error(error.message);

        }
    }

    useEffect(() => {
        getProduct();
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Helmet>
                <title>Product Edit | {`${product?.id}`}</title>
            </Helmet>

            <div id="content-wrapper">
                <div className="container-fluid">
                    {/* Breadcrumbs*/}
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="#">Quản lý</Link>
                        </li>
                        <li className="breadcrumb-item active">Sản phẩm</li>
                    </ol>

                    {/* /form */}
                    {
                        !isLoaded ? <Loading /> : <EditProductForm product={product} handleUpdate={handleUpdate} />
                    }

                </div>
            </div>
        </>
    )
}
