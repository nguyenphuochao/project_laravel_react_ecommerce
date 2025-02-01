import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import EditCategoryForm from '../../component/EditCategoryForm';
import Loading from '../../component/Loading';
import { toast } from 'react-toastify';

export default function CategoryEdit() {
    const navigate = useNavigate();
    const { slug } = useParams();

    const [category, setCategory] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const getCategory = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/v1/categories/${slug}`);
            setCategory(response.data);
            setIsLoaded(true)
        } catch (error) {
            console.log(error);
            setIsLoaded(true);
        }
    }

    // Cập nhật danh mục
    const handleUpdate = async (values) => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/v1/categories/${slug}`, values);
            toast.success(`Đã cập nhật ${response.data.name}`);
            navigate('/admin/category/list');
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getCategory()
    }, [])


    return (
        <>
            <div id="content-wrapper">
                <div className="container-fluid">
                    {/* Breadcrumbs*/}
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link href="#">Quản lý</Link>
                        </li>
                        <li className="breadcrumb-item active">Danh mục</li>
                    </ol>
                    {/* /form */}
                    {
                        !isLoaded ? <Loading /> : <EditCategoryForm category={category} handleUpdate={handleUpdate} />
                    }
                    {/* /form */}
                </div>
            </div>

        </>
    )
}
