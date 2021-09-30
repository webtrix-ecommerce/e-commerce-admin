import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import ContainerDefault from '~/components/layouts/ContainerDefault';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';
import { connect, useDispatch } from 'react-redux';
import { toggleDrawerMenu } from '~/store/app/action';
import { Form, Input, notification, Button,Select,Upload } from 'antd';
import axios from 'axios';



const editeProductPage = () => {
    const [categorylist, setCategorylist] = useState([]);
    const [key, setKey] = useState([]);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(toggleDrawerMenu(false));
        setKey(JSON.parse(sessionStorage.getItem("edite")))
        axios.get('http://localhost:8899/category/category-list').then((res) => {
            console.log(res);
            setCategorylist(res.data.result);
        })
    }, []);
    form.setFieldsValue({
        productName:key.name,
        productCode:key.code,
        price:key.price,
        details:key.details,
        mfile:key.imageURL,
        discount:key.discount,
        description:key.description,
        // category:key.category
      });
    console.log(key);
    console.log(key.id);
    var we =key.category;
    console.log(we)
    const handelsubmit = (value) => {
        console.log(value);
        console.log(key.id);
        const loginFormData = new FormData();
        loginFormData.append("productId", key.id);
        loginFormData.append("productName", value.productName);
        loginFormData.append("productCode", value.productCode);
        loginFormData.append("price", value.price);
        loginFormData.append("details", value.details);
        loginFormData.append("mfile", value.mfile.file.originFileObj);
        loginFormData.append("discount", value.discount);
        loginFormData.append("description", value.description);
        loginFormData.append("category", value.category);
        console.log(loginFormData);
        axios({
            method: 'post',
            url: ' http://localhost:8899/product/update-product',
            data: loginFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then((res) => {
            console.log(res);
            console.log(res.status);
            if (res.data.status === 200) {
                notification.success({
                    message: res.data.message,
                    description: 'This feature has been updated later!',
                });
                return Router.push('/products');
            } else {
            }
        }).catch((err) => {
            console.log(err);

            notification.warn({
                message: "update unseccusfull",
                description: 'This feature has been updated later!',
            })
        }
        )
    }

    return (
        
        <ContainerDefault title="Create new product">
            <HeaderDashboard
                title="Create Product"
                description="Martfury Create New Product "
            />
            <section className="ps-new-item">
                <Form
                    className="ps-form ps-form--new-product"
                    // initialValues={{
                    //     remember: true,
                    // }}
                    form={form} 
                    onFinish={handelsubmit}
                >
                    <div className="ps-form__content">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <figure className="ps-block--form-box">
                                    <figcaption>Edite Product</figcaption>
                                    <div className="ps-block__content w-md-75 ">
                                        {/* <div className="form-group w-md-75">
                                            <Form.Item
                                                name="id"
                                                initialvalues ={key.id}
                                                value={we}
                                            >
                                                <Input
                                                // ref={inputRef}
                                               
                                                />
                                            </Form.Item>
                                        </div> */}
                                        <div className="form-group w-md-75">
                                            <Form.Item
                                                name="productName"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Please input your productName!',
                                                    },
                                                ]}>
                                                <Input
                                                    className="form-control  w-md-75"
                                                    type="text"
                                                    placeholder="productName"

                                                />
                                            </Form.Item>
                                        </div>

                                        <div className="form-group">
                                            <Form.Item
                                                name="productCode"

                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Please input your productCode!',
                                                    },
                                                ]}>
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="productCode"

                                                />
                                            </Form.Item>
                                        </div>

                                        <div className="form-group">
                                            <Form.Item
                                                name="price"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Please input your price!',
                                                    },
                                                ]}>
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="price"

                                                />
                                            </Form.Item>
                                        </div>
                                        <div className="form-group">
                                            <Form.Item
                                                name="details"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Please input your details!',
                                                    },
                                                ]}>
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="details"

                                                />
                                            </Form.Item>
                                        </div>

                                        <div className="form-group">
                                            <Form.Item
                                                name="discount"

                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Please input your discount!',
                                                    },
                                                ]}>
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="discount"

                                                />
                                            </Form.Item>
                                        </div>

                                        <div className="form-group">
                                            <Form.Item
                                                name="description"

                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Please input your description!',
                                                    },
                                                ]}>
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="description"

                                                />
                                            </Form.Item>
                                        </div>
                                        <div className="form-group">
                                            <Form.Item
                                                name="category"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Please input your category!',
                                                    },
                                                ]}
                                            >
                                                <Select
                                                    className="ps-ant-dropdown "
                                                    listItemHeight={25}
                                                    placeholder="Select a Category"

                                                >
                                                    {categorylist.map((list, index) => {
                                                        return (<Option key={index} value={list.name}>{list.name}</Option>)
                                                    }
                                                    )}
                                                </Select>
                                            </Form.Item>
                                        </div>
                                        <div className="form-group text-center">
                                            <Form.Item
                                                name="mfile"
                                                type="file"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Please input your mfile!',
                                                    },
                                                ]}>
                                                <Upload

                                                    listType="picture"
                                                    // multiple
                                                    className="upload-list-inline"
                                                >
                                                    <Button >Upload Product </Button>
                                                </Upload>
                                            </Form.Item>
                                        </div>
                                    </div>
                                </figure>
                            </div>
                        </div>
                    </div>
                    <div className="ps-form__bottom">
                        <a onClick={()=> Router.push('/products')}
                            className="ps-btn ps-btn--black"
                            href="products.html">
                            Back
                        </a>
                        <Button className="ps-btn ps-btn--gray">Cancel</Button>
                        <Button className="ps-btn" htmlType="submit">Submit</Button>
                    </div>
                </Form>
            </section >
        </ContainerDefault >
    );
};
export default connect((state) => state.app)(editeProductPage);
