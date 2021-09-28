import React,{useState, useEffect }  from 'react';
import DropdownAction from '~/components/elements/basic/DropdownAction';
import axios from "axios";
import moment from "moment";

const TableProjectItems = () => {
    const [productItems, setProductItems]  = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8899/product/product-list").then(res=>{
            console.log(res.data);
            setProductItems(res.data.result)
    })
    },[])

    const tableItems = productItems.map((item, index) => {
        let badgeView;
        if (item) {
            badgeView = <span className="ps-badge success">Stock</span>;
        } else {
            badgeView = <span className="ps-badge gray">Out of stock</span>;
        }
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td><img src={item.imageURL} style={{width:'50px'}}/></td>
                <td>
                    <a href="#">
                        <strong>{item.name}</strong>
                    </a>
                </td>
                <td>{item.details}</td>
                <td>{item.filename}</td>
                <td>
                    <strong>{item.price}</strong>
                </td>
                <td>
                    {item.category.name}
                    {/* <p className="ps-item-categories">
                        {item.category.map((cat) => (
                            <a href="#" key={cat.name}>
                                {cat.name}
                            </a>
                        ))}
                    </p> */}
                </td>
                <td>{moment(item.createDate).format("MMMM Do YYYY, h:mm:ss a")}</td>
                <td>
                    <DropdownAction data={item}/>
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
                        <th>Product Image</th>
                        <th>Product Name</th>
                        <th>description</th>
                        <th>Filename</th>
                        <th>Price</th>
                        <th>Categories</th>
                        <th>Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{tableItems}</tbody>
            </table>
        </div>
    );
};

export default TableProjectItems;
