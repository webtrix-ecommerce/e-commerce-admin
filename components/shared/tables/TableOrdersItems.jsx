import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';


const TableOrdersItems = () => {
    const [orderItems, setOrderItems] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8899/order-list').then((res) => {
            console.log(res);
            setOrderItems(res.data.result);
        })
    }, []);
    // const orderItems = [
    //     {
    //         id: '#A580',
    //         date: 'Aug 15, 2020',
    //         product: 'Unero Black Military',
    //         payment: true,
    //         fullfillment: 'delivered',
    //         total: '$56.00',
    //     },
    //     {
    //         id: '#B260',
    //         date: 'Aug 16, 2020',
    //         product: 'Marsh Speaker',
    //         payment: false,
    //         fullfillment: 'delivered',
    //         total: '$56.00',
    //     },
    //     {
    //         id: '#A583',
    //         date: 'Aug 17, 2020',
    //         product: 'Lined Blend T-Shirt',
    //         payment: true,
    //         fullfillment: 'In Progress',
    //         total: '$516.00',
    //     },
    //     {
    //         id: '#A523',
    //         date: 'Aug 18, 2020',
    //         product: 'DJI MAcvic Quadcopter',
    //         payment: false,
    //         fullfillment: 'delivered',
    //         total: '$112.00',
    //     },
    //     {
    //         id: '#A112',
    //         date: 'Aug 19, 2020',
    //         product: 'Black T-Shirt',
    //         payment: true,
    //         fullfillment: 'Cancel',
    //         total: '$30.00',
    //     },
    // ];

    const tableItemsView = orderItems.map((item) => {
        let badgeView, fullfillmentView;
        // const menuView = (
        //     <Menu>
        //         <Menu.Item key={0}>
        //             <a className="dropdown-item" href="#">
        //                 Edit
        //             </a>
        //         </Menu.Item>
        //         <Menu.Item key={0}>
        //             <a className="dropdown-item" href="#">
        //                 <i className="icon-t"></i>
        //                 Delete
        //             </a>
        //         </Menu.Item>
        //     </Menu>
        // );
        if (item.payment) {
            badgeView = <span className="ps-badge success">Paid</span>;
        } else {
            badgeView = <span className="ps-badge gray">Unpaid</span>;
        }
        switch (item.fullfillment) {
            case 'In Progress':
                fullfillmentView = (
                    <span className="ps-fullfillment warning">In Progress</span>
                );
                break;
            case 'Cancel':
                fullfillmentView = (
                    <span className="ps-fullfillment danger">Cancel</span>
                );
                break;
            default:
                fullfillmentView = (
                    <span className="ps-fullfillment success">delivered</span>
                );
                break;
        }
        return (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td><img src={item.productModel.imageURL} alt={item.productModel.code}  style={{ width: '50px' }}/> </td>
                <td>
                    <strong> {item.productModel.name}</strong>
                </td>
                <td>{badgeView}</td>
                <td>{fullfillmentView}</td>
                <td>
                    {/* <Link href="/orders/order-detail"> */}
                    {/* <a> */}
                    {item.orderDate}
                    {/* </a> */}
                    {/* </Link> */}
                </td>
                <td>
                    <strong>{item.productModel.price}</strong>
                </td>

            </tr>
        );
    });
    return (
        <div className="table-responsive">
            <table className="table ps-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product</th>
                        <th>ProductName</th>
                        <th>Payment</th>
                        <th>Fullfillment</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{tableItemsView}</tbody>
            </table>
        </div>
    );
};

export default TableOrdersItems;
